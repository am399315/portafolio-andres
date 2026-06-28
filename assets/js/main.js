/* ══════════════════════════════════════════
   ANDRES ESCOLASTICO — PORTFOLIO SCRIPTS
   ══════════════════════════════════════════ */

// ── DEFAULT PROJECTS (shown before any admin edit) ──
const DEFAULT_PROJECTS = [
  { id:'proj-boutique',          title:'Super Boutique El-Elyon',            desc:'Sitio web profesional para boutique de moda. Diseño moderno, responsive y optimizado para SEO. Indexado en Google Search Console.',                             tags:['HTML5','CSS3','JavaScript'],          cat:'frontend', pill:'E-commerce',   live:'https://el-elyon-boutique.vercel.app/',        github:'https://github.com/am399315/megaboutique',         image:'assets/img/projects/boutique.png' },
  { id:'proj-honda',             title:'Honda Civic 2013 EXL',               desc:'Sitio web moderno y elegante dedicado a un Honda Civic 2013 EXL gris plateado. Galería visual y especificaciones técnicas.',                                   tags:['HTML5','CSS3','JavaScript'],          cat:'frontend', pill:'Landing Page', live:'https://honda-civic-2013-web.vercel.app/',      github:'https://github.com/am399315/honda-civic-2013-web', image:'assets/img/projects/honda.png' },
  { id:'proj-hotel',             title:'Hotel Esco Brea — Punta Cana',       desc:'Página web completa para hotel en Punta Cana, RD. Sin frameworks externos, siguiendo buenas prácticas de frontend puro.',                                      tags:['HTML5','CSS3','JavaScript'],          cat:'frontend', pill:'Hospitality',  live:'https://hotel-esco-brea.vercel.app/',           github:'https://github.com/am399315/hotel-esco-brea',      image:'assets/img/projects/hotel.png' },
  { id:'proj-policial',          title:'Sistema de Gestión Policial — RD',   desc:'App de escritorio con Electron.js para la Policía Nacional RD. Gestión de casos, detenidos, patrullas, incidentes y estadísticas avanzadas.',                  tags:['Electron.js','JavaScript','CSS3'],    cat:'system',   pill:'Desktop App', live:'',                                              github:'https://github.com/am399315/sistema-policial-rd',  image:'assets/img/projects/policial.png' },
  { id:'proj-historias-ia',      title:'Generador de Historias con IA',      desc:'Combina LLM, DALL·E 3 y síntesis de voz para crear historias ilustradas narradas con música de fondo sincronizada.',                                           tags:['OpenAI','DALL·E 3','TTS'],            cat:'ai',       pill:'IA Generativa',live:'',                                              github:'https://github.com/am399315/Proyecto-Final-IA',    image:'assets/img/projects/historias-ia.png' },
  { id:'proj-tablero',           title:'Tablero de Anuncios — O&M',          desc:'Aplicación React para la comunidad universitaria de O&M. Anuncios digitales en tiempo real para estudiantes y docentes.',                                       tags:['React','JavaScript'],                 cat:'frontend', pill:'Dashboard',    live:'https://tablero-anuncios-oym.vercel.app/',      github:'https://github.com/am399315/tablero_anuncios_oym', image:'assets/img/projects/tablero.png' },
  { id:'proj-task-api',          title:'Task Manager API — REST',             desc:'API RESTful para gestión de tareas con CRUD completo. Construida con Node.js y Express siguiendo principios RESTful.',                                          tags:['Node.js','Express','REST API'],       cat:'backend',  pill:'Backend',      live:'https://task-api-woad.vercel.app/',             github:'https://github.com/am399315/task-api',             image:'assets/img/projects/task-api.png' },
  { id:'proj-urban',             title:'Urban Collection — Juego 2D',        desc:'Juego de laberinto 2D con Pygame. Recolecta monedas, evita enemigos inteligentes y supera rondas con dificultad progresiva.',                                   tags:['Python','Pygame'],                    cat:'game',     pill:'Videojuego',   live:'',                                              github:'https://github.com/am399315/Urban_Collection',     image:'assets/img/projects/urban.png' },
  { id:'proj-prank',             title:'Prank Web Suite',                     desc:'Colección de apps interactivas: terminal hacker, pantalla rota, broma WhatsApp y juego imposible. Cada una deployada en Vercel.',                              tags:['HTML5','CSS3','JavaScript'],          cat:'frontend', pill:'Creative',     live:'https://hacker-simulator-eight.vercel.app/',    github:'',                                                 image:'assets/img/projects/prank.png' },
  { id:'proj-portafolio-reimin', title:'Portafolio — Reimin de los Santos',  desc:'Portafolio web personal desarrollado para la asignatura de Fundamentos de Seguridad Informática en la Universidad O&M.',                                      tags:['HTML5','CSS3','JavaScript'],          cat:'frontend', pill:'Portafolio',   live:'https://portafolio-digital-flame.vercel.app/',  github:'https://github.com/am399315/portafolio-digital',   image:'assets/img/projects/portafolio-reimin.png' },
  { id:'proj-regalo',            title:'Regalo Sorpresa',                     desc:'Experiencia web interactiva y creativa con animaciones JavaScript. Proyecto visual deployado en Vercel.',                                                       tags:['HTML5','CSS3','JavaScript'],          cat:'frontend', pill:'Creative',     live:'https://regalo-sorpresa-five.vercel.app/',      github:'',                                                 image:'assets/img/projects/regalo.png' },
];

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

// ── LOAD ADMIN DATA & RENDER ──
function loadAdminData() {
  const saved = localStorage.getItem('am_admin_state');
  if (!saved) {
    renderProjects(DEFAULT_PROJECTS);
    renderCerts(DEFAULT_CERTS);
    return;
  }
  const state = JSON.parse(saved);

  // Profile photo
  if (state.photo) {
    const img = document.getElementById('profile-photo');
    if (img) img.src = state.photo;
  }

  // CV button — use uploaded PDF from admin if available
  if (state.cv && state.cv.data) {
    const btn = document.querySelector('.btn-cv');
    if (btn) {
      btn.href = state.cv.data;
      btn.download = state.cv.filename || 'CV-Andres-Escolastico.pdf';
    }
  }

  // Projects — new projectsList format with fallback + migration from old image-map format
  let projects;
  if (state.projectsList && state.projectsList.length > 0) {
    projects = state.projectsList;
  } else {
    projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    if (state.projects) {
      projects.forEach(p => {
        const key = p.id.replace('proj-', '');
        if (state.projects[key]) p.image = state.projects[key];
      });
    }
  }
  renderProjects(projects);

  // Certificates
  const certs = (state.certsList && state.certsList.length > 0) ? state.certsList : DEFAULT_CERTS;
  renderCerts(certs);
}

// ── RENDER PROJECTS ──
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => {
    const tags = Array.isArray(p.tags) ? p.tags : String(p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    const tagsHtml = tags.map(t => `<span class="project-tag">${t}</span>`).join('');

    // Status badge — derived from live/github or explicit p.status
    const status = p.status || (p.live ? 'En producción' : (p.github ? 'Disponible' : 'Demo'));
    const statusClass = p.live ? 'status-prod' : (p.github ? 'status-demo' : 'status-dev');

    return `
      <div class="project-card" data-cat="${p.cat || 'frontend'}">
        <div class="project-banner">
          <img src="${p.image || ''}" alt="${p.title}" loading="lazy">
          <div class="project-banner-overlay"></div>
          ${p.live ? '<span class="live-badge">● En vivo</span>' : ''}
          <span class="cat-pill">${p.pill || ''}</span>
        </div>
        <div class="project-body">
          <div class="project-meta-row">
            <div class="project-tags">${tagsHtml}</div>
            <span class="project-status ${statusClass}">${status}</span>
          </div>
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.desc || ''}</div>
          <div class="project-footer">
            ${p.live   ? `<a href="${p.live}"   target="_blank" rel="noopener" class="project-link">🌐 Ver demo →</a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="project-link gh">Ver código</a>`  : ''}
          </div>
        </div>
      </div>`;
  }).join('');

  // Cursor hover for new cards
  const cd = document.getElementById('cursor-dot');
  const cr = document.getElementById('cursor-ring');
  if (cd && cr) {
    grid.querySelectorAll('.project-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cd.classList.add('cursor-hover'); cr.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', () => { cd.classList.remove('cursor-hover'); cr.classList.remove('cursor-hover'); });
    });
  }
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
  // Fallback: show final value immediately so it never stays at 0
  el.textContent = target + suffix;
  const duration = 1400;
  const start = performance.now();
  const update = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (elapsed < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix; // ensure exact final value
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
  'Soluciones Web a Medida',
  'React & Node.js Dev',
  'APIs · IA · Automatización',
  'Ing. en Sistemas',
  '¿Tienes un proyecto? 🚀'
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

// ── FILTER TABS (event delegation — funciona con proyectos dinámicos) ──
document.querySelector('.filter-tabs')?.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  document.querySelectorAll('.project-card[data-cat]').forEach(card => {
    card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
  });
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const navBackdrop = document.getElementById('nav-backdrop');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
  navBackdrop.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

navBackdrop.addEventListener('click', closeMenu);

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
    body.scrollTop = body.scrollHeight;
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
      body.scrollTop = body.scrollHeight;

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
