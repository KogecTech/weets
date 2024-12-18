const menuBars = document.getElementById('menu-bars');
const menuOverlay = document.getElementById('menu-overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

function toggleNav() {
  // Toggle: Menu Bars Open/Closed
  menuBars.classList.toggle('change');
  // Toggle: Menu Active
  menuOverlay.classList.toggle('menu-overlay-active');
  if (menuOverlay.classList.contains('menu-overlay-active')) {
    // Animate In - Overlay
    menuOverlay.classList.replace('menu-overlay-slide-left', 'menu-overlay-slide-right');
    // Animate In - Nav Items
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    menuOverlay.classList.replace('menu-overlay-slide-right', 'menu-overlay-slide-left');
    // Animate Out - Nav Items
    navAnimation('in', 'out');
  }
}

// Control Navigation Animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
}

menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});



document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".slide-in, .fade-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((element) => {
    element.style.animationPlayState = "paused"; // Initially pause animation
    observer.observe(element);
  });
});

function scrollGallery(direction) {
  const gallery = document.querySelector(".card");
  const scrollAmount = gallery.clientWidth; // Scroll by one gallery width
  gallery.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}
