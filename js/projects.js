const PROJECTS = [
    {
        title: "CustomJukebox",
        text: "Мод для Minecraft (Fabric 1.21.1): расширенный проигрыватель с собственными функциями.",
        cat: ["code"],
        cover: "linear-gradient(135deg,#3b2f8f,#13121c)",
        label: "CustomJukebox",
        status: "",
        link: "https://github.com/qnssl/minecrafat-custom-jukebox",
        tags: ["Java", "Fabric"]
    },
    {
        title: "Ручной дракон",
        text: "Мод для Minecraft (Fabric 1.21.1): дракон, которого можно приручить.",
        cat: ["code", "game"],
        cover: "linear-gradient(135deg,#7a3a2a,#13121c)",
        label: "Dragon Mod",
        status: "В разработке",
        link: "",
        tags: ["Java", "Fabric"]
    },
    {
        title: "Remember This",
        text: "Хоррор-головоломка и первая инди-игра, за которую я взялся всерьёз: сцена, камера, движение игрока, модели с рисованными текстурами.",
        cat: ["game"],
        cover: "linear-gradient(135deg,#1f3a3a,#13121c)",
        label: "Remember This",
        status: "В разработке",
        link: "",
        tags: ["Unity", "C#", "Blender"]
    },
    {
        title: "Сайт для оценки фильмов",
        text: "Описание проекта появится здесь.",
        cat: ["web", "code"],
        cover: "linear-gradient(135deg,#0f4c5c,#13121c)",
        label: "Оценка фильмов",
        status: "",
        link: "",
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Примеры сайтов",
        text: "Сайты, которые я делаю: смотрите живые примеры по ссылке.",
        cat: ["web"],
        cover: "linear-gradient(135deg,#7a4a1f,#13121c)",
        label: "Примеры сайтов",
        status: "",
        link: "",
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Пиксель-арт",
        text: "Альбом спрайтов, иконок и анимаций.",
        cat: ["pixel"],
        cover: "",
        label: "Пиксель-арт",
        gallery: "pixel",
        tags: ["Aseprite"]
    },
    {
        title: "3D-модели",
        text: "Рендеры и превью моделей из Blender.",
        cat: ["3d"],
        cover: "",
        label: "3D-модели",
        gallery: "models",
        tags: ["Blender"]
    },
    {
        title: "Работы в Photoshop",
        text: "Обработка фото, баннеры, коллажи, ИИ-визуал.",
        cat: ["photoshop"],
        cover: "",
        label: "Photoshop",
        gallery: "photoshop",
        tags: ["Photoshop", "ИИ"]
    },
    {
        title: "Работы в Illustrator",
        text: "Векторная графика, логотипы, иллюстрации.",
        cat: ["illustrator"],
        cover: "",
        label: "Illustrator",
        gallery: "illustrator",
        tags: ["Illustrator"]
    }
];

const GALLERIES = {
    pixel: {
        title: "Пиксель-арт",
        text: "Нажмите на работу, чтобы открыть её на весь экран.",
        pixel: true,
        scale: 4,
        images: [
        ]
    },
    models: {
        title: "3D-модели",
        text: "Превью моделей. Сами модели на сайте не публикуются.",
        pixel: false,
        scale: 1,
        images: [
        ]
    },
    photoshop: {
        title: "Photoshop",
        text: "Обработка и графика в Photoshop.",
        pixel: false,
        scale: 1,
        images: [
        ]
    },
    illustrator: {
        title: "Illustrator",
        text: "Векторные работы.",
        pixel: false,
        scale: 1,
        images: [
        ]
    }
};