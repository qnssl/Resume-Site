const I18N = {
    "en": {
        "skip": "Skip to projects",
        "name": "Nikita Kuzhel",
        "about": "About",
        "projects": "Projects",
        "path": "Path",
        "certs": "Certificates",
        "cvBtn": "Open CV (PDF)",
        "tg": "Message me on Telegram",
        "heroText": "I write in C#, Java and JavaScript, build websites and mods, draw pixel art and model in Blender. I use neural networks as a tool: I always check the result and finish it myself.",
        "tag1": "Unity and C#",
        "tag2": "Java programming",
        "tag3": "Websites: HTML, CSS, JavaScript",
        "tag4": "Vibe coding and AI-assisted development",
        "tag5": "Presentations and documents",
        "tag6": "Graphics: Photoshop and Illustrator",
        "gameTitle": "Catch skills, dodge bugs",
        "lead": "In my free time I'm making Remember This, a horror puzzle game in Unity. It's the first game I took on seriously: the scene, camera and player movement are ready, and some models have hand-drawn textures. I also make mods for programs and games and draw pixel art.",
        "aiText": "I use AI tools confidently: I write code myself and also do vibe coding. I always check the result and bring it to a working state.",
        "stack": "Stack",
        "aiTools": "AI tools",
        "languages": "Languages",
        "lBe": "Belarusian",
        "native": "native",
        "lRu": "Russian",
        "lEn": "English",
        "lCs": "Czech",
        "lSk": "Slovak",
        "education": "Education",
        "eduNote": "I'm not studying at the moment and am on academic leave.",
        "fAll": "All",
        "fCode": "Code and mods",
        "fGames": "Games",
        "fWeb": "Websites",
        "fPixel": "Pixel art",
        "f3d": "3D models",
        "since2025": "Since 2025",
        "uhk": "University of Hradec Králové, Czechia",
        "uhkText": "Applied informatics, 1 year. Not studying at the moment (academic leave).",
        "dmDates": "February — July 2025",
        "dm": "Store and warehouse employee, DM drogerie markt",
        "hk": "Hradec Králové, Czechia.",
        "whatIDid": "What I did",
        "dm1": "receiving, sorting and shelving goods",
        "dm2": "preparing goods for display",
        "dm3": "keeping the warehouse and work areas tidy",
        "kwork": "Freelancing on Kwork",
        "kworkText": "Online visual design orders in specialized software, including with neural networks.",
        "courses": "Professional development, courses",
        "c3d": "3D Visualizer (profession)",
        "c3dText": "Skillbox · 3D visualization",
        "cUnity": "Unity Game Developer from scratch to Middle (profession)",
        "cUnityText": "Skillbox · Game development in Unity (C#)",
        "cAi": "Neural networks",
        "cAiText": "Skillbox · Working with neural networks",
        "certsTitle": "Certificates and courses",
        "cert2026": "2026 · certificate",
        "certFinal": "Generative AI Content Creation, final assessment",
        "cta": "Let's work together",
        "ctaText": "I'm looking for a permanent job and projects where I can grow in IT and related fields.",
        "cvOpen": "Open CV",
        "mail": "Email me",
        "copy": "© 2026 Nikita Kuzhel",
        "back": "← Back to the site",
        "navAria": "Sections",
        "menuAria": "Menu",
        "canvasAria": "Mini game: move with the mouse, your finger or the arrow keys",
        "filterAria": "Project filter",
        "galleryAria": "Gallery",
        "closeAria": "Close",
        "prevAria": "Previous",
        "nextAria": "Next",
        "title": "Nikita Kuzhel — code, graphics and projects",
        "desc": "Portfolio of Nikita Kuzhel: code, mods, websites, graphics, 3D and work with AI.",
        "heroTitle": "Code, graphics and projects",
        "edu1": "University of Hradec Králové (Czechia), applied informatics.",
        "start": "Play",
        "again": "Play again",
        "intro": "Move with the mouse, your finger or the arrow keys. Don't catch the red bugs with tentacles. Stars give a bonus, hearts restore a life.",
        "over": "Score: {s}, level {l}. Again?",
        "level": "Lvl",
        "levelUp": "Level",
        "best": "Best: ",
        "combo": "Combo x",
        "life": "+life",
        "works": "works",
        "soon": "Soon",
        "openAlbum": "Open album",
        "openProject": "Open project",
        "empty": "Works will appear here soon.",
        "imgAria": "Open image"
    },
    "ru": {
        "start": "Играть",
        "again": "Играть снова",
        "intro": "Двигайте мышью, пальцем или стрелками. Красные баги с щупальцами ловить нельзя. Звёзды дают бонус, сердца возвращают жизнь.",
        "over": "Счёт: {s}, уровень {l}. Ещё раз?",
        "level": "Ур.",
        "levelUp": "Уровень",
        "best": "Рекорд: ",
        "combo": "Комбо x",
        "life": "+жизнь",
        "works": "работ",
        "soon": "Скоро",
        "openAlbum": "Открыть альбом",
        "openProject": "Открыть проект",
        "empty": "Здесь скоро появятся работы.",
        "imgAria": "Открыть изображение"
    }
};
const RU_TITLE = document.title;
const metaDesc = document.querySelector('meta[name="description"]');
const RU_DESC = metaDesc ? metaDesc.content : "";
let LANG = "ru";
try {
    const saved = localStorage.getItem("lang");
    if (saved === "ru" || saved === "en") LANG = saved;
    else if (!/^(ru|be|uk)/i.test(navigator.language || "ru")) LANG = "en";
} catch (e) {}

const t = k => (I18N[LANG][k] !== undefined ? I18N[LANG][k] : k);

function splitTitle(h1, text) {
    h1.setAttribute("aria-label", text);
    h1.replaceChildren();
    const words = text.split(" ");
    words.forEach((w, i) => {
        const ws = document.createElement("span");
        ws.className = "w" + (i === 1 ? " hl" : "");
        ws.setAttribute("aria-hidden", "true");
        [...w].forEach(c => {
            const cs = document.createElement("span");
            cs.className = "ch";
            cs.textContent = c;
            ws.append(cs);
        });
        h1.append(ws);
        if (i < words.length - 1) h1.append(" ");
    });
}

function applyLang(lang) {
    LANG = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(node => {
        if (node.dataset.ru === undefined) node.dataset.ru = node.textContent;
        const text = lang === "en" ? I18N.en[node.dataset.i18n] : node.dataset.ru;
        if (text === undefined) return;
        if (node.hasAttribute("data-split")) splitTitle(node, text);
        else node.textContent = text;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(node => {
        if (node.dataset.ruAria === undefined) node.dataset.ruAria = node.getAttribute("aria-label");
        node.setAttribute("aria-label", lang === "en" ? I18N.en[node.dataset.i18nAria] : node.dataset.ruAria);
    });
    document.title = lang === "en" ? I18N.en.title : RU_TITLE;
    if (metaDesc) metaDesc.content = lang === "en" ? I18N.en.desc : RU_DESC;
    const btn = document.getElementById("lang-btn");
    btn.textContent = lang === "ru" ? "EN" : "RU";
    btn.setAttribute("lang", lang === "ru" ? "en" : "ru");
    btn.setAttribute("aria-label", lang === "ru" ? "Switch to English" : "Переключить на русский");
    try { localStorage.setItem("lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange"));
}

document.getElementById("lang-btn").addEventListener("click", () => applyLang(LANG === "ru" ? "en" : "ru"));
applyLang(LANG);