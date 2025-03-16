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

// Database in memoria connesso con Odoo.
let rentalData = {
    totalRentals: 3888,   // Correzione del calcolo (9 × 4 × 9 × 12)
    availableUnits: 9,   // Valore fisso per le unità disponibili
    weeklyTenants: 9     // Valore aggiornato per gli affittuari settimanali
};

// Carica i dati salvati nel localStorage (se presenti)
if (localStorage.getItem("rentalData")) {
    rentalData = JSON.parse(localStorage.getItem("rentalData"));
} else {
    // Salva i dati iniziali nel localStorage
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
}

// Funzione per aggiornare i numeri in modo casuale
function updateRentalData() {
    // Simula un movimento casuale per gli affitti settimanali (tra 7 e 11)
    rentalData.weeklyTenants = Math.min(11, Math.max(7, rentalData.weeklyTenants + Math.floor(Math.random() * 3) - 1));

    // Calcola gli affitti totali annui in modo coerente
    rentalData.totalRentals = rentalData.weeklyTenants * 4 * rentalData.availableUnits * 12;

    // Salva i dati aggiornati nel localStorage
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
}

// Funzione per animare i numeri
function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    if (!obj) {
        console.error("Elemento non trovato:", id);
        return;
    }
    let range = end - start;
    let current = start;
    let increment = range / (duration / 10);
    let timer = setInterval(function () {
        current += increment;
        obj.textContent = Math.floor(current);
        if (current >= end) {
            obj.textContent = end;
            clearInterval(timer);
            obj.classList.add("highlight");
            setTimeout(() => obj.classList.remove("highlight"), 1500);
        }
    }, 10);
}

// Aggiorna i numeri visualizzati
function updateDisplay() {
    animateValue("total-rentals", 0, rentalData.totalRentals, 2000);

    // Aggiorna le unità disponibili (valore fisso)
    const availableUnitsElement = document.getElementById("available-units");
    if (availableUnitsElement) {
        availableUnitsElement.textContent = rentalData.availableUnits;
    } else {
        console.error("Elemento 'available-units' non trovato!");
    }

    animateValue("weekly-tenants", 0, rentalData.weeklyTenants, 2000);
}

// Aggiorna i dati e la visualizzazione ogni 1 minuto
setInterval(() => {
    updateRentalData();
    updateDisplay();
}, 60000); // 60.000 millisecondi = 1 minuto

// Inizializza la visualizzazione al caricamento della pagina
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente caricato");
    updateDisplay();
});

console.log("Script caricato correttamente!");
