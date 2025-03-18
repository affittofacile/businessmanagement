// Gestione slideshow con testo che appare ogni 3 slide
let slides = document.querySelectorAll(".slide");
let introText = document.querySelector(".intro-text");
let slideIndex = 0;
let totalSlides = slides.length;

function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");

    // Mostra il testo introduttivo ogni 3 slide
    if (slideIndex % 3 === 0) {
        introText.style.display = "block";
    } else {
        introText.style.display = "none";
    }

    slideIndex = (slideIndex + 1) % totalSlides;
}

if (slides.length > 0) {
    slides[0].classList.add("active");
    setInterval(showSlides, 3000);
}

// Database delle unità abitative gestibili manualmente
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

// Funzione per calcolare il numero totale di ospiti settimanali
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

// Caricamento dati e aggiornamento
let rentalData = calculateRentals();

// Funzione per aggiornare i valori a schermo
function updateDisplay() {
    document.getElementById("total-rentals").textContent = rentalData.totalRentals;
    document.getElementById("weekly-tenants").textContent = rentalData.totalWeeklyTenants;
    document.getElementById("available-units").textContent = rentalUnits.length;
}

// Modifica dinamica dei valori
function updateManualValue(key, value) {
    if (key === "totalRentals") {
        rentalData.totalRentals = parseInt(value);
        rentalData.totalWeeklyTenants = Math.floor(rentalData.totalRentals / (4 * 12));
    } else if (key === "totalWeeklyTenants") {
        rentalData.totalWeeklyTenants = parseInt(value);
        rentalData.totalRentals = rentalData.totalWeeklyTenants * 4 * 12;
    }
    updateDisplay();
}

// Aggiunge eventi per la modifica manuale
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("total-rentals").addEventListener("input", (e) => updateManualValue("totalRentals", e.target.value));
    document.getElementById("weekly-tenants").addEventListener("input", (e) => updateManualValue("totalWeeklyTenants", e.target.value));
    updateDisplay();
});
