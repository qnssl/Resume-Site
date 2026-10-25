/* ---------- Проекты, фильтры, появление блоков ---------- */
const list = document.getElementById("projects-list");
const filterBtns = document.querySelectorAll(".filters button");

const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
const reveal = el => { el.classList.add("reveal"); io.observe(el); };

function renderProjects(filter) {
    list.innerHTML = "";
    PROJECTS.filter(p => filter === "all" || p.cat.includes(filter)).forEach(p => {
        const g = p.gallery ? GALLERIES[p.gallery] : null;
        let cover = p.cover;
        if (!cover && g && g.images.length) cover = `url("${g.images[0]}")`;
        if (!cover) cover = "linear-gradient(135deg,#34324a,#13121c)";
        const isImg = cover.includes("url(");
        const card = document.createElement("article");
        card.className = "proj";
        card.innerHTML =
            `<div class="cover${g && g.pixel ? " pix" : ""}" style="background-image:${cover}">${isImg ? "" : p.label}</div>` +
            `<div class="body"><h3>${p.title}</h3><p>${p.text}</p><div class="chips">${p.tags.map(t => `<span>${t}</span>`).join("")}</div></div>` +
            `<div class="act">` +
            (p.status ? `<span class="status">${p.status}</span>` : "") +
            (g ? `<span class="count">${g.images.length ? g.images.length + " работ" : "Скоро"}</span><a class="link" href="#">Открыть альбом</a>` : "") +
            (p.link ? `<a class="link" href="${p.link}" target="_blank" rel="noopener">Открыть проект</a>` : "") +
            `</div>`;
        if (g) {
            card.dataset.gallery = p.gallery;
            card.addEventListener("click", e => { e.preventDefault(); openGallery(p.gallery); });
        } else if (p.link) {
            card.classList.add("clickable");
            card.addEventListener("click", e => { if (!e.target.closest("a")) window.open(p.link, "_blank", "noopener"); });
        }
        list.appendChild(card);
        reveal(card);
        if (window.onCardRender) window.onCardRender(card);
    });
}
filterBtns.forEach(b => b.addEventListener("click", () => {
    filterBtns.forEach(x => x.setAttribute("aria-pressed", x === b));
    renderProjects(b.dataset.f);
}));
renderProjects("all");
document.querySelectorAll("h2, .about-text, .facts-list > div, .cert, .tl article, .end").forEach(reveal);

/* ---------- Полоса прокрутки ---------- */
const bar = document.getElementById("progress");
addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + "%";
}, { passive: true });

/* ---------- Альбомы и просмотр на весь экран ---------- */
const galleryEl = document.getElementById("gallery");
const mosaic = document.getElementById("mosaic");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
let curG = null, curI = 0;

function openGallery(id) {
    const g = GALLERIES[id];
    if (!g) return;
    curG = g;
    document.getElementById("g-title").textContent = g.title;
    document.getElementById("g-text").textContent = g.text;
    mosaic.innerHTML = g.images.length ? "" : '<p class="empty">Здесь скоро появятся работы.</p>';
    g.images.forEach((src, i) => {
        const b = document.createElement("button");
        b.setAttribute("aria-label", "Открыть изображение " + (i + 1));
        const img = new Image();
        img.src = src; img.alt = g.title + " " + (i + 1); img.loading = "lazy";
        if (g.pixel) img.style.imageRendering = "pixelated";
        img.onload = () => { if (g.scale > 1) img.style.width = img.naturalWidth * g.scale + "px"; };
        b.style.transform = `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg) translateY(${Math.round(Math.random() * 30 - 15)}px)`;
        b.onclick = () => openLightbox(i);
        b.appendChild(img);
        mosaic.appendChild(b);
    });
    galleryEl.hidden = false;
    galleryEl.scrollTop = 0;
    document.body.style.overflow = "hidden";
}
function closeGallery() { galleryEl.hidden = true; document.body.style.overflow = ""; }

function openLightbox(i) {
    curI = (i + curG.images.length) % curG.images.length;
    lbImg.style.width = "";
    lbImg.style.imageRendering = curG.pixel ? "pixelated" : "auto";
    lbImg.onload = () => {
        if (curG.pixel) {
            const k = Math.max(1, Math.floor(Math.min(innerWidth * 0.8 / lbImg.naturalWidth, innerHeight * 0.8 / lbImg.naturalHeight)));
            lbImg.style.width = lbImg.naturalWidth * k + "px";
        }
    };
    lbImg.src = curG.images[curI];
    lightbox.hidden = false;
}
document.getElementById("g-back").onclick = closeGallery;
document.getElementById("lb-close").onclick = () => lightbox.hidden = true;
document.getElementById("lb-prev").onclick = () => openLightbox(curI - 1);
document.getElementById("lb-next").onclick = () => openLightbox(curI + 1);
lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.hidden = true; });
addEventListener("keydown", e => {
    if (!lightbox.hidden) {
        if (e.key === "Escape") lightbox.hidden = true;
        if (e.key === "ArrowLeft") openLightbox(curI - 1);
        if (e.key === "ArrowRight") openLightbox(curI + 1);
    } else if (!galleryEl.hidden && e.key === "Escape") closeGallery();
});

/* ---------- Мини-игра: ловите навыки, обходите баги ---------- */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const msg = document.getElementById("msg");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const bestEl = document.getElementById("best");
const W = canvas.width, H = canvas.height;

const GOOD = ["C#", "Java", "Unity", "Blender", "Git", "HTML", "CSS", "JavaScript", "Claude", "Recraft"];
const COLORS = ["#8f83ff", "#ffb454", "#4ade80", "#60a5fa"];
const LEVEL_ACCENTS = ["#8f83ff", "#60a5fa", "#4ade80", "#ffb454", "#ff9ecb"]; // соседние цвета переходят друг в друга мягче
const BAD = "#ff6b81", GOLD = "#ffd966", HEART = "#ff9ecb";

let best = 0;
try { best = +localStorage.getItem("bestScore") || 0; } catch (e) {}
const showBest = () => bestEl.textContent = best ? "Рекорд: " + best : "";
showBest();

let items, parts, floats, stars, player, score, lives, combo, level, stage, lastShift, running, last, spawnT;

function initStars() {
    stars = Array.from({ length: 45 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .3, v: 8 + Math.random() * 25 }));
}
function setAccent(c) { document.documentElement.style.setProperty("--accent", c); }

function reset() {
    items = []; parts = []; floats = [];
    player = { x: W / 2, w: 70, h: 14 };
    score = 0; lives = 3; combo = 0; level = 1; stage = 0; lastShift = performance.now(); spawnT = 0;
    scoreEl.textContent = 0; levelEl.textContent = "Ур. 1";
    setAccent(LEVEL_ACCENTS[0]);
    initStars();
}

function spawn() {
    const r = Math.random();
    let type = "skill";
    if (r < 0.25) type = "bug";
    else if (r < 0.30 && lives < 3) type = "heart";
    else if (r < 0.35) type = "star";
    const text = type === "bug" ? "bug" : type === "heart" ? "+♥" : type === "star" ? "★ +5" : GOOD[Math.floor(Math.random() * GOOD.length)];
    ctx.font = "600 15px Onest, sans-serif";
    const w = ctx.measureText(text).width + 22;
    items.push({
        type, text, w: type === "bug" ? 64 : w, h: type === "bug" ? 32 : 26,
        x: w / 2 + Math.random() * (W - w), y: -20,
        v: 110 + Math.random() * 60 + score * 2.5 + level * 6,
        color: type === "bug" ? BAD : type === "heart" ? HEART : type === "star" ? GOLD : COLORS[Math.floor(Math.random() * COLORS.length)]
    });
}

function burst(x, y, color, n) {
    for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, s = 40 + Math.random() * 120;
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: 0.6, color });
    }
}
function floatText(x, y, text, color) { floats.push({ x, y, text, color, life: 0.9 }); }
function pulseChip(text) {
    document.querySelectorAll(".chips span").forEach(c => {
        if (c.textContent === text) { c.classList.remove("pulse"); void c.offsetWidth; c.classList.add("pulse"); }
    });
}
function addScore(n) {
    score += n;
    scoreEl.textContent = score;
    // уровни идут всё реже: 6, 24, 54, 96 очков и так далее
    const lv = 1 + Math.floor(Math.sqrt(score / 6));
    if (lv > level) {
        level = lv;
        levelEl.textContent = "Ур. " + level;
        floatText(W / 2, H / 2, "Уровень " + level, "#ecebf5");
        // цвет сайта меняется с каждым уровнем, но не чаще, чем раз в 10 секунд
        const st = level - 1;
        if (st > stage && performance.now() - lastShift > 10000) {
            stage = st;
            lastShift = performance.now();
            setAccent(LEVEL_ACCENTS[stage % LEVEL_ACCENTS.length]);
        }
    }
}

function pill(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }


function dot(x, y, r, color) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = color; ctx.fill(); }
// Баг: красная пилюля "bug" со злыми глазами, антеннами и извивающимися щупальцами
function drawBug(it) {
    const w = it.w, h = it.h, t = performance.now() / 180;
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.lineCap = "round"; ctx.lineWidth = 2.5; ctx.strokeStyle = BAD;
    ctx.shadowColor = BAD; ctx.shadowBlur = 14;
    for (let i = -2; i <= 2; i++) {
        const bx = i * 11;
        ctx.beginPath();
        ctx.moveTo(bx, h / 2 - 3);
        ctx.quadraticCurveTo(bx + Math.sin(t + i) * 7, h / 2 + 8, bx + Math.sin(t * 1.3 + i) * 9, h / 2 + 17);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(-10, -h / 2 + 2); ctx.lineTo(-16, -h / 2 - 9);
    ctx.moveTo(10, -h / 2 + 2); ctx.lineTo(16, -h / 2 - 9);
    ctx.stroke();
    pill(-w / 2, -h / 2, w, h, h / 2);
    ctx.fillStyle = BAD; ctx.fill();
    ctx.shadowBlur = 0;
    [-1, 1].forEach(s => {
        const ex = s * (w / 2 - 14);
        dot(ex, 0, 4.2, "#fff"); dot(ex + s * -0.8, 1, 1.9, "#13121c");
        ctx.strokeStyle = "#13121c"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ex + s * 6, -7); ctx.lineTo(ex - s * 5, -3); ctx.stroke();
    });
    ctx.fillStyle = "#13121c"; ctx.font = "700 14px Onest, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("bug", 0, 1);
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(236,235,245,.5)";
    stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill(); });
    ctx.font = "600 15px Onest, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    items.forEach(it => {
        if (it.type === "bug") return drawBug(it);
        pill(it.x - it.w / 2, it.y - it.h / 2, it.w, it.h, 13);
        ctx.fillStyle = it.color + "33"; ctx.fill();
        ctx.strokeStyle = it.color; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = it.color; ctx.fillText(it.text, it.x, it.y + 1);
    });
    parts.forEach(p => { ctx.globalAlpha = Math.max(p.life / 0.6, 0); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3); });
    ctx.globalAlpha = 1;
    floats.forEach(f => { ctx.globalAlpha = Math.min(f.life, 1); ctx.fillStyle = f.color; ctx.fillText(f.text, f.x, f.y); });
    ctx.globalAlpha = 1;
    ctx.save();
    if (combo >= 5) { ctx.shadowColor = LEVEL_ACCENTS[stage % LEVEL_ACCENTS.length]; ctx.shadowBlur = 16; }
    pill(player.x - player.w / 2, H - 34, player.w, player.h, 7);
    ctx.fillStyle = "#ecebf5"; ctx.fill();
    ctx.restore();
    ctx.textAlign = "left"; ctx.fillStyle = BAD;
    ctx.fillText("♥".repeat(lives), 12, 20);
    if (combo >= 3) { ctx.textAlign = "right"; ctx.fillStyle = GOLD; ctx.fillText("Комбо x" + Math.min(1 + Math.floor(combo / 5), 4), W - 12, 20); }
}

function loop(t) {
    if (!running) return;
    const dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    spawnT -= dt;
    if (spawnT <= 0) { spawn(); spawnT = Math.max(0.3, 0.9 - score * 0.008); }
    items.forEach(it => it.y += it.v * dt);
    stars.forEach(s => { s.y += s.v * dt; if (s.y > H) { s.y = 0; s.x = Math.random() * W; } });
    parts.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 220 * dt; p.life -= dt; });
    parts = parts.filter(p => p.life > 0);
    floats.forEach(f => { f.y -= 30 * dt; f.life -= dt; });
    floats = floats.filter(f => f.life > 0);

    const py = H - 34;
    items = items.filter(it => {
        const hit = it.y + it.h / 2 >= py && it.y - it.h / 2 <= py + player.h && Math.abs(it.x - player.x) < (it.w + player.w) / 2;
        if (!hit) return it.y < H + 30;
        if (it.type === "bug") {
            lives--; combo = 0;
            burst(it.x, it.y, BAD, 14); floatText(it.x, it.y - 20, "-1", BAD);
        } else if (it.type === "heart") {
            lives = Math.min(3, lives + 1);
            burst(it.x, it.y, HEART, 10); floatText(it.x, it.y - 20, "+жизнь", HEART);
        } else if (it.type === "star") {
            combo++; addScore(5);
            burst(it.x, it.y, GOLD, 16); floatText(it.x, it.y - 20, "+5", GOLD);
        } else {
            combo++;
            const m = Math.min(1 + Math.floor(combo / 5), 4);
            addScore(m);
            burst(it.x, it.y, it.color, 8); floatText(it.x, it.y - 20, "+" + m, it.color);
            pulseChip(it.text);
        }
        return false;
    });
    draw();
    if (lives <= 0) return end();
    requestAnimationFrame(loop);
}

function start() {
    reset();
    overlay.hidden = true;
    running = true;
    canvas.classList.add("playing");
    last = performance.now();
    requestAnimationFrame(loop);
}

function end() {
    running = false;
    canvas.classList.remove("playing");
    if (score > best) { best = score; try { localStorage.setItem("bestScore", best); } catch (e) {} }
    showBest();
    msg.textContent = "Счёт: " + score + ", уровень " + level + ". Ещё раз?";
    document.getElementById("start").textContent = "Играть снова";
    overlay.hidden = false;
}

function moveTo(x0) {
    const r = canvas.getBoundingClientRect();
    const x = (x0 - r.left) * (W / r.width);
    player.x = Math.max(player.w / 2, Math.min(W - player.w / 2, x));
}
canvas.addEventListener("pointermove", e => { if (running) moveTo(e.clientX); });
canvas.addEventListener("pointerdown", e => { if (running) moveTo(e.clientX); });
addEventListener("keydown", e => {
    if (!running) return;
    if (e.key === "ArrowLeft" || e.key === "a") { player.x = Math.max(player.w / 2, player.x - 28); e.preventDefault(); }
    if (e.key === "ArrowRight" || e.key === "d") { player.x = Math.min(W - player.w / 2, player.x + 28); e.preventDefault(); }
});
document.getElementById("start").addEventListener("click", start);

reset(); draw();

/* ---------- Плавная прокрутка колесиком и по меню ---------- */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let sTarget = scrollY, sCurrent = scrollY, sRaf = null;
const sMax = () => document.documentElement.scrollHeight - innerHeight;

function sTick() {
    sCurrent += (sTarget - sCurrent) * 0.1;
    if (Math.abs(sTarget - sCurrent) < 0.5) { sCurrent = sTarget; sRaf = null; }
    scrollTo({ top: sCurrent, behavior: "instant" });
    if (sRaf) sRaf = requestAnimationFrame(sTick);
}
function smoothTo(y) {
    sTarget = Math.max(0, Math.min(y, sMax()));
    if (reduceMotion) { scrollTo({ top: sTarget, behavior: "instant" }); return; }
    if (!sRaf) { sCurrent = scrollY; sRaf = requestAnimationFrame(sTick); }
}
addEventListener("wheel", e => {
    if (reduceMotion || e.ctrlKey || !galleryEl.hidden || !lightbox.hidden) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (!sRaf) sTarget = scrollY;
    smoothTo(sTarget + (e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY));
}, { passive: false });
addEventListener("scroll", () => { if (!sRaf) { sTarget = scrollY; sCurrent = scrollY; } }, { passive: true });
document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    const el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    smoothTo(a.getAttribute("href") === "#top" ? 0 : el.getBoundingClientRect().top + scrollY - 72);
});

/* ---------- Мобильное меню ---------- */
const menuBtn = document.getElementById("menu-btn");
const navEl = document.getElementById("main-nav");
const closeMenu = () => { navEl.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); };
menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", navEl.classList.toggle("open")));
navEl.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
addEventListener("resize", () => { if (innerWidth > 860) closeMenu(); });

/* ---------- Свайп в просмотре на весь экран ---------- */
let touchX = null;
lightbox.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) openLightbox(curI + (dx < 0 ? 1 : -1));
});

/* ---------- Подсветка текущего раздела в меню ---------- */
const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll("header nav a").forEach(a =>
        a.setAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id ? "true" : "false"));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(sec => spy.observe(sec));