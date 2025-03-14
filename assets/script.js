// Gestione slideshow
let slides = document.querySelectorAll(".slide");
let slideIndex = 0;

function showSlides() {
    slides.forEach(slide => slide.classList.remove("active")); // Nasconde tutte le immagini
    slides[slideIndex].classList.add("active"); // Mostra solo l'immagine attuale
    slideIndex = (slideIndex + 1) % slides.length; // Passa alla successiva
}

if (slides.length > 0) {
    slides[0].classList.add("active"); // Mostra la prima immagine all'avvio
    setInterval(showSlides, 3000); // Cambia immagine ogni 3 secondi
}







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

    // Simuliamo i dati dinamici
    let fakeData = {
        appointments: Math.floor(Math.random() * 1000 + 500),
        weeklyAppointments: Math.floor(Math.random() * 20 + 5),
        newRental: "Appartamento in centro"
    };

    // Avviamo le animazioni
    animateValue("appointments", 0, fakeData.appointments, 2000);
    animateValue("weekly-appointments", 0, fakeData.weeklyAppointments, 2000);
    document.getElementById("new-rental").textContent = fakeData.newRental;

    // Aggiorna i numeri ogni 10 secondi simulando cambiamenti
    setInterval(() => {
        fakeData.appointments += Math.floor(Math.random() * 10);
        fakeData.weeklyAppointments += Math.floor(Math.random() * 3);
        animateValue("appointments", parseInt(document.getElementById("appointments").textContent), fakeData.appointments, 1500);
        animateValue("weekly-appointments", parseInt(document.getElementById("weekly-appointments").textContent), fakeData.weeklyAppointments, 1500);
    }, 10000);
});
