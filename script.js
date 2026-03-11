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
      // propaga "visible" ao section-header pai para o underline animado
      const header = entry.target.closest('.section-header');
      if (header) header.classList.add('visible');
      const sobreTexto = entry.target.closest('.sobre-texto');
      if (sobreTexto) sobreTexto.classList.add('visible');
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

/* ── TYPED TEXT NO HERO ── */
(function typedText() {
  const words   = ['condomínios', 'empresas', 'escolas', 'clínicas', 'igrejas', 'academias'];
  const target  = document.querySelector('.hero-sub');
  if (!target) return;

  // insere o span dinamicamente no texto
  target.innerHTML = target.innerHTML.replace(
    'condomínios',
    '<span class="typed-word">condomínios</span><span class="typed-cursor">|</span>'
  );

  const wordEl   = target.querySelector('.typed-word');
  const cursorEl = target.querySelector('.typed-cursor');
  if (!wordEl || !cursorEl) return;

  let idx = 0, charIdx = 0, deleting = false;

  function type() {
    const word    = words[idx % words.length];
    const display = deleting ? word.slice(0, charIdx--) : word.slice(0, charIdx++);
    wordEl.textContent = display;

    if (!deleting && charIdx > word.length) {
      deleting = true;
      setTimeout(type, 1600);
    } else if (deleting && charIdx < 0) {
      deleting = false;
      idx++;
      setTimeout(type, 300);
    } else {
      setTimeout(type, deleting ? 55 : 85);
    }
  }
  setTimeout(type, 1200);
})();

/* ── PARALLAX DE MOUSE NO HERO ── */
(function heroMouseParallax() {
  const hero    = document.querySelector('.hero');
  const mascote = document.querySelector('.hero-mascote img');
  const overlay = document.querySelector('.hero-overlay');
  if (!hero || !mascote) return;

  hero.addEventListener('mousemove', e => {
    const { left, top, width, height } = hero.getBoundingClientRect();
    const cx = (e.clientX - left) / width  - 0.5;
    const cy = (e.clientY - top)  / height - 0.5;
    mascote.style.transform = `translateY(${cy * -18}px) translateX(${cx * 12}px)`;
    if (overlay) overlay.style.transform = `translateX(${cx * 8}px) translateY(${cy * 8}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    mascote.style.transform = '';
    if (overlay) overlay.style.transform = '';
  });
})();

/* ── REVEAL ESCALONADO NOS GRIDS ── */
(function staggerReveal() {
  const grids = document.querySelectorAll(
    '.produtos-grid, .mercado-grid, .mvv-grid, .numeros-grid, .galeria-grid, .dep-grid'
  );
  grids.forEach(grid => {
    const children = grid.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });
})();

/* ── TILT 3D NOS CARDS ── */
(function cardTilt() {
  const cards = document.querySelectorAll('.produto-card, .mercado-card, .dep-card, .mvv-card');
  const MAX   = 10;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * MAX}deg) rotateX(${-y * MAX}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

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
