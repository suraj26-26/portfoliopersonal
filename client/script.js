function changeAboutMeText() {
    const aboutMeText = ["Tech Enthusiast","Artificial Engineer", "Data Scientist", "Full Stack Web Developer"];
    const typingSpeed = 100;
    const eraseSpeed = 50;
    const pauseTime = 1500;
    const aboutMeElement = document.querySelector(".autotyping");  // Select a single element, not a list
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = aboutMeText[textIndex];
        if (!isDeleting && charIndex < currentText.length) {
            aboutMeElement.textContent += currentText[charIndex];
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, eraseSpeed);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex = (textIndex + 1) % aboutMeText.length;
            }
            setTimeout(type, pauseTime);
        }
    }

    type();
}

//dark mode toggle
document.addEventListener('DOMContentLoaded', function (){
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentMode = body.classList.contains('dark-mode') ? 'Dark' : 'Light';
        darkModeToggle.querySelector('i').classList.toggle('fa-sun');
        darkModeToggle.querySelector('i').classList.toggle('fa-moon');
        darkModeToggle.querySelector('i').classList.toggle('ligth-mode');
    });

});

changeAboutMeText();

//progress bar start
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const progressBar = entry.target.querySelector('.progress-bar');
            const progressText = progressBar.querySelector('.progress-text');
                const progress = parseInt(progressBar.dataset.progress);  // Get progress from data attribute
            if (entry.isIntersecting) {
                // Set the CSS custom property for the progress bar width
                progressBar.style.setProperty('--progress', `${progress}%`);

                // Add animation class to start the progress bar animation
                progressBar.classList.add('animated');

                // Stop observing the element after the animation is triggered
                observer.observe(entry.target);

                // Animate percentage text
                let current = 0;
        const interval = setInterval(() => {
          if (current >= progress) {
            clearInterval(interval);
          } else {
            current++;
            progressText.textContent = `${current}%`;
          }
        }, 15); // adjust speed as needed
            } else {
                progressBar.classList.remove('animated');
                progressBar.style.setProperty('--progress',`0%`);
                progressText.textContent = '0%';
            }
        });
    }, {
        threshold: 0.4
    });

    // Observe all elements with the `#programming-languages .skill` selector
    const programmingLanguages = document.querySelectorAll('#programming-languages .skill');
    programmingLanguages.forEach(skill => {
        observer.observe(skill);
    });
});
//navigation starting

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});

// carousel image sliding

document.addEventListener("DOMContentLoaded", function () {
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
    }

    function initializeCarousel(carouselContainer) {
        let slideIndex = 1;
        const slides = carouselContainer.querySelectorAll(".carousel-slide img");

        function showSlides(n) {
            if (n > slides.length) slideIndex = 1;
            if (n < 1) slideIndex = slides.length;

            slides.forEach(slide => slide.style.display = "none");
            slides[slideIndex - 1].style.display = "block";
        }

        showSlides(slideIndex);

        carouselContainer.querySelector('.prev').addEventListener('click', () => showSlides(--slideIndex));
        carouselContainer.querySelector('.next').addEventListener('click', () => showSlides(++slideIndex));
    }

// popup open for project
    document.querySelectorAll('.btn.know-more').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.querySelector(`#${modalId}`);
            if (modal) {
                modal.style.display = "block";
                disableScroll();

                const carouselContainer = modal.querySelector('.carousel-container');
                if (carouselContainer) {
                    initializeCarousel(carouselContainer);
                }
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = "none";
            });
            enableScroll();
        }
    });
});


//scrolling
document.addEventListener("DOMContentLoaded", () => {
    const elementsToAnimate = document.querySelectorAll("section, header, nav, .project-thumbnail, .skill, .animate, footer");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                // Reset when scrolling back up
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.2 // 20% of the element must be visible
    });

    elementsToAnimate.forEach(el => observer.observe(el));
});

