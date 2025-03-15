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
    totalRentals: 1200, // Valore iniziale per gli affitti totali
    monthlyRentals: 45,  // Valore iniziale per gli affitti mensili
    weeklyTenants: 12    // Valore iniziale per gli affittuari settimanali
};

// Carica i dati salvati nel localStorage (se presenti)
if (localStorage.getItem("rentalData")) {
    rentalData = JSON.parse(localStorage.getItem("rentalData"));
} else {
    // Salva i dati iniziali nel localStorage
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
}

// Funzione per aggiornare i numeri in modo logico
function updateRentalData() {
    // Incrementa i valori in modo realistico
    rentalData.totalRentals += Math.floor(Math.random() * 10); // Incremento casuale tra 0 e 10
    rentalData.monthlyRentals += Math.floor(Math.random() * 3); // Incremento casuale tra 0 e 3
    rentalData.weeklyTenants += Math.floor(Math.random() * 2); // Incremento casuale tra 0 e 2

    // Salva i dati aggiornati nel localStorage
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
}

// Funzione per animare i numeri
function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
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
    animateValue("monthly-rentals", 0, rentalData.monthlyRentals, 2000);
    animateValue("weekly-tenants", 0, rentalData.weeklyTenants, 2000);
}

// Aggiorna i dati e la visualizzazione ogni 10 secondi
setInterval(() => {
    updateRentalData();
    updateDisplay();
}, 10000);

// Inizializza la visualizzazione al caricamento della pagina
document.addEventListener("DOMContentLoaded", function () {
    updateDisplay();
});
