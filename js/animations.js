(function () {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const A = window.anime, M = window.Motion;

    document.addEventListener("pointermove", e => {
        const c = e.target.closest && e.target.closest(".proj");
        if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
    });

    if (A && !reduce) {

        const targets = ".hero h1 .ch, .hero p, .hero .cta .btn, .facts .tag, .game";
        A.set(targets, { opacity: 0 });
        A.timeline({ easing: "easeOutExpo" })
            .add({ targets: ".hero h1 .ch", translateY: [40, 0], rotate: [8, 0], opacity: [0, 1], duration: 900, delay: A.stagger(28) })
            .add({ targets: ".hero p", translateY: [16, 0], opacity: [0, 1], duration: 700 }, "-=600")
            .add({ targets: ".hero .cta .btn", translateY: [16, 0], opacity: [0, 1], duration: 600, delay: A.stagger(90) }, "-=500")
            .add({ targets: ".facts .tag", translateY: [12, 0], opacity: [0, 1], duration: 500, delay: A.stagger(70) }, "-=400")
            .add({ targets: ".game", translateX: [40, 0], opacity: [0, 1], duration: 900 }, "-=1500");
        setTimeout(() => document.querySelectorAll(targets).forEach(el => {
            if (+getComputedStyle(el).opacity < 0.05) el.style.opacity = 1;
        }), 4500);

        document.querySelectorAll(".bg-orbs i").forEach(el => A({
            targets: el,
            translateX: () => A.random(-14, 14) + "vw",
            translateY: () => A.random(-14, 14) + "vh",
            scale: [1, 1.25],
            duration: () => A.random(9000, 15000),
            direction: "alternate", loop: true, easing: "easeInOutSine"
        }));

        const chipsIO = new IntersectionObserver(es => es.forEach(e => {
            if (!e.isIntersecting) return;
            A({ targets: [...e.target.children], translateY: [10, 0], opacity: [0, 1], duration: 500, delay: A.stagger(30), easing: "easeOutCubic" });
            chipsIO.unobserve(e.target);
        }), { threshold: 0.2 });
        document.querySelectorAll("#about .chips").forEach(c => {
            [...c.children].forEach(ch => ch.style.opacity = 0);
            chipsIO.observe(c);
        });
    }

    if (M && M.hover && M.animate && !reduce) {
        const spring = { type: "spring", stiffness: 320, damping: 22 };
        const shift = (el, to) => M.hover(el, () => {
            M.animate(el, to, spring);
            return () => M.animate(el, { x: 0, y: 0, scale: 1 }, spring);
        });
        window.onCardRender = el => shift(el, { y: -5, scale: 1.015 });
        document.querySelectorAll(".proj").forEach(window.onCardRender);
        document.querySelectorAll(".cert").forEach(el => shift(el, { x: 8 }));
        document.querySelectorAll(".tag").forEach(el => shift(el, { y: -2, scale: 1.04 }));

        document.querySelectorAll(".btn").forEach(el => {
            if (el.matches(".hero .btn.primary")) {
                el.addEventListener("pointermove", e => {
                    const r = el.getBoundingClientRect();
                    M.animate(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35 }, { type: "spring", stiffness: 200, damping: 15 });
                });
                el.addEventListener("pointerleave", () => M.animate(el, { x: 0, y: 0 }, spring));
            } else {
                shift(el, { y: -2, scale: 1.04 });
            }
            if (M.press) M.press(el, () => { M.animate(el, { scale: 0.96 }, spring); return () => M.animate(el, { scale: 1 }, spring); });
        });

        if (M.scroll) {
            M.scroll(
                M.animate(document.querySelector(".hero > div:first-child"), { y: [0, -60], opacity: [1, 0.25] }, { ease: "linear" }),
                { target: document.querySelector(".hero"), offset: ["start start", "end start"] }
            );
        }
    }
})();