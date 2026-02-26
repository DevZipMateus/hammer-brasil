/* ============================================================
   HAMMER BRASIL — SCRIPT.JS
   ============================================================ */

/* ── BARRA DE PROGRESSO ── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
}, { passive: true });

/* ── PARTÍCULAS HERO ── */
(function createParticles() {
  const hero   = document.querySelector('.hero');
  const colors = [
    'rgba(26,123,60,.4)',
    'rgba(245,166,35,.35)',
    'rgba(21,101,192,.3)',
    'rgba(110,232,154,.3)',
    'rgba(255,255,255,.15)',
  ];
  for (let i = 0; i < 20; i++) {
    const p    = document.createElement('div');
    const size = Math.random() * 7 + 3;
    p.className = 'hero-particle';
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-delay:${(Math.random() * 8).toFixed(2)}s`,
      `animation-duration:${(Math.random() * 7 + 6).toFixed(2)}s`,
    ].join(';');
    hero.appendChild(p);
  }
})();

/* ── HEADER SCROLL ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MENU MOBILE ── */
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navClose   = document.getElementById('navClose');

function openMenu() {
  navMenu.classList.add('open');
  navOverlay.classList.add('active');
  menuToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navOverlay.classList.remove('active');
  menuToggle.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () =>
  navMenu.classList.contains('open') ? closeMenu() : openMenu()
);
navClose.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);
navMenu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset - 70,
      behavior: 'smooth',
    });
  });
});

/* ── NAV LINK ATIVO ── */
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      allNavLinks.forEach(l => {
        if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── CONTADOR ANIMADO ── */
(function animateCounters() {
  const nums = document.querySelectorAll('.numero-val');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim();
      const match = raw.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
      if (!match) return;
      const [, prefix, numStr, suffix] = match;
      const target = parseInt(numStr, 10);
      let current  = 0;
      const step   = Math.ceil(target / 40);
      const tick = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = prefix + current + suffix;
        if (current >= target) clearInterval(tick);
      }, 28);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => counterObs.observe(n));
})();

/* ── LIGHTBOX (galeria) ── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxOverlay = document.getElementById('lightboxOverlay');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelector('.galeria-grid').addEventListener('click', e => {
  const item = e.target.closest('.gal-item');
  if (!item) return;
  const img = item.querySelector('img');
  if (img) openLightbox(img.src, img.alt);
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── RIPPLE NOS BOTÕES ── */
(function addRipple() {
  document.querySelectorAll('.btn-wpp, .btn-saiba, .btn-wpp-grande').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top  - size / 2}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
})();
