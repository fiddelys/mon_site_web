document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    let currentIndex = 0;
    let autoSlideInterval;

    // Initialisation
    items[currentIndex].classList.add("visible");

    // Navigation
    const showSlide = (index) => {
        items[currentIndex].classList.remove("visible");
        currentIndex = (index + totalItems) % totalItems; // Boucle en cas de dépassement
        items[currentIndex].classList.add("visible");
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    // Boutons de navigation
    const createButtons = () => {
        const buttons = document.createElement("div");
        buttons.className = "carousel-buttons";

        const prevButton = document.createElement("button");
        prevButton.textContent = "<";
        prevButton.addEventListener("click", prevSlide);

        const nextButton = document.createElement("button");
        nextButton.textContent = ">";
        nextButton.addEventListener("click", nextSlide);

        buttons.appendChild(prevButton);
        buttons.appendChild(nextButton);
        carousel.appendChild(buttons);
    };

    // Auto-slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change toutes les 5 secondes
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Gestion des événements tactiles
    let startX = 0;

    carousel.addEventListener("touchstart", (e) => {
        stopAutoSlide();
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", (e) => {
        const deltaX = e.touches[0].clientX - startX;
        if (deltaX > 50) {
            prevSlide();
            startX = 0;
        } else if (deltaX < -50) {
            nextSlide();
            startX = 0;
        }
    });

    carousel.addEventListener("touchend", startAutoSlide);

    // Initialisation complète
    createButtons();
    startAutoSlide();
});
