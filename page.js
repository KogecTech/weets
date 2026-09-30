document.documentElement.classList.add('js');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('site-nav');
function setMenu(open) {
  menuBtn.setAttribute('aria-expanded', open);
  nav.classList.toggle('open', open);
}
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Gallery arrows
const track = document.getElementById('track');
const scrollGallery = dir => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
document.getElementById('prev').addEventListener('click', () => scrollGallery(-1));
document.getElementById('next').addEventListener('click', () => scrollGallery(1));

// Reveal on scroll
const revealEls = document.querySelectorAll('.wrap > h2, .topics li, .cols p, form');
revealEls.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Respect reduced motion for the hero video
const video = document.getElementById('video-bg');
if (reduce && video) video.removeAttribute('autoplay'), video.pause();

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.disabled = true;
  status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = 'Message sent. We will reply within 24 hours.';
  } catch {
    status.textContent = 'Message not sent. Check your connection and try again.';
  } finally {
    btn.disabled = false;
  }
});
