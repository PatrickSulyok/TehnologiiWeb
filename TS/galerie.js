"use strict";
const images = [
    "../MEDIA/g1.jpg",
    "../MEDIA/g2.jpg",
    "../MEDIA/g3.jpg",
    "../MEDIA/g4.jpg"
];
const mainImage = document.getElementById("carousel-image");
const imageCounter = document.getElementById("image-counter");
if (!mainImage || !imageCounter) {
    throw new Error("Elementele galeriei nu au fost găsite.");
}
let currentIndex = 0;
function showNextImage() {
    mainImage.classList.add("changing");
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];
        mainImage.alt = `Imaginea ${currentIndex + 1} din galerie`;
        imageCounter.textContent =
            `Imaginea ${currentIndex + 1} din ${images.length}`;
        mainImage.classList.remove("changing");
    }, 500);
}
setInterval(showNextImage, 3000);
