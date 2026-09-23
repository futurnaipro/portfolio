document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  // Nav scroll
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );

  // Active nav link
  const navLinks = document.querySelectorAll('.nav__links a');
  document.querySelectorAll('section[id]').forEach(s => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
          navLinks.forEach(link =>
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)
          );
      });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }).observe(s);
  });

  // Reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 55);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    })
  );

  // Start auto-play for sliders
  startAutoPlay('slider-dourouss', 10);
  startAutoPlay('slider-herfty', 6);

  // Keyboard for lightbox
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });

  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  const contactSubmit = document.getElementById('contactSubmit');

  contactForm?.addEventListener('submit', async function (e) {
    e.preventDefault();
    contactSubmit.disabled = true;
    contactSubmit.textContent = 'Sending...';
    contactStatus.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactStatus.style.color = 'green';
        contactStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        contactForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      contactStatus.style.color = 'red';
      contactStatus.textContent = "Something went wrong. Please email me directly instead.";
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.textContent = 'Send message';
    }
  });
});
const _autoTimers = {};

function _setSlide(id, index) {
  const slider = document.getElementById(id);
  if (!slider) return;
  const slides = slider.querySelector('.screenshot-slides');
  const imgs = slides.querySelectorAll('img');
  const total = imgs.length;
  index = ((index % total) + total) % total;
  slider.dataset.current = index;
  slides.style.transform = `translateX(-${index * 100}%)`;
  slider.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === index));
  const counter = document.getElementById('counter-' + id);
  if (counter) counter.textContent = (index + 1) + ' / ' + total;
}

function slide(id, dir) {
  const slider = document.getElementById(id);
  const current = parseInt(slider.dataset.current || 0);
  _setSlide(id, current + dir);
}

function slideTo(id, index) {
  _setSlide(id, index);
}

function slideManual(id, dir) {
  if (_autoTimers[id]) {
    clearInterval(_autoTimers[id]);
    _autoTimers[id] = null;
    setTimeout(() => startAutoPlay(id), 6000);
  }
  slide(id, dir);
}

function startAutoPlay(id) {
  const slider = document.getElementById(id);
  if (!slider) return;
  _autoTimers[id] = setInterval(() => slide(id, 1), 3000);
  slider.addEventListener('mouseenter', () => {
    clearInterval(_autoTimers[id]);
    _autoTimers[id] = null;
  });
  slider.addEventListener('mouseleave', () => {
    if (!_autoTimers[id]) _autoTimers[id] = setInterval(() => slide(id, 1), 3000);
  });
}
let _lbImages = [];
let _lbCurrent = 0;

function openLightbox(sliderId, index) {
  const slider = document.getElementById(sliderId);
  _lbImages = Array.from(slider.querySelectorAll('.screenshot-slides img'))
    .map(img => ({ src: img.src, alt: img.alt }));
  _lbCurrent = index;
  _updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  _lbCurrent = ((_lbCurrent + dir) + _lbImages.length) % _lbImages.length;
  _updateLightbox();
}

function _updateLightbox() {
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  img.src = _lbImages[_lbCurrent].src;
  img.alt = _lbImages[_lbCurrent].alt;
  counter.textContent = (_lbCurrent + 1) + ' / ' + _lbImages.length;
}
function toggleGhDropdown(btn) {
  const dropdown = btn.closest('.gh-dropdown');
  const isOpen = dropdown.classList.contains('open');
  document.querySelectorAll('.gh-dropdown.open').forEach(d => d.classList.remove('open'));
  if (!isOpen) dropdown.classList.add('open');
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.gh-dropdown')) {
    document.querySelectorAll('.gh-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});