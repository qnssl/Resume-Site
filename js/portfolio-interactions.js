(() => {
  "use strict";

  const motionOK = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  const roll = document.getElementById("word-roll");
  const wordKeys = [
    "wordVisual",
    "wordWeb",
    "wordCode",
    "wordSystems",
    "wordApps",
    "wordConcepts",
    "wordMotion",
    "wordSolutions",
  ];
  let wordIndex = 0;
  if (roll) {
    const updateWord = (animate = true) => {
      const next = t(wordKeys[wordIndex]);
      if (!animate || !motionOK) {
        roll.textContent = next;
        return;
      }
      roll.classList.add("is-changing");
      window.setTimeout(() => {
        roll.textContent = next;
        roll.classList.remove("is-changing");
      }, 220);
    };
    updateWord(false);
    if (motionOK)
      window.setInterval(() => {
        wordIndex = (wordIndex + 1) % wordKeys.length;
        updateWord();
      }, 4200);
    document.addEventListener("langchange", () => updateWord(false));
  }

  const career = document.getElementById("career-map");
  const explorer = document.getElementById("project-explorer");
  const careerTabs = career ? [...career.querySelectorAll("[data-career]")] : [];
  const careerIndex = document.getElementById("career-index");
  const careerSymbol = document.getElementById("career-symbol");
  const careerTitle = document.getElementById("career-title");
  const careerText = document.getElementById("career-text");
  const careerStack = document.getElementById("career-stack");
  const careerLink = career?.querySelector(".career-link");
  let activeCareer = "web";

  const CAREERS = {
    web: {
      symbol: "</>",
      filter: "web",
      surface: "#151515",
      accent: "#E6C896",
      text: "#E6C896",
      theme: {
        bg: "#0A0A0A",
        panel: "#151515",
        line: "#3a3328",
        muted: "#b9aa8e",
        warm: "#f0dcb7",
      },
      match: (p) => p.cat.includes("web"),
      ru: {
        title: "Web development",
        text: "Сайты и небольшие веб-приложения — от структуры до рабочей реализации.",
        stack: ["HTML", "CSS", "JavaScript"],
      },
      en: {
        title: "Web development",
        text: "Websites and small applications — from structure to a working build.",
        stack: ["HTML", "CSS", "JavaScript"],
      },
    },
    ui: {
      symbol: "◌",
      filter: "code",
      surface: "#0F172A",
      accent: "#94A3B8",
      text: "#F3EFE0",
      theme: {
        bg: "#0F172A",
        panel: "#172238",
        line: "#334155",
        muted: "#94A3B8",
        warm: "#e2e8f0",
      },
      match: (p) => p.cat.includes("code"),
      ru: {
        title: "UI / UX",
        text: "Понятная структура, визуальная иерархия и аккуратные состояния интерфейса.",
        stack: ["Figma", "UI", "Motion"],
      },
      en: {
        title: "UI / UX",
        text: "Clear structure, visual hierarchy and carefully crafted interface states.",
        stack: ["Figma", "UI", "Motion"],
      },
    },
    graphics: {
      symbol: "✦",
      filter: "photoshop",
      surface: "#606E4C",
      accent: "#F3EFE0",
      text: "#F3EFE0",
      theme: {
        bg: "#606E4C",
        panel: "#71845a",
        line: "#8fa27a",
        muted: "#d4ddc4",
        warm: "#fffaf0",
      },
      match: (p) => ["pixel", "photoshop", "illustrator"].some((cat) => p.cat.includes(cat)),
      ru: {
        title: "Graphics",
        text: "Обработка изображений, коллажи и визуальная подача, которая поддерживает идею.",
        stack: ["Photoshop", "Illustrator", "Aseprite"],
      },
      en: {
        title: "Graphics",
        text: "Image editing, collages and visual direction that supports the idea.",
        stack: ["Photoshop", "Illustrator", "Aseprite"],
      },
    },
    "3d": {
      symbol: "◇",
      filter: "3d",
      surface: "#1c2026",
      accent: "#ff5a00",
      text: "#F3EFE0",
      theme: {
        bg: "#1c2026",
        panel: "#252b35",
        line: "#414b59",
        muted: "#a9b2bf",
        warm: "#ff8a4d",
      },
      match: (p) => p.cat.includes("3d"),
      ru: {
        title: "3D",
        text: "Трёхмерные сцены и визуальные эксперименты, которые можно развивать в проект.",
        stack: ["Blender", "Unity", "Lighting"],
      },
      en: {
        title: "3D",
        text: "Three-dimensional scenes and visual experiments ready to grow into a project.",
        stack: ["Blender", "Unity", "Lighting"],
      },
    },
  };

  function setPalette(item) {
    const root = document.documentElement;
    Object.entries(item.theme).forEach(([name, value]) =>
      root.style.setProperty(`--${name}`, value),
    );
    root.style.setProperty("--accent", item.accent);
    root.style.setProperty("--text", item.text);
    root.style.setProperty("--career-accent", item.accent);
    root.dataset.theme = activeCareer;
    [career, explorer].forEach((node) => {
      if (!node) return;
      node.style.setProperty("--career-surface", item.surface);
      node.style.setProperty("--career-accent", item.accent);
      node.style.setProperty("--career-text", item.text);
      node.setAttribute("data-active-career", activeCareer);
    });
  }

  const cover = document.getElementById("explorer-cover");
  const label = document.getElementById("explorer-label");
  const status = document.getElementById("explorer-status");
  const title = document.getElementById("explorer-title");
  const text = document.getElementById("explorer-text");
  const note = document.getElementById("explorer-case");
  const tags = document.getElementById("explorer-tags");
  const link = document.getElementById("explorer-link");
  const index = document.getElementById("explorer-index");
  const dots = document.getElementById("explorer-dots");
  const main = explorer?.querySelector(".explorer-main");
  let explorerProjects = [];
  let projectIndex = 0;

  function projectCopy(project) {
    const localized = LANG === "en" && project.en ? project.en : {};
    return {
      title: localized.title || project.title,
      text: localized.text || project.text,
      label: localized.label || project.label,
      status: localized.status !== undefined ? localized.status : project.status,
      caseStudy: localized.case || project.case,
    };
  }
  function projectCover(project) {
    const gallery = project.gallery ? GALLERIES[project.gallery] : null;
    const source = project.image || gallery?.images?.[0];
    cover.style.backgroundImage = project.cover || "linear-gradient(135deg,#3a3328,#0A0A0A)";
    cover.style.backgroundPosition = project.imagePosition || "center";
    if (!source) return;
    const src = source.includes("/") ? source : gallery.dir + source;
    const img = new Image();
    img.onload = () => {
      cover.style.backgroundImage = `url("${src}")`;
    };
    img.src = src;
  }
  function rebuildDots() {
    dots.replaceChildren();
    explorerProjects.forEach((project, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `${i + 1}: ${project.title}`);
      dot.setAttribute("aria-selected", String(i === projectIndex));
      dot.addEventListener("click", () => {
        projectIndex = i;
        renderExplorer();
      });
      dots.append(dot);
    });
  }
  function renderExplorer() {
    if (!explorerProjects.length) return;
    const project = explorerProjects[projectIndex];
    const copy = projectCopy(project);
    label.textContent = copy.label || "project";
    status.textContent = copy.status || t("explorerSoon");
    title.textContent = copy.title;
    text.textContent = copy.text;
    note.textContent = copy.caseStudy
      ? `${copy.caseStudy.label}: ${copy.caseStudy.text}`
      : t("explorerSoon");
    tags.replaceChildren(
      ...(project.tags || []).slice(0, 4).map((name) => {
        const span = document.createElement("span");
        span.textContent = name;
        return span;
      }),
    );
    if (project.link && /^https:\/\//i.test(project.link)) {
      link.hidden = false;
      link.href = project.link;
      link.textContent = t("explorerOpen");
    } else {
      link.hidden = true;
    }
    index.textContent = `${String(projectIndex + 1).padStart(2, "0")} / ${String(explorerProjects.length).padStart(2, "0")}`;
    projectCover(project);
    dots
      .querySelectorAll("button")
      .forEach((dot, i) => dot.setAttribute("aria-selected", String(i === projectIndex)));
    if (motionOK && main) {
      main.classList.remove("is-switching");
      requestAnimationFrame(() => main.classList.add("is-switching"));
    }
  }
  function setExplorerProjects(item) {
    explorerProjects = PROJECTS.filter(item.match);
    projectIndex = 0;
    rebuildDots();
    renderExplorer();
  }
  function selectCareer(id) {
    const item = CAREERS[id] || CAREERS.web;
    activeCareer = id;
    const copy = LANG === "en" ? item.en : item.ru;
    careerTabs.forEach((tab) =>
      tab.setAttribute("aria-selected", String(tab.dataset.career === id)),
    );
    career?.setAttribute("data-active-career", id);
    if (careerIndex)
      careerIndex.textContent = `${String(Object.keys(CAREERS).indexOf(id) + 1).padStart(2, "0")} / 04`;
    if (careerSymbol) careerSymbol.textContent = item.symbol;
    if (careerTitle) careerTitle.textContent = copy.title;
    if (careerText) careerText.textContent = copy.text;
    if (careerStack)
      careerStack.replaceChildren(
        ...copy.stack.map((name) => {
          const span = document.createElement("span");
          span.textContent = name;
          return span;
        }),
      );
    setPalette(item);
    setExplorerProjects(item);
  }

  careerTabs.forEach((tab) =>
    tab.addEventListener("click", () => selectCareer(tab.dataset.career)),
  );
  careerLink?.addEventListener("click", () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: motionOK ? "smooth" : "auto" }),
  );
  document.getElementById("explorer-prev")?.addEventListener("click", () => {
    if (explorerProjects.length) {
      projectIndex = (projectIndex - 1 + explorerProjects.length) % explorerProjects.length;
      renderExplorer();
    }
  });
  document.getElementById("explorer-next")?.addEventListener("click", () => {
    if (explorerProjects.length) {
      projectIndex = (projectIndex + 1) % explorerProjects.length;
      renderExplorer();
    }
  });
  explorer?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") document.getElementById("explorer-prev")?.click();
    if (event.key === "ArrowRight") document.getElementById("explorer-next")?.click();
  });
  document.addEventListener("langchange", () => selectCareer(activeCareer));
  selectCareer(activeCareer);
})();
