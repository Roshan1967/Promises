let slideIndex = 0;
let slides = document.getElementsByClassName("slides");
let slideshowInterval;
let isPlaying = true;

function showSlides(n) {
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
    clearInterval(slideshowInterval);
    showSlides(slideIndex + n);
}

function startSlideshow() {
    slideshowInterval = setInterval(function() {
        showSlides(slideIndex + 1);
    }, 3000); // Change image every 3 seconds
}

function toggleSlideshow() {
    if (isPlaying) {
        clearInterval(slideshowInterval);
        document.getElementById("toggleSlideshow").innerText = "Start Slideshow";
    } else {
        startSlideshow();
        document.getElementById("toggleSlideshow").innerText = "Stop Slideshow";
    }
    isPlaying = !isPlaying;
}

// Initialize slideshow
showSlides(slideIndex);
startSlideshow();
