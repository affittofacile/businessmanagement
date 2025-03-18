// Gestione del messaggio iniziale
document.addEventListener("DOMContentLoaded", function () {
    const initialMessage = document.querySelector(".initial-message");
    const enterButton = document.querySelector(".enter-button");

    // Mostra il messaggio iniziale
    initialMessage.style.display = "flex";

    // Chiudi il messaggio quando si clicca sul pulsante "Entra" o su qualsiasi area
    initialMessage.addEventListener("click", () => {
        initialMessage.classList.add("fade-out");

        // Rimuovi il messaggio dal DOM dopo l'animazione
        initialMessage.addEventListener("transitionend", () => {
            initialMessage.style.display = "none";
        });
    });

    // Chiudi automaticamente il messaggio dopo 7 secondi
    setTimeout(() => {
        if (!initialMessage.classList.contains("fade-out")) {
            initialMessage.classList.add("fade-out");

            // Rimuovi il messaggio dal DOM dopo l'animazione
            initialMessage.addEventListener("transitionend", () => {
                initialMessage.style.display = "none";
            });
        }
    }, 15000); // 7 secondi
});

// Gestione dello slideshow
let slides = document.querySelectorAll(".slide");
let slideIndex = 0;
let totalSlides = slides.length;

function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");

    slideIndex = (slideIndex + 1) % totalSlides;
}

if (slides.length > 0) {
    slides[0].classList.add("active");
    setInterval(showSlides, 5000); // Cambia slide ogni 5 secondi
}

// Database e logica per i numeri statistici
let rentalUnits = [
    { name: "Casa Sole", zone: "Centro", type: "Trivano", season: "Alta stagione", baseWeeklyRent: 350 },
    { name: "Villa Mare", zone: "Lungomare", type: "Quadrivano", season: "Alta stagione", baseWeeklyRent: 500 },
    { name: "Attico Panorama", zone: "Centro", type: "Attico", season: "Normale", baseWeeklyRent: 400 },
    { name: "Casa Relax", zone: "Campagna", type: "Trivano", season: "Normale", baseWeeklyRent: 250 },
    { name: "Villetta Bianca", zone: "Lungomare", type: "Quadrivano", season: "Alta stagione", baseWeeklyRent: 550 },
    { name: "Casetta Blu", zone: "Campagna", type: "Bivano", season: "Normale", baseWeeklyRent: 220 },
    { name: "Dimora Elegante", zone: "Centro", type: "Quadrivano", season: "Alta stagione", baseWeeklyRent: 520 },
    { name: "Casa Bianca", zone: "Centro storico", type: "Bivano", season: "Alta stagione", baseWeeklyRent: 300 }
];

function calculateRentals() {
    let totalWeeklyTenants = 0;
    rentalUnits.forEach(unit => {
        let multiplier = unit.season === "Alta stagione" ? 1.3 : unit.season === "Bassa stagione" ? 0.8 : 1;
        let weeklyTenants = Math.floor((unit.baseWeeklyRent * multiplier) / 50);
        totalWeeklyTenants += weeklyTenants;
    });

    let totalRentals = totalWeeklyTenants * 4 * 12;
    return { totalWeeklyTenants, totalRentals };
}

let rentalData = calculateRentals();

function updateDisplay() {
    document.getElementById("total-rentals").textContent = rentalData.totalRentals;
    document.getElementById("weekly-tenants").textContent = rentalData.totalWeeklyTenants;
    document.getElementById("available-units").textContent = rentalUnits.length;
}

updateDisplay();
