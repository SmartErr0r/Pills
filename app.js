// =======================
// БАЗА ПРЕПАРАТОВ
// =======================

const medicines = [
{
    id:1,
    name:"Аспирин",
    form:"Таблетки",
    image:"images/aspirin.jpg",
    indications:"Боль, температура, воспаление",
    dosage:"1 таблетка",
    interval:"каждые 8 часов",
    food:"после еды",
    duration:"3–5 дней",
    description:"Препарат применяется для снижения температуры и уменьшения боли."
},
{
    id:2,
    name:"Нурофен",
    form:"Таблетки",
    image:"images/nurofen.png",
    indications:"Головная боль, жар",
    dosage:"1 таблетка",
    interval:"каждые 8 часов",
    food:"после еды",
    duration:"3–5 дней",
    description:"Нестероидное противовоспалительное средство."
},
{
    id:3,
    name:"Амоксициллин",
    form:"Капсулы",
    image:"images/amoxicillin.jpg",
    indications:"Бактериальные инфекции",
    dosage:"1 капсула",
    interval:"каждые 12 часов",
    food:"до еды",
    duration:"7 дней",
    description:"Антибиотик широкого спектра действия."
},
{
    id:4,
    name:"Лоратадин",
    form:"Таблетки",
    image:"images/loratadine.png",
    indications:"Аллергия",
    dosage:"1 таблетка",
    interval:"1 раз в день",
    food:"не важно",
    duration:"10 дней",
    description:"Антигистаминный препарат."
},
{
    id:5,
    name:"Омепразол",
    form:"Капсулы",
    image:"images/omeprazole.jpg",
    indications:"Изжога, гастрит",
    dosage:"1 капсула",
    interval:"1 раз в день",
    food:"до еды",
    duration:"14 дней",
    description:"Снижает кислотность желудка."
},
{
    id:6,
    name:"Ксилометазолин",
    form:"Спрей",
    image:"images/xylometazoline.jpg",
    indications:"Насморк",
    dosage:"1 впрыск",
    interval:"3 раза в день",
    food:"не важно",
    duration:"5 дней",
    description:"Сосудосуживающий назальный спрей."
},
{
    id:7,
    name:"Аквамарис",
    form:"Спрей",
    image:"images/aquamaris.jpg",
    indications:"Промывание носа",
    dosage:"2 впрыска",
    interval:"4 раза в день",
    food:"не важно",
    duration:"по необходимости",
    description:"Раствор морской воды."
},
{
    id:8,
    name:"Диклофенак",
    form:"Гель",
    image:"images/diclofenac-gel.png",
    indications:"Боль в мышцах и суставах",
    dosage:"тонкий слой",
    interval:"2 раза в день",
    food:"наружное применение",
    duration:"7–10 дней",
    description:"Противовоспалительный гель."
},
{
    id:9,
    name:"Парацетамол",
    form:"Таблетки",
    image:"images/paracetamol.jpg",
    indications:"Температура, боль",
    dosage:"1 таблетка",
    interval:"каждые 6 часов",
    food:"после еды",
    duration:"3–5 дней",
    description:"Жаропонижающее средство."
},
{
    id:10,
    name:"Цефтриаксон",
    form:"Инъекции",
    image:"images/ceftriaxone.jpg",
    indications:"Тяжёлые инфекции",
    dosage:"1 ампула",
    interval:"1 раз в день",
    food:"не важно",
    duration:"7–14 дней",
    description:"Антибиотик для внутримышечного введения."
}
];

// =======================
// ЭЛЕМЕНТЫ
// =======================

const medicinesGrid = document.getElementById("medicinesGrid");
const medicineCount = document.getElementById("medicineCount");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("medicineModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let currentForm = "";
let favoritesMode = false;

// =======================
// ИЗБРАННОЕ
// =======================

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function toggleFavorite(id) {

    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    applyFilters();
}

// =======================
// КАРТОЧКИ
// =======================

function renderMedicines(data) {

    medicineCount.textContent =
        `Всего препаратов: ${data.length}`;

    if (!data.length) {

        medicinesGrid.innerHTML = `
        <div class="empty-state">
            Ничего не найдено
        </div>
        `;

        return;
    }

    medicinesGrid.innerHTML = "";

    data.forEach(medicine => {

        medicinesGrid.innerHTML += `
        <div
            class="medicine-card"
            onclick="openMedicine(${medicine.id})"
        >

            <img
                src="${medicine.image}"
                alt="${medicine.name}"
                class="medicine-image"
            >

            <div class="card-content">

                <h3 class="card-title">
                    ${medicine.name}
                </h3>

                <span class="card-form form-${medicine.form}">
                    ${medicine.form}
                </span>

                <div class="medicine-info">

                    <div class="info-row">
                        💊 ${medicine.dosage}
                    </div>

                    <div class="info-row">
                        ⏰ ${medicine.interval}
                    </div>

                    <div class="info-row">
                        🍽 ${medicine.food}
                    </div>

                    <div class="info-row">
                        📅 ${medicine.duration}
                    </div>

                </div>

                <button
                    class="favorite-btn"
                    onclick="
                    event.stopPropagation();
                    toggleFavorite(${medicine.id});
                    "
                >
                    ${isFavorite(medicine.id)
                        ? "★ В избранном"
                        : "☆ В избранное"}
                </button>

            </div>

        </div>
        `;
    });
}

// =======================
// МОДАЛЬНОЕ ОКНО
// =======================

function openMedicine(id) {

    const medicine =
        medicines.find(item => item.id === id);

    if (!medicine) return;

    modalBody.innerHTML = `
    <h2 class="modal-title">
        ${medicine.name}
    </h2>

    <div class="modal-form">
        ${medicine.form}
    </div>

    <img
        src="${medicine.image}"
        class="modal-image"
    >

    <div class="medicine-details">

        <div class="detail-item">
            <span>💊 Дозировка</span>
            ${medicine.dosage}
        </div>

        <div class="detail-item">
            <span>⏰ Интервал</span>
            ${medicine.interval}
        </div>

        <div class="detail-item">
            <span>🍽 Приём</span>
            ${medicine.food}
        </div>

        <div class="detail-item">
            <span>📅 Курс</span>
            ${medicine.duration}
        </div>

    </div>

    <div class="modal-section">
        <h3>Показания</h3>
        <p>${medicine.indications}</p>
    </div>

    <div class="modal-section">
        <h3>Описание</h3>
        <p>${medicine.description}</p>
    </div>
    `;

    modal.classList.add("active");
}

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

document
.querySelector(".modal-overlay")
.addEventListener("click", () => {
    modal.classList.remove("active");
});

// =======================
// ПОИСК
// =======================

searchInput.addEventListener(
    "input",
    applyFilters
);

// =======================
// ФИЛЬТРЫ
// =======================

document
.querySelectorAll(".filter-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        document
        .querySelectorAll(".filter-btn")
        .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentForm =
            button.dataset.form;

        applyFilters();
    });
});

// =======================
// ВКЛАДКИ
// =======================

document
.getElementById("allTab")
.addEventListener("click", () => {

    favoritesMode = false;

    document
    .getElementById("allTab")
    .classList.add("active");

    document
    .getElementById("favoriteTab")
    .classList.remove("active");

    applyFilters();
});

document
.getElementById("favoriteTab")
.addEventListener("click", () => {

    favoritesMode = true;

    document
    .getElementById("favoriteTab")
    .classList.add("active");

    document
    .getElementById("allTab")
    .classList.remove("active");

    applyFilters();
});

// =======================
// ОБЩАЯ ФИЛЬТРАЦИЯ
// =======================

function applyFilters() {

    const search =
        searchInput.value.toLowerCase();

    let result =
        medicines.filter(medicine => {

            const searchMatch =
                medicine.name
                .toLowerCase()
                .includes(search)

                ||

                medicine.indications
                .toLowerCase()
                .includes(search);

            const formMatch =
                currentForm === ""
                ||
                medicine.form === currentForm;

            return searchMatch && formMatch;
        });

    if (favoritesMode) {

        result = result.filter(
            medicine =>
            isFavorite(medicine.id)
        );
    }

    renderMedicines(result);
}

// =======================
// КНОПКА ВХОДА
// =======================

document
.querySelector(".login-btn")
.addEventListener("click", () => {

    alert(
        "Авторизация будет добавлена позже."
    );
});

// =======================
// отображение всех препаратов при загрузке страницы
// =======================

renderMedicines(medicines);