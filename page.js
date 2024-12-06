document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("youtubeVideo");
    const overlay = document.getElementById("overlay");
  
    iframe.addEventListener("load", function () {
        // Fade out the overlay when the video is ready
        overlay.style.opacity = "0";
      // Remove the overlay from the DOM after the transition
        setTimeout(() => {
        overlay.style.display = "none";
        }, 5000); // Matches the CSS transition duration
    });
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
  const gallery = document.querySelector('.card');
  const scrollAmount = gallery.clientWidth; // Scroll by one gallery width
  gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}