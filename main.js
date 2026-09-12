// -----------------------------------------------------------------------
// Swami Dayanand Saraswati Sr. Sec. School — site behaviour
// -----------------------------------------------------------------------

// ANNOUNCEMENTS — edit this array or replace with fetch('/api/announcements')
const ANNOUNCEMENTS = [
  {
    id: 'ntc-01',
    category: 'Admission',
    title: 'Admissions open for session 2026–27',
    excerpt: 'Forms are now available at the school office for all classes. Seats are limited per section.',
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

const CATEGORY_STYLES = {
  Admission: 'bg-navy text-white',
  Event:     'bg-gold/15 text-amber-700',
  Result:    'bg-sky-500/10 text-sky-700',
  Holiday:   'bg-neutral-100 text-neutral-500',
  Academics: 'bg-purple-500/10 text-purple-700',
};

const ICONS = {
  calendar: '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  megaphone: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l8 4V5l-8 4H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>',
  pin: '<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 2h6l-1 7h4l-6 8h-1l1-7H8z"/></svg>',
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function renderNotices(announcements) {
  const data = announcements || ANNOUNCEMENTS;
  const grid = document.getElementById('notice-grid');
  if (!grid) return;

  const pinned = data.find(a => a.pinned);
  const rest = data.filter(a => !a.pinned).slice(0, 2);
  let html = '';

  if (pinned) {
    html += `
      <article class="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-light p-8 text-white shadow-xl shadow-navy/20 lg:col-span-2 lg:row-span-2">
        <div>
          <div class="mb-6 flex items-center gap-2 text-gold">
            ${ICONS.megaphone}
            <span class="text-[12px] font-bold tracking-wide">${pinned.category.toUpperCase()}</span>
            <span class="ml-1 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/80">${ICONS.pin} Pinned</span>
          </div>
          <h3 class="text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">${pinned.title}</h3>
          <p class="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">${pinned.excerpt}</p>
        </div>
        <div class="mt-10 flex items-center gap-2 text-[13px] text-white/40">
          ${ICONS.calendar}
          ${formatDate(pinned.date)}
        </div>
      </article>`;
  }

  rest.forEach(notice => {
    html += `
      <article class="flex flex-col justify-between rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-sm transition-all hover:border-navy/15 hover:shadow-md">
        <div>
          <span class="inline-block rounded-lg px-3 py-1 text-[11px] font-bold ${CATEGORY_STYLES[notice.category]}">
            ${notice.category}
          </span>
          <h3 class="mt-4 text-[15px] font-bold leading-snug text-navy">${notice.title}</h3>
          <p class="mt-2 text-[13px] leading-relaxed text-navy/55">${notice.excerpt}</p>
        </div>
        <div class="mt-6 flex items-center gap-2 text-[12px] font-medium text-navy/35">
          ${ICONS.calendar}
          ${formatDate(notice.date)}
        </div>
      </article>`;
  });

  grid.innerHTML = html;
}

// Navbar
function initNavbar() {
  const header = document.getElementById('navbar');
  const menuBtn = document.getElementById('menu-btn');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  const mobilePanel = document.getElementById('mobile-panel');

  function onScroll() {
    const s = window.scrollY > 12;
    header.classList.toggle('shadow-sm', s);
    header.classList.toggle('bg-white/90', s);
    header.classList.toggle('bg-white/80', !s);
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
  mobilePanel.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => { if (open) toggleMenu(); });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderNotices();
  initNavbar();
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
