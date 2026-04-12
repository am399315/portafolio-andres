// ── LIGHTBOX ──
function openLightbox() {
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── LOAD FROM ADMIN ──
function loadAdminData() {
  const saved = localStorage.getItem('am_admin_state');
  if (!saved) return;
  const state = JSON.parse(saved);

  // Foto de perfil
  if (state.photo) {
    const img = document.getElementById('profile-photo');
    if (img) img.src = state.photo;
  }

  // Imágenes de proyectos
  if (state.projects) {
    Object.keys(state.projects).forEach(key => {
      const banner = document.querySelector(`[data-img="${key}"]`);
      if (banner) banner.src = state.projects[key];
    });
  }

  // Imágenes de certificados
  if (state.certs) {
    Object.keys(state.certs).forEach(key => {
      const img = document.querySelector(`[data-cert="${key}"]`);
      if (img) img.src = state.certs[key];
    });
  }
}
loadAdminData();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 70);
  });
}, { threshold: 0.08 });
reveals.forEach(el => observer.observe(el));

// ── FILTER TABS ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card[data-cat]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
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

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.3)' : 'none';
});