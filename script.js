/* ==========================================================================
   PLACEHOLDER SWATCHES
   Every image slot below is a generated gradient placeholder so the layout
   looks intentional with zero real assets. To use your own images, replace
   the swatch div in the render functions with:
     <img src="assets/gallery/your-file.jpg" alt="...">
   and delete the corresponding makeSwatch() call.
   ========================================================================== */
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// A small set of hand-picked hue pairs so placeholders feel curated, not random.
const PALETTES = [
  ['#EFE9DD', '#B7C6B0'],
  ['#E3DCCF', '#8FA79B'],
  ['#EDE4D3', '#C9A98C'],
  ['#DFE3D9', '#9AAE8D'],
  ['#E9E2D6', '#A9B8A3'],
  ['#E6E0D2', '#B99E8A'],
];

function makeSwatchStyle(seed) {
  const idx = hashString(seed) % PALETTES.length;
  const [a, b] = PALETTES[idx];
  const angle = (hashString(seed + 'x') % 360);
  return `background: linear-gradient(${angle}deg, ${a}, ${b});`;
}

/* ==========================================================================
   GALLERY DATA
   Each work can have multiple images (a "series"). Replace title, medium,
   year, description, and images with your real work.
   ========================================================================== */
const WORKS = [
  {
    id: 'w01', title: 'Peel & Fold', medium: 'code', year: '2026',
    description: 'A CSS-only sticker peel effect using layered clip-path animation and pseudo-element choreography.',
    images: ['w01-1', 'w01-2', 'w01-3']
  },
  {
    id: 'w02', title: 'Moonlit Echoes', medium: 'design', year: '2026',
    description: 'A full theme port from CottageCore into a SillyTavern preset — palette, layout, and type system.',
    images: ['w02-1', 'w02-2']
  },
  {
    id: 'w03', title: 'Sardine Study', medium: 'art', year: '2025',
    description: 'Gradient-only still life exploring tin, oil, and light using layered radial gradients.',
    images: ['w03-1', 'w03-2', 'w03-3', 'w03-4']
  },
  {
    id: 'w04', title: 'Five-Tone System', medium: 'design', year: '2025',
    description: 'A five-color palette replacement system cycled across repeating UI elements with nth-child logic.',
    images: ['w04-1', 'w04-2']
  },
  {
    id: 'w05', title: 'Carousel, No JS', medium: 'code', year: '2025',
    description: ':target and sibling combinators standing in for a full carousel component.',
    images: ['w05-1', 'w05-2', 'w05-3']
  },
  {
    id: 'w06', title: 'Windows, Redrawn', medium: 'art', year: '2025',
    description: 'A clip-path and gradient recreation of a familiar logo, built from four triangles and light.',
    images: ['w06-1']
  },
  {
    id: 'w07', title: 'Bio Builder', medium: 'code', year: '2025',
    description: 'A consolidation pass across fourteen stylesheets — filtered, merged, alphabetized, scored.',
    images: ['w07-1', 'w07-2']
  },
  {
    id: 'w08', title: 'Notification, Staggered', medium: 'design', year: '2024',
    description: 'A CSS-only notification animation sequence with staggered entrance timing.',
    images: ['w08-1', 'w08-2', 'w08-3']
  },
];

/* ==========================================================================
   HIGHLIGHTS (landing page)
   ========================================================================== */
function renderHighlights() {
  const grid = document.getElementById('highlights-grid');
  if (!grid) return;
  const featured = WORKS.slice(0, 4);
  grid.innerHTML = featured.map((w, i) => `
    <a class="highlight-card" href="gallery.html#${w.id}" aria-label="${w.title}">
      <div class="swatch" style="${makeSwatchStyle(w.images[0])}"></div>
      <div class="card-label">
        <span class="num">NO. ${String(i + 1).padStart(2, '0')}</span>
        <span class="title">${w.title}</span>
        <span class="medium">${w.medium} — ${w.year}</span>
      </div>
    </a>
  `).join('');
}

/* ==========================================================================
   ANNOUNCEMENTS (landing page)
   Replace with your own log entries — newest first.
   ========================================================================== */
const ANNOUNCEMENTS = [
  { date: '2026-07-02', tag: 'update', title: 'Five-tone palette system published', body: 'A reusable nth-child based color cycling approach, written up alongside the source.' },
  { date: '2026-06-18', tag: 'new work', title: 'Moonlit Echoes theme released', body: 'A full CottageCore-to-Moonlit port including fonts, layout, and custom CSS.' },
  { date: '2026-05-30', tag: 'note', title: 'Taking on a few collaborations', body: 'Have some bandwidth for UI and theme work over the next few weeks — see contact below.' },
];

function renderAnnouncements() {
  const list = document.getElementById('log-list');
  if (!list) return;
  list.innerHTML = ANNOUNCEMENTS.map(a => `
    <div class="log-entry">
      <div class="log-date mono">${a.date}</div>
      <div class="log-body">
        <span class="tag">${a.tag}</span>
        <h3>${a.title}</h3>
        <p>${a.body}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   GALLERY GRID (gallery page)
   ========================================================================== */
let activeFilter = 'all';

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = WORKS.map((w, i) => `
    <div class="gallery-tile ${activeFilter !== 'all' && activeFilter !== w.medium ? 'hidden-tile' : ''}"
         data-medium="${w.medium}" data-index="${i}" tabindex="0" role="button"
         aria-label="Open ${w.title}">
      <div class="swatch" style="${makeSwatchStyle(w.images[0])}"></div>
      <span class="tile-tag">${w.medium}</span>
      <div class="tile-info">
        <span class="num">NO. ${String(i + 1).padStart(2, '0')}</span>
        <span class="title">${w.title}</span>
        <span class="count">${w.images.length} image${w.images.length > 1 ? 's' : ''}</span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-tile').forEach(tile => {
    tile.addEventListener('click', () => openLightbox(parseInt(tile.dataset.index, 10)));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(parseInt(tile.dataset.index, 10));
      }
    });
  });
}

function setupFilters() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderGallery();
  });
}

/* ==========================================================================
   LIGHTBOX
   ========================================================================== */
let currentWork = null;
let currentImage = 0;

function openLightbox(workIndex) {
  currentWork = WORKS[workIndex];
  currentImage = 0;
  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderLightbox();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
  currentWork = null;
}

function renderLightbox() {
  if (!currentWork) return;
  const stage = document.getElementById('lightbox-stage');
  const counter = document.getElementById('lightbox-counter');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');
  const thumbs = document.getElementById('lightbox-thumbs');

  stage.innerHTML = `<div class="swatch" style="${makeSwatchStyle(currentWork.images[currentImage])}"></div>`;
  counter.textContent = `${String(currentImage + 1).padStart(2, '0')} / ${String(currentWork.images.length).padStart(2, '0')}`;
  titleEl.textContent = currentWork.title;
  descEl.textContent = currentWork.description;

  thumbs.innerHTML = currentWork.images.map((img, i) => `
    <div class="thumb ${i === currentImage ? 'active' : ''}" data-i="${i}">
      <div class="swatch" style="${makeSwatchStyle(img)}"></div>
    </div>
  `).join('');
  thumbs.querySelectorAll('.thumb').forEach(t => {
    t.addEventListener('click', () => {
      currentImage = parseInt(t.dataset.i, 10);
      renderLightbox();
    });
  });
}

function nextImage() {
  if (!currentWork) return;
  currentImage = (currentImage + 1) % currentWork.images.length;
  renderLightbox();
}
function prevImage() {
  if (!currentWork) return;
  currentImage = (currentImage - 1 + currentWork.images.length) % currentWork.images.length;
  renderLightbox();
}

function setupLightboxControls() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-next').addEventListener('click', nextImage);
  document.getElementById('lightbox-prev').addEventListener('click', prevImage);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Deep-link support: gallery.html#w03 opens that work directly.
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const idx = WORKS.findIndex(w => w.id === hash);
    if (idx > -1) openLightbox(idx);
  }
}

/* ==========================================================================
   CONTACT FORM  (static-site friendly: builds a mailto: link, no backend)
   ========================================================================== */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const CONTACT_EMAIL = 'you@example.com'; // <-- replace with your email

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#f-name').value.trim();
    const email = form.querySelector('#f-email').value.trim();
    const message = form.querySelector('#f-message').value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'website visitor'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}

function setupCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1600);
      } catch (err) {
        console.warn('Clipboard copy failed', err);
      }
    });
  });
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderHighlights();
  renderAnnouncements();
  renderGallery();
  setupFilters();
  setupLightboxControls();
  setupContactForm();
  setupCopyButtons();
});
