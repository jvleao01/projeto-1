// ==========================================================================
// Loader
// ==========================================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('hidden');
  setTimeout(() => loader.remove(), 700);
});

// ==========================================================================
// Header scroll effect
// ==========================================================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

// ==========================================================================
// Mobile menu toggle
// ==========================================================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ==========================================================================
// Navegação suave com easing (scroll animado para as seções)
// ==========================================================================
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}

function smoothScrollTo(targetEl, duration = 700) {
  const headerHeight = header ? header.offsetHeight : 80;
  const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.length > 1) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        smoothScrollTo(targetElement, 700);
      }
    }
  });
});

// ==========================================================================
// Active link on scroll
// ==========================================================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
  });
});

// ==========================================================================
// Scroll reveal animations
// ==========================================================================
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ==========================================================================
// Back to top
// ==========================================================================
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================================
// Hero floating particles
// ==========================================================================
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 30;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const span = document.createElement('span');
  span.style.left = `${Math.random() * 100}%`;
  span.style.animationDuration = `${6 + Math.random() * 8}s`;
  span.style.animationDelay = `${Math.random() * 8}s`;
  span.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
  particlesContainer.appendChild(span);
}

// ==========================================================================
// Set current year in footer
// ==========================================================================
document.getElementById('year').textContent = new Date().getFullYear();
