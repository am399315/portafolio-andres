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
  'Ing. en Sistemas',
  'Full Stack Developer',
  'React & Node.js Dev',
  'Backend · APIs · REST',
  'AI Integration Dev',
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

// ── TERMINAL ANIMATION ──
function initTerminal() {
  const body = document.getElementById('t-body');
  if (!body) return;

  const sequence = [
    { type: 'cmd', text: 'cat profile.json' },
    { type: 'out', html: '<span class="t-out">{</span>' },
    { type: 'out', html: '  <span class="t-key">"name"</span><span class="t-out">:     </span><span class="t-str">"Andres Escolastico"</span><span class="t-out">,</span>' },
    { type: 'out', html: '  <span class="t-key">"role"</span><span class="t-out">:     </span><span class="t-str">"Ing. Sistemas · Full Stack Dev"</span><span class="t-out">,</span>' },
    { type: 'out', html: '  <span class="t-key">"location"</span><span class="t-out">:  </span><span class="t-str">"La Romana, República Dominicana 🇩🇴"</span><span class="t-out">,</span>' },
    { type: 'out', html: '  <span class="t-key">"stack"</span><span class="t-out">:    [</span><span class="t-str">"React"</span><span class="t-out">, </span><span class="t-str">"Node.js"</span><span class="t-out">, </span><span class="t-str">"Python"</span><span class="t-out">, </span><span class="t-str">"Electron"</span><span class="t-out">],</span>' },
    { type: 'out', html: '  <span class="t-key">"status"</span><span class="t-out">:   </span><span class="t-val">"open_to_work ✅"</span>' },
    { type: 'out', html: '<span class="t-out">}</span>' },
    { type: 'blank' },
    { type: 'cmd', text: 'git log --oneline -3' },
    { type: 'out', html: '<span class="t-hash">e055efa</span> <span class="t-out">fix: mobile responsiveness &amp; iOS fixes</span>' },
    { type: 'out', html: '<span class="t-hash">8b6f6be</span> <span class="t-out">feat: portfolio redesign con animaciones</span>' },
    { type: 'out', html: '<span class="t-hash">f5f2674</span> <span class="t-out">feat: servicios + WhatsApp flotante</span>' },
    { type: 'blank' },
    { type: 'cmd', text: 'echo $AVAILABILITY' },
    { type: 'out', html: '<span class="t-val">ready_to_build 🚀</span>' },
  ];

  let lineIndex = 0;

  function addLine(html) {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = html;
    body.appendChild(div);
  }

  function processNext() {
    if (lineIndex >= sequence.length) {
      addLine('<span class="t-prompt">❯</span> <span class="t-blink"></span>');
      // Loop after a pause
      setTimeout(() => {
        body.style.opacity = '0';
        setTimeout(() => {
          body.innerHTML = '';
          body.style.opacity = '1';
          lineIndex = 0;
          setTimeout(processNext, 600);
        }, 500);
      }, 7000);
      return;
    }

    const item = sequence[lineIndex++];

    if (item.type === 'blank') {
      addLine('&nbsp;');
      setTimeout(processNext, 60);
      return;
    }

    if (item.type === 'cmd') {
      const div = document.createElement('div');
      div.className = 't-line';
      div.innerHTML = '<span class="t-prompt">❯</span> <span class="t-cmd-text"></span><span class="t-caret">█</span>';
      body.appendChild(div);

      const textSpan = div.querySelector('.t-cmd-text');
      const caret    = div.querySelector('.t-caret');
      let ci = 0;

      function typeChar() {
        if (ci <= item.text.length) {
          textSpan.textContent = item.text.slice(0, ci++);
          setTimeout(typeChar, 52);
        } else {
          caret.remove();
          setTimeout(processNext, 320);
        }
      }
      setTimeout(typeChar, 180);
      return;
    }

    addLine(item.html);
    setTimeout(processNext, 85);
  }

  // Start when terminal is visible
  const termWin = document.querySelector('.terminal-window');
  if (!termWin) return;

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(processNext, 700);
      obs.disconnect();
    }
  }, { threshold: 0.25 });
  obs.observe(termWin);
}

initTerminal();

// ── INIT ──
loadAdminData();
