// Gestione slideshow
let slides = document.querySelectorAll(".slide");
let slideIndex = 0;

function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");
    slideIndex = (slideIndex + 1) % slides.length;
}

if (slides.length > 0) {
    slides[0].classList.add("active");
    setInterval(showSlides, 3000);
}

// Database delle unità abitative gestibili manualmente
let rentalUnits = [
    { name: "Casa Sole", zone: "Centro", type: "Trivano", season: "Alta stagione", baseWeeklyRent: 350 },
    { name: "Villa Mare", zone: "Lungomare", type: "Quadrivano", season: "Alta stagione", baseWeeklyRent: 500 },
    { name: "Appartamento Verde", zone: "Collina", type: "Bivano", season: "Bassa stagione", baseWeeklyRent: 200 },
    { name: "Attico Panorama", zone: "Centro", type: "Attico", season: "Normale", baseWeeklyRent: 400 },
    { name: "Loft Urbano", zone: "Periferia", type: "Monolocale", season: "Bassa stagione", baseWeeklyRent: 180 },
    { name: "Casa Relax", zone: "Campagna", type: "Trivano", season: "Normale", baseWeeklyRent: 250 },
    { name: "Villetta Bianca", zone: "Lungomare", type: "Quadrivano", season: "Alta stagione", baseWeeklyRent: 550 },
    { name: "Residenza Gialla", zone: "Centro", type: "Trivano", season: "Normale", baseWeeklyRent: 320 },
    { name: "Casa del Porto", zone: "Porto", type: "Bivano", season: "Alta stagione", baseWeeklyRent: 280 },
    { name: "Mini Loft", zone: "Centro storico", type: "Monolocale", season: "Bassa stagione", baseWeeklyRent: 160 },
    { name: "Casetta Blu", zone: "Campagna", type: "Bivano", season: "Normale", baseWeeklyRent: 220 },
    { name: "Dimora Elegante", zone: "Centro", type: "Quadrivano", season: "Alta stagione", baseWeeklyRent: 520 },
    { name: "Villa delle Palme", zone: "Lungomare", type: "Trivano", season: "Normale", baseWeeklyRent: 400 },
    { name: "Appartamento Moderno", zone: "Periferia", type: "Trivano", season: "Bassa stagione", baseWeeklyRent: 280 },
    { name: "Casa Bianca", zone: "Centro storico", type: "Bivano", season: "Alta stagione", baseWeeklyRent: 300 }
];

// Funzione per calcolare il numero totale di ospiti settimanali
function calculateRentals() {
    let totalWeeklyTenants = 0;
    rentalUnits.forEach(unit => {
        let multiplier = unit.season === "Alta stagione" ? 1.3 : unit.season === "Bassa stagione" ? 0.8 : 1;
        let weeklyTenants = Math.floor((unit.baseWeeklyRent * multiplier) / 50); // Media persone per unità
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

// Aggiornamento HTML con titolo, descrizione e icone
document.addEventListener("DOMContentLoaded", function () {
    let statsBar = document.querySelector(".stats-bar p");
    statsBar.innerHTML = `
        <strong>Statistiche Affitti</strong><br>
        <small>Questi dati mostrano l'andamento degli affitti in base alle unità disponibili.</small>
        <br>
        <i class="fas fa-home"></i> Affitti totali annui: <span id="total-rentals">0</span> |
        <i class="fas fa-building"></i> Unità disponibili: <span id="available-units">0</span> |
        <i class="fas fa-users"></i> Media ospiti settimanali: <span id="weekly-tenants">0</span>
    `;
    updateDisplay();
});
