(() => {
  "use strict";
  const dock = document.getElementById("rubber-dock");
  if (!dock) return;
  const items = [...dock.querySelectorAll("a")];
  const sections = items.map((item) => document.getElementById(item.hash.slice(1)));
  const indicator = dock.querySelector(".tab-pill-indicator");
  let active = null;
  let scrollFrame = 0;

  function measure() {
    if (!active || !indicator) return;
    indicator.style.transform = `translateX(${active.offsetLeft - 7}px)`;
    indicator.style.width = `${active.offsetWidth}px`;
  }
  function keepActiveVisible() {
    if (!active || dock.scrollWidth <= dock.clientWidth) return;
    const left = active.offsetLeft - dock.scrollLeft;
    const right = left + active.offsetWidth;
    if (left < 7) dock.scrollLeft += left - 7;
    else if (right > dock.clientWidth - 7) dock.scrollLeft += right - dock.clientWidth + 7;
  }
  function activate(item) {
    if (!item) return;
    const changed = active !== item;
    active = item;
    items.forEach((link) => {
      if (link === item) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    measure();
    if (changed) keepActiveVisible();
  }
  function syncSection() {
    scrollFrame = 0;
    const marker = Math.max(140, innerHeight * 0.25);
    let index = 0;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= marker) index = i;
    });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4)
      index = items.length - 1;
    activate(items[index]);
  }
  function queueSync() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(syncSection);
  }

  items.forEach((item) => item.addEventListener("click", () => activate(item)));
  addEventListener("scroll", queueSync, { passive: true });
  addEventListener(
    "resize",
    () => {
      queueSync();
      requestAnimationFrame(keepActiveVisible);
    },
    { passive: true },
  );
  document.addEventListener("langchange", () =>
    requestAnimationFrame(() => {
      measure();
      keepActiveVisible();
    }),
  );
  if (document.fonts)
    document.fonts.ready.then(() => {
      queueSync();
      requestAnimationFrame(keepActiveVisible);
    });
  syncSection();
})();
