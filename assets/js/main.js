/* ══════════════════════════════════════════
   ANDRES ESCOLASTICO — PORTFOLIO SCRIPTS
   ══════════════════════════════════════════ */

// ── DEFAULT CERTIFICATES (shown before any admin edit) ──
const DEFAULT_CERTS = [
  {
    id: 'cert-ia',
    title: 'Iniciación al Desarrollo con IA',
    issuer: 'BIG School',
    date: 'Oct 2025',
    hours: '6',
    desc: 'Fundamentos de desarrollo de software usando inteligencia artificial como herramienta de apoyo al código.',
    image: 'assets/img/certificates/cert-ia.png'
  },
  {
    id: 'cert-marketing',
    title: 'Marketing Digital con IA: Estrategia y Visibilidad',
    issuer: 'BIG School · BIGSEO',
    date: 'Abr 2026',
    hours: '6',
    desc: 'Estrategias de marketing digital potenciadas con inteligencia artificial para maximizar visibilidad online.',
    image: 'assets/img/certificates/cert-marketing.png'
  },
  {
    id: 'cert-ciberseguridad',
    title: 'Ciberseguridad y Hacking Ético',
    issuer: 'BIG School',
    date: 'Abr 2026',
    hours: '6',
    desc: 'Principios de ciberseguridad, hacking ético, análisis de vulnerabilidades y protección de sistemas.',
    image: 'assets/img/certificates/cert-ciberseguridad.png'
  }
];

// ── LOAD ADMIN DATA & RENDER CERTS ──
function loadAdminData() {
  const saved = localStorage.getItem('am_admin_state');
  if (!saved) {
    renderCerts(DEFAULT_CERTS);
    return;
  }
  const state = JSON.parse(saved);

  // Profile photo
  if (state.photo) {
    const img = document.getElementById('profile-photo');
    if (img) img.src = state.photo;
  }

  // Project images (legacy key-value format)
  if (state.projects) {
    Object.keys(state.projects).forEach(key => {
      const el = document.querySelector(`[data-img="${key}"]`);
      if (el) el.src = state.projects[key];
    });
  }

  // Certificates (new certsList array format)
  const certs = (state.certsList && state.certsList.length > 0) ? state.certsList : DEFAULT_CERTS;
  renderCerts(certs);
}

function renderCerts(certs) {
  const container = document.getElementById('certs-container');
  if (!container) return;

  if (!certs || certs.length === 0) {
    container.innerHTML = `
      <div class="certs-empty">
        <div class="certs-empty-icon">📜</div>
        <p>Aún no hay certificados. Agrega algunos desde el <a href="admin.html" style="color:var(--cyan)">panel admin</a>.</p>
      </div>`;
    return;
  }

  container.innerHTML = certs.map(c => `
    <div class="cert-img-card reveal" onclick="openLightbox('${c.image.replace(/'/g,"\\'")}', '${c.title.replace(/'/g,"\\'")}')">
      <img src="${c.image}" alt="${c.title}" loading="lazy">
      <div class="cert-img-overlay">
        <div class="cert-overlay-icon">🔍</div>
        <div class="cert-overlay-text">Ver certificado</div>
      </div>
      <div class="cert-img-body">
        <div class="cert-img-issuer">${c.issuer || ''}</div>
        <div class="cert-img-name">${c.title}</div>
        <div class="cert-img-meta">
          ${c.date  ? `<span>📅 ${c.date}</span>`  : ''}
          ${c.hours ? `<span>⏱ ${c.hours} hrs</span>` : ''}
        </div>
        ${c.desc ? `<div class="cert-img-desc">${c.desc}</div>` : ''}
      </div>
    </div>
  `).join('');

  // Re-observe newly created .reveal elements
  container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── LIGHTBOX (generic) ──
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!lb || !img) return;
  img.src = src || '';
  if (cap) cap.textContent = caption || '';
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }, i * 65);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── ANIMATED COUNTERS ──
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const update = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (elapsed < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ── TYPING ANIMATION ──
const TYPED_STRINGS = [
  'Full Stack Developer',
  'React & Node.js',
  'API & Backend Dev',
  'AI Integration',
  'UI/UX Enthusiast',
  'Open to Work 🚀'
];
let typedIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('hero-typed');

function typeLoop() {
  if (!typedEl) return;
  const current = TYPED_STRINGS[typedIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
  }

  let delay = isDeleting ? 50 : 85;

  if (!isDeleting && charIndex > current.length) {
    delay = 2000; isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false; charIndex = 0;
    typedIndex = (typedIndex + 1) % TYPED_STRINGS.length;
    delay = 380;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ── CUSTOM CURSOR ──
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

  document.addEventListener('mousemove', e => {
    dotX = e.clientX; dotY = e.clientY;
    cursorDot.style.left  = dotX + 'px';
    cursorDot.style.top   = dotY + 'px';
  });

  // Ring lags slightly behind dot
  function animateRing() {
    ringX += (dotX - ringX) * 0.14;
    ringY += (dotY - ringY) * 0.14;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow cursor on interactive elements
  const hoverEls = 'a, button, .project-card, .cert-img-card, .carta-card, .filter-btn, .skill-tag, .social-link, .back-top';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('cursor-hover');
      cursorRing.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('cursor-hover');
      cursorRing.classList.remove('cursor-hover');
    });
  });
} else {
  if (cursorDot)  cursorDot.remove();
  if (cursorRing) cursorRing.remove();
}

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? scrolled / total : 0;
  progressBar.style.transform = `scaleX(${pct})`;
}, { passive: true });

// ── FILTER TABS ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card[data-cat]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}
// Close on outside click
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    closeMenu();
  }
});

// ── NAVBAR SCROLL + ACTIVE SECTION ──
const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateNav() {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 20);

  // Back to top button
  const bt = document.getElementById('back-top');
  if (bt) bt.classList.toggle('show', scrollY > 400);

  // Active section highlight
  let current = '';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── BACK TO TOP ──
const backTop = document.getElementById('back-top');
if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── INIT ──
loadAdminData();
