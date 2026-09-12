/**
 * Swami Dayanand Saraswati Sr. Sec. School — site behaviour
 * -----------------------------------------------------------------------
 * Two independent pieces:
 *   1. The notice board: renders ANNOUNCEMENTS into #notice-grid.
 *   2. The navbar: scroll-triggered style swap + mobile menu toggle.
 * -----------------------------------------------------------------------
 */

// ---------------------------------------------------------------------------
// Dummy notice-board data.
// Shape it exactly like your future API response so swapping the source
// later is a one-line change, e.g.:
//
//   fetch('/api/announcements')
//     .then((res) => res.json())
//     .then(renderNotices);
//
// ---------------------------------------------------------------------------
const ANNOUNCEMENTS = [
  {
    id: 'ntc-01',
    category: 'Admission',
    title: 'Admissions open for session 2026–27',
    excerpt:
      'Forms are now available at the school office for all classes. Seats are limited per section.',
    date: '2026-09-01',
    pinned: true,
  },
  {
    id: 'ntc-02',
    category: 'Event',
    title: 'Annual Sports Day',
    excerpt: 'Track events and kho-kho finals on the main ground. Parents are welcome from 9 AM.',
    date: '2026-09-20',
  },
  {
    id: 'ntc-03',
    category: 'Result',
    title: 'Half-yearly results, Classes X & XII',
    excerpt: 'Report cards will be handed out by class teachers on the notice date.',
    date: '2026-09-15',
  },
  {
    id: 'ntc-04',
    category: 'Holiday',
    title: 'School closed — regional holiday',
    excerpt: 'Classes resume as usual the next working day.',
    date: '2026-10-02',
  },
  {
    id: 'ntc-05',
    category: 'Academics',
    title: 'Parent–teacher meeting, Classes VI–VIII',
    excerpt: 'Progress cards and syllabus updates will be shared. Attendance is encouraged.',
    date: '2026-09-27',
  },
];

// Tailwind classes for each category's pill on the secondary cards.
const CATEGORY_STYLES = {
  Admission: 'bg-navy text-white',
  Event: 'bg-gold/10 text-[#8A6D1E]',
  Result: 'bg-navy/[0.08] text-navy',
  Holiday: 'bg-neutral-100 text-neutral-500',
  Academics: 'bg-navy/[0.08] text-navy',
};

const ICONS = {
  calendar:
    '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  megaphone:
    '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l8 4V5l-8 4H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>',
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function renderNotices(announcements) {
  const data = announcements || ANNOUNCEMENTS;
  const grid = document.getElementById('notice-grid');
  if (!grid) return;

  const pinned = data.find((a) => a.pinned);
  // Only a couple of secondary notices surface in this compact widget;
  // "View all notices" is where the full list would live.
  const rest = data.filter((a) => !a.pinned).slice(0, 2);

  let html = '';

  if (pinned) {
    html += `
      <article class="flex flex-col justify-between rounded-3xl bg-navy p-8 text-white lg:col-span-2 lg:row-span-2">
        <div>
          <div class="mb-6 flex items-center gap-2 text-gold">
            ${ICONS.megaphone}
            <span class="text-[13px] font-medium">${pinned.category}</span>
          </div>
          <h3 class="text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">${pinned.title}</h3>
          <p class="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">${pinned.excerpt}</p>
        </div>
        <div class="mt-10 flex items-center gap-2 text-[13px] text-white/50">
          ${ICONS.calendar}
          ${formatDate(pinned.date)}
        </div>
      </article>`;
  }

  rest.forEach((notice) => {
    html += `
      <article class="flex flex-col justify-between rounded-3xl border border-navy/[0.1] bg-white p-6 transition-colors hover:border-navy/25">
        <div>
          <span class="inline-block rounded-full px-3 py-1 text-[11px] font-medium ${CATEGORY_STYLES[notice.category]}">
            ${notice.category}
          </span>
          <h3 class="mt-4 text-[15.5px] font-semibold leading-snug text-navy">${notice.title}</h3>
          <p class="mt-2 text-[13.5px] leading-relaxed text-navy/60">${notice.excerpt}</p>
        </div>
        <div class="mt-6 flex items-center gap-2 text-[12.5px] text-navy/40">
          ${ICONS.calendar}
          ${formatDate(notice.date)}
        </div>
      </article>`;
  });

  grid.innerHTML = html;
}

// ---------------------------------------------------------------------------
// Navbar: scroll-triggered style swap + mobile menu
// ---------------------------------------------------------------------------
function initNavbar() {
  const header = document.getElementById('navbar');
  const menuBtn = document.getElementById('menu-btn');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  const mobilePanel = document.getElementById('mobile-panel');

  // The bar is always a light glass panel; scrolling just adds a touch more
  // depth (opacity + shadow) so it reads clearly once the hero photo scrolls away.
  function onScroll() {
    const scrolled = window.scrollY > 12;
    header.classList.toggle('bg-white/90', scrolled);
    header.classList.toggle('bg-white/70', !scrolled);
    header.classList.toggle('shadow-sm', scrolled);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  let open = false;
  function toggleMenu() {
    open = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    mobilePanel.classList.toggle('open', open);
    iconMenu.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  }
  menuBtn.addEventListener('click', toggleMenu);
  mobilePanel.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (open) toggleMenu();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderNotices();
  initNavbar();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
