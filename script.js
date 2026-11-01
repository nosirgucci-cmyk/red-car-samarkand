
// RED CAR interaktiv JavaScript

// Mobil menyu
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");

    menuToggle.textContent =
        nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});

// Avtomobillarni qidirish
const grid = document.getElementById("carGrid");
const search = document.getElementById("searchInput");
const type = document.getElementById("typeFilter");
const sort = document.getElementById("sortFilter");

function filterCars() {
    const query = search.value.trim().toLowerCase();
    const selectedType = type.value;

    const cards = [...grid.querySelectorAll(".car")];

    cards.forEach(card => {
        const nameMatches =
            card.dataset.name.includes(query);

        const typeMatches =
            selectedType === "all" ||
            card.dataset.type === selectedType;

        card.hidden = !(nameMatches && typeMatches);
    });

    let visible = cards.filter(card => !card.hidden);

    // Narx bo‘yicha saralash
    if (sort.value === "low") {
        visible.sort((a, b) =>
            Number(a.dataset.price) - Number(b.dataset.price)
        );
    }

    if (sort.value === "high") {
        visible.sort((a, b) =>
            Number(b.dataset.price) - Number(a.dataset.price)
        );
    }

    visible.forEach(card => grid.appendChild(card));

    document.getElementById("noResults").hidden =
        visible.length > 0;
}

document.getElementById("searchButton")
    .addEventListener("click", filterCars);

search.addEventListener("input", filterCars);
type.addEventListener("change", filterCars);
sort.addEventListener("change", filterCars);

search.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        filterCars();
    }
});

// Avtomobil kartasidan bron formasiga o‘tish
const bookingCar = document.getElementById("bookingCar");

document.querySelectorAll(".car-book").forEach(button => {
    button.addEventListener("click", () => {
        bookingCar.value = button.dataset.car;

        document.getElementById("booking")
            .scrollIntoView({ behavior: "smooth" });
    });
});

// Bugungi kundan oldingi sanani tanlashni cheklash
const dateInput = document.getElementById("bookingDate");

const now = new Date();

const today = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
).toISOString().slice(0, 10);

dateInput.min = today;

// Bron formasini tekshirish
document.getElementById("bookingForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const form = event.currentTarget;

        if (!form.reportValidity()) {
            return;
        }

        const data = new FormData(form);

        const name = data.get("name").trim();
        const car = data.get("car");
        const date = data.get("date");
        const days = data.get("days");

        document.getElementById("formMessage").textContent =
            `Rahmat, ${name}! ${car} uchun ${date} sanasiga ${days} kunlik so‘rovingiz qabul qilindi. Operator siz bilan bog‘lanadi.`;

        form.reset();
        dateInput.min = today;
    });

// Sahifa bo‘limiga qarab menyuni belgilash
const pageSections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
    let current = "home";

    pageSections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 130) {
            current = section.id;
        }
    });

    nav.querySelectorAll("a").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
});
