const PROJECTS = [
    {
        id: "customjukebox",
        title: "CustomJukebox",
        text: "Мод для Minecraft (Fabric 1.21.1): расширенный проигрыватель с собственными функциями.",
        cat: ["code"],
        cover: "linear-gradient(135deg,#3b2f8f,#13121c)",
        label: "CustomJukebox",
        image: "assets/covers/customjukebox.jpg",
        status: "",
        link: "https://github.com/qnssl/minecrafat-custom-jukebox",
        tags: ["Java", "Fabric"],
        en: { title: "CustomJukebox", text: "Minecraft mod (Fabric 1.21.1): an extended jukebox with custom features.", label: "CustomJukebox" }
    },
    {
        id: "dragon",
        title: "Ручной дракон",
        text: "Мод для Minecraft (Fabric 1.21.1): дракон, которого можно приручить.",
        cat: ["code", "game"],
        cover: "linear-gradient(135deg,#7a3a2a,#13121c)",
        label: "Dragon Mod",
        image: "assets/covers/dragon.jpg",
        status: "В разработке",
        link: "",
        tags: ["Java", "Fabric"],
        en: { title: "Tameable dragon", text: "Minecraft mod (Fabric 1.21.1): a dragon you can tame.", label: "Dragon Mod", status: "In development" }
    },
    {
        id: "remember-this",
        title: "Remember This",
        text: "Хоррор-головоломка и первая инди-игра, за которую я взялся всерьёз: сцена, камера, движение игрока, модели с рисованными текстурами.",
        cat: ["game"],
        cover: "linear-gradient(135deg,#1f3a3a,#13121c)",
        label: "Remember This",
        image: "assets/covers/remember-this.jpg",
        status: "В разработке",
        link: "",
        tags: ["Unity", "C#", "Blender"],
        en: { title: "Remember This", text: "A horror puzzle game and the first indie game I took on seriously: scene, camera, player movement, models with hand-drawn textures.", label: "Remember This", status: "In development" }
    },
    {
        id: "movie-site",
        title: "Сайт для оценки фильмов",
        text: "Описание проекта появится здесь.",
        cat: ["web", "code"],
        cover: "linear-gradient(135deg,#0f4c5c,#13121c)",
        label: "Оценка фильмов",
        image: "assets/covers/movie-site.jpg",
        status: "",
        link: "",
        tags: ["HTML", "CSS", "JavaScript"],
        en: { title: "Movie rating website", text: "The project description will appear here.", label: "Movie ratings" }
    },
    {
        id: "site-examples",
        title: "Примеры сайтов",
        text: "Сайты, которые я делаю: смотрите живые примеры по ссылке.",
        cat: ["web"],
        cover: "linear-gradient(135deg,#7a4a1f,#13121c)",
        label: "Примеры сайтов",
        image: "assets/covers/site-examples.jpg",
        status: "",
        link: "",
        tags: ["HTML", "CSS", "JavaScript"],
        en: { title: "Website examples", text: "Websites I build: see live examples via the link.", label: "Website examples" }
    },
    {
        id: "pixel-art",
        title: "Пиксель-арт",
        text: "Альбом спрайтов, иконок и анимаций.",
        cat: ["pixel"],
        cover: "linear-gradient(135deg,#5a2a5e,#13121c)",
        label: "Пиксель-арт",
        image: "assets/covers/pixel-art.jpg",
        gallery: "pixel",
        tags: ["Aseprite"],
        en: { title: "Pixel art", text: "An album of sprites, icons and animations.", label: "Pixel art" }
    },
    {
        id: "models",
        title: "3D-модели",
        text: "Рендеры и превью моделей из Blender.",
        cat: ["3d"],
        cover: "linear-gradient(135deg,#1f4a6b,#13121c)",
        label: "3D-модели",
        image: "assets/covers/models.jpg",
        gallery: "models",
        tags: ["Blender"],
        en: { title: "3D models", text: "Renders and previews of Blender models.", label: "3D models" }
    },
    {
        id: "photoshop",
        title: "Работы в Photoshop",
        text: "Обработка фото, баннеры, коллажи, ИИ-визуал.",
        cat: ["photoshop"],
        cover: "linear-gradient(135deg,#1f3b6b,#13121c)",
        label: "Photoshop",
        image: "assets/covers/photoshop.jpg",
        gallery: "photoshop",
        tags: ["Photoshop", "ИИ"],
        en: { title: "Photoshop works", text: "Photo editing, banners, collages, AI visuals.", label: "Photoshop" }
    },
    {
        id: "illustrator",
        title: "Работы в Illustrator",
        text: "Векторная графика, логотипы, иллюстрации.",
        cat: ["illustrator"],
        cover: "linear-gradient(135deg,#6b3a1f,#13121c)",
        label: "Illustrator",
        image: "assets/covers/illustrator.jpg",
        gallery: "illustrator",
        tags: ["Illustrator"],
        en: { title: "Illustrator works", text: "Vector graphics, logos, illustrations.", label: "Illustrator" }
    }
];

const GALLERIES = {
    pixel: {
        title: "Пиксель-арт",
        text: "Нажмите на работу, чтобы открыть её на весь экран.",
        pixel: true,
        scale: 4,
        dir: "assets/pixel-art/",
        images: [],
        en: { title: "Pixel art", text: "Click a work to open it full screen." }
    },
    models: {
        title: "3D-модели",
        text: "Превью моделей. Сами модели на сайте не публикуются.",
        pixel: false,
        scale: 1,
        dir: "assets/3d/",
        images: [],
        en: { title: "3D models", text: "Model previews. The models themselves are not published on the site." }
    },
    photoshop: {
        title: "Photoshop",
        text: "Обработка и графика в Photoshop.",
        pixel: false,
        scale: 1,
        dir: "assets/photoshop/",
        images: [],
        en: { title: "Photoshop", text: "Editing and graphics in Photoshop." }
    },
    illustrator: {
        title: "Illustrator",
        text: "Векторные работы.",
        pixel: false,
        scale: 1,
        dir: "assets/illustrator/",
        images: [],
        en: { title: "Illustrator", text: "Vector works." }
    }
};