const list = document.getElementById("projects-list");
const filterBtns = document.querySelectorAll(".filters button");

const io =
    "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches
        ? new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                  }
                }),
            { threshold: 0.12 },
        )
        : null;
const reveal = (node) => {
  if (!io) return;
  node.classList.add("reveal");
  io.observe(node);
};

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};
const safeUrl = (u) => (/^https:\/\//i.test(u) ? u : "");

let curFilter = "all";

function imgUrl(g, name) {
  return name.includes("/") ? name : g.dir + name;
}

function tryLoad(sources, onFound) {
  if (!sources.length) return;
  const probe = new Image();
  probe.onload = () => onFound(sources[0]);
  probe.onerror = () => tryLoad(sources.slice(1), onFound);
  probe.src = sources[0];
}

function renderProjects(filter) {
  curFilter = filter;
  list.replaceChildren();
  PROJECTS.filter((p) => filter === "all" || p.cat.includes(filter)).forEach((p) => {
    const L = LANG === "en" && p.en ? p.en : {};
    const title = L.title || p.title;
    const text = L.text || p.text;
    const label = L.label || p.label;
    const status = L.status !== undefined ? L.status : p.status;
    const caseStudy = L.case || p.case;
    const g = p.gallery ? GALLERIES[p.gallery] : null;
    const link = safeUrl(p.link);
    const card = el("article", "proj" + (p.featured ? " featured" : ""));
    card.dataset.project = p.id;
    const cv = el("div", "cover" + (g && g.pixel ? " pix" : ""), label);
    if (p.featured) cv.append(el("span", "featured-label", t("featured")));
    cv.style.backgroundImage = p.cover || "linear-gradient(135deg,#3a3328,#0A0A0A)";
    cv.style.backgroundPosition = p.imagePosition || "center";
    const sources = [];
    if (p.image) sources.push(p.image);
    if (g && g.images.length) sources.push(imgUrl(g, g.images[0]));
    tryLoad(sources, (src) => {
      cv.style.backgroundImage = `url("${src}")`;
      const featuredLabel = cv.querySelector(".featured-label");
      cv.replaceChildren(...(featuredLabel ? [featuredLabel] : []));
    });
    const body = el("div", "body");
    body.append(el("h3", "", title), el("p", "", text));
    if (caseStudy) {
      const note = el("p", "case-study");
      note.append(
          el("span", "case-label", caseStudy.label + ": "),
          document.createTextNode(caseStudy.text),
      );
      body.append(note);
    }
    const chips = el("div", "chips");
    p.tags.forEach((tag) => chips.append(el("span", "", tag)));
    body.append(chips);
    const act = el("div", "act");
    if (status) act.append(el("span", "status", status));
    if (g) {
      act.append(
          el("span", "count", g.images.length ? g.images.length + " " + t("works") : t("soon")),
      );
      const button = el("button", "link", t("openAlbum"));
      button.type = "button";
      button.setAttribute("aria-label", t("openAlbum") + ": " + title);
      button.addEventListener("click", () => openGallery(p.gallery));
      act.append(button);
    }
    if (link) {
      const a = el("a", "link", t("openProject"));
      a.setAttribute("aria-label", t("openProject") + ": " + title);
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      act.append(a);
    }
    card.append(cv, body, act);
    if (g) {
      card.dataset.gallery = p.gallery;
      card.addEventListener("click", (e) => {
        if (!e.target.closest("a, button")) openGallery(p.gallery);
      });
    } else if (link) {
      card.classList.add("clickable");
      card.addEventListener("click", (e) => {
        if (!e.target.closest("a")) window.open(link, "_blank", "noopener,noreferrer");
      });
    }
    list.appendChild(card);
    card.style.setProperty("--reveal-delay", `${Math.min(list.children.length - 1, 5) * 55}ms`);
    reveal(card);
  });
}
const filterLabels = {
  all: "fAll",
  code: "fCode",
  web: "fWeb",
  pixel: "fPixel",
  "3d": "f3d",
  photoshop: "fPhotoshop",
  illustrator: "fIllustrator",
};
function updateFilterCounts() {
  filterBtns.forEach((button) => {
    const key = filterLabels[button.dataset.f];
    const count = PROJECTS.filter(
        (p) => button.dataset.f === "all" || p.cat.includes(button.dataset.f),
    ).length;
    if (key) button.textContent = `${t(key)} · ${count}`;
  });
}
filterBtns.forEach((b) =>
    b.addEventListener("click", () => {
      filterBtns.forEach((x) => x.setAttribute("aria-pressed", x === b));
      renderProjects(b.dataset.f);
    }),
);
renderProjects("all");
updateFilterCounts();
document.addEventListener("langchange", updateFilterCounts);
document
    .querySelectorAll("h2, .about-text, .facts-list > div, .cert, .tl article, .end")
    .forEach(reveal);

const bar = document.getElementById("progress");
addEventListener(
    "scroll",
    () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    },
    { passive: true },
);

const galleryEl = document.getElementById("gallery");
const mosaic = document.getElementById("mosaic");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");
const background = document.querySelectorAll(".skip, header, .rubber-dock-wrap, main, footer");
let curG = null,
    curI = 0,
    lastFocus = null,
    lightboxFocus = null;

function openGallery(id) {
  const g = GALLERIES[id];
  if (!g) return;
  curG = g;
  const L = LANG === "en" && g.en ? g.en : g;
  document.getElementById("g-title").textContent = L.title;
  document.getElementById("g-text").textContent = L.text;
  mosaic.replaceChildren();
  if (!g.images.length) mosaic.append(el("p", "empty", t("empty")));
  g.images.forEach((name, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", t("imgAria") + " " + (i + 1));
    const img = new Image();
    img.src = imgUrl(g, name);
    img.alt = L.title + " " + (i + 1);
    img.loading = "lazy";
    if (g.pixel) img.style.imageRendering = "pixelated";
    img.onload = () => {
      if (g.scale > 1) img.style.width = img.naturalWidth * g.scale + "px";
    };
    b.style.transform = `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg) translateY(${Math.round(Math.random() * 30 - 15)}px)`;
    b.onclick = () => openLightbox(i);
    b.appendChild(img);
    mosaic.appendChild(b);
  });
  galleryEl.hidden = false;
  galleryEl.classList.remove("motion-open");
  requestAnimationFrame(() => galleryEl.classList.add("motion-open"));
  galleryEl.scrollTop = 0;
  lastFocus = document.activeElement;
  background.forEach((node) => {
    node.inert = true;
  });
  document.getElementById("g-back").focus();
  document.body.style.overflow = "hidden";
}
function closeGallery() {
  galleryEl.classList.remove("motion-open");
  galleryEl.hidden = true;
  document.body.style.overflow = "";
  background.forEach((node) => {
    node.inert = false;
  });
  if (lastFocus) lastFocus.focus();
}

function openLightbox(i) {
  if (!curG || !curG.images.length) return;
  const opening = lightbox.hidden;
  if (opening) lightboxFocus = document.activeElement;
  const hasNavigation = curG.images.length > 1;
  lbPrev.hidden = !hasNavigation;
  lbNext.hidden = !hasNavigation;
  curI = (i + curG.images.length) % curG.images.length;
  lbImg.style.width = "";
  lbImg.style.imageRendering = curG.pixel ? "pixelated" : "auto";
  lbImg.onload = () => {
    if (curG.pixel) {
      const k = Math.max(
          1,
          Math.floor(
              Math.min(
                  (innerWidth * 0.8) / lbImg.naturalWidth,
                  (innerHeight * 0.8) / lbImg.naturalHeight,
              ),
          ),
      );
      lbImg.style.width = lbImg.naturalWidth * k + "px";
    }
  };
  lbImg.src = imgUrl(curG, curG.images[curI]);
  const title = LANG === "en" && curG.en ? curG.en.title : curG.title;
  lbImg.alt = title + " " + (curI + 1);
  lightbox.hidden = false;
  lightbox.classList.remove("motion-open");
  requestAnimationFrame(() => lightbox.classList.add("motion-open"));
  galleryEl.inert = true;
  if (opening) document.getElementById("lb-close").focus();
}
function closeLightbox() {
  lightbox.classList.remove("motion-open");
  lightbox.hidden = true;
  galleryEl.inert = false;
  if (lightboxFocus) lightboxFocus.focus();
}
document.getElementById("g-back").onclick = closeGallery;
document.getElementById("lb-close").onclick = closeLightbox;
lbPrev.onclick = () => openLightbox(curI - 1);
lbNext.onclick = () => openLightbox(curI + 1);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
addEventListener("keydown", (e) => {
  if (!lightbox.hidden) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && curG?.images.length > 1) {
      e.preventDefault();
      openLightbox(curI - 1);
    }
    if (e.key === "ArrowRight" && curG?.images.length > 1) {
      e.preventDefault();
      openLightbox(curI + 1);
    }
  } else if (!galleryEl.hidden && e.key === "Escape") closeGallery();
  if (e.key !== "Tab") return;
  const dialog = !lightbox.hidden ? lightbox : !galleryEl.hidden ? galleryEl : null;
  if (!dialog) return;
  const focusable = [
    ...dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
  ].filter((node) => node.getClientRects().length);
  if (!focusable.length) return;
  const first = focusable[0],
      last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

document.addEventListener("langchange", () => renderProjects(curFilter));

document.addEventListener("pointermove", (event) => {
  const card = event.target.closest && event.target.closest(".proj");
  if (!card) return;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--mx", event.clientX - bounds.left + "px");
  card.style.setProperty("--my", event.clientY - bounds.top + "px");
  if (motionOK && (card.classList.contains("clickable") || card.dataset.gallery)) {
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--tilt-x", `${(x * 2.4).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(-y * 2.4).toFixed(2)}deg`);
  }
});
document.addEventListener(
    "pointerleave",
    (event) => {
      const card = event.target.closest && event.target.closest(".proj");
      if (card) {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      }
    },
    true,
);

const motionOK = matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
).matches;
if (motionOK) {
  document.querySelectorAll(".btn, .lang-btn").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
      const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
      button.style.transform = `translate(${(x * 7).toFixed(1)}px, ${(y * 5).toFixed(1)}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
  const orbs = [...document.querySelectorAll(".bg-orbs i")];
  let parallaxFrame = 0;
  let pointerX = 0,
      pointerY = 0;
  addEventListener(
      "pointermove",
      (event) => {
        pointerX = (event.clientX / innerWidth - 0.5) * 2;
        pointerY = (event.clientY / innerHeight - 0.5) * 2;
        if (parallaxFrame) return;
        parallaxFrame = requestAnimationFrame(() => {
          parallaxFrame = 0;
          orbs.forEach((orb, i) => {
            const amount = (i + 1) * 5;
            orb.style.transform = `translate3d(${(pointerX * amount).toFixed(1)}px, ${(pointerY * amount).toFixed(1)}px, 0)`;
          });
        });
      },
      { passive: true },
  );
}
