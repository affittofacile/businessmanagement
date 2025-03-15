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

// Animazione numeri dinamici
document.addEventListener("DOMContentLoaded", function () {
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

    // Simulazione dati dinamici (OdooDBlink)
    let OdooDBlink = {
        appointments: Math.floor(Math.random() * 1000 + 500),
        weeklyAppointments: Math.floor(Math.random() * 20 + 5),
        newRental: "Appartamento in centro"
    };

    // Avvio animazioni
    animateValue("appointments", 0, OdooDBlink.appointments, 2000);
    animateValue("weekly-appointments", 0, OdooDBlink.weeklyAppointments, 2000);
    document.getElementById("new-rental").textContent = OdooDBlink.newRental;

    // Aggiorna i numeri ogni 10 secondi
    setInterval(() => {
        OdooDBlink.appointments += Math.floor(Math.random() * 10);
        OdooDBlink.weeklyAppointments += Math.floor(Math.random() * 3);
        animateValue("appointments", parseInt(document.getElementById("appointments").textContent), OdooDBlink.appointments, 1500);
        animateValue("weekly-appointments", parseInt(document.getElementById("weekly-appointments").textContent), OdooDBlink.weeklyAppointments, 1500);
    }, 10000);
});
