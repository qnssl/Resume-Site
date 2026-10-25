// СПИСОК ПРОЕКТОВ. Чтобы добавить работу, скопируйте один блок { ... }, вставьте после запятой и поправьте поля.
//
// title   — название
// text    — короткое описание
// cat     — категории для фильтров: "code", "game", "web", "pixel", "3d", "photoshop", "illustrator" (можно несколько)
// cover   — фон карточки: градиент или картинка, например "url(assets/remember-this.png)".
//           Для альбомов можно оставить "" — тогда обложкой станет первая картинка альбома.
// label   — надпись на обложке (если нет картинки)
// status  — подпись вроде "В разработке" (можно "")
// link    — ссылка на репозиторий (откроется в новой вкладке; "" = без ссылки)
// tags    — теги технологий
// gallery — (необязательно) ключ альбома из GALLERIES ниже: тогда карточка открывает альбом

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
        link: "",           // вставьте ссылку на репозиторий
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
        text: "Описание проекта появится здесь.",   // впишите своё описание
        cat: ["web", "code"],
        cover: "linear-gradient(135deg,#0f4c5c,#13121c)",
        label: "Оценка фильмов",
        status: "",
        link: "",           // ссылка на сайт или репозиторий
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Примеры сайтов",
        text: "Сайты, которые я делаю: смотрите живые примеры по ссылке.",   // поправьте текст
        cat: ["web"],
        cover: "linear-gradient(135deg,#7a4a1f,#13121c)",
        label: "Примеры сайтов",
        status: "",
        link: "",           // ссылка на страницу с примерами
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

// АЛЬБОМЫ. Положите файлы в папку assets/... и впишите пути в images (png, jpg, jpeg, gif, webp, в том числе с прозрачным фоном).
// pixel: true — чёткие пиксели без сглаживания; scale — во сколько раз увеличить маленькие картинки в мозаике.
const GALLERIES = {
    pixel: {
        title: "Пиксель-арт",
        text: "Нажмите на работу, чтобы открыть её на весь экран.",
        pixel: true,
        scale: 4,
        images: [
            // "assets/pixel-art/sprite1.png",
            // "assets/pixel-art/cat.gif"
        ]
    },
    models: {
        title: "3D-модели",
        text: "Превью моделей. Сами модели на сайте не публикуются.",
        pixel: false,
        scale: 1,
        images: [
            // "assets/3d/model1.png"
        ]
    },
    photoshop: {
        title: "Photoshop",
        text: "Обработка и графика в Photoshop.",
        pixel: false,
        scale: 1,
        images: [
            // "assets/photoshop/banner1.jpg"
        ]
    },
    illustrator: {
        title: "Illustrator",
        text: "Векторные работы.",
        pixel: false,
        scale: 1,
        images: [
            // "assets/illustrator/logo1.png"
        ]
    }
};