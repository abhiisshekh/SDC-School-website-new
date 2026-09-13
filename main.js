// =========================================================================
// SDS School — Premium Scroll Effects
// =========================================================================

// =================== 1. SCROLL REVEAL (Fade/Slide/Stagger) ==============
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('[data-animate],[data-stagger]').forEach((el) => obs.observe(el));
}

// =================== 2. PARALLAX FLOATING SHAPES ========================
function initParallax() {
  const shapes = document.querySelectorAll('.parallax-shape');
  if (!shapes.length) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        shapes.forEach((s) => {
          const speed = parseFloat(s.dataset.speed) || 0.05;
          const offset = s.closest('section')?.offsetTop || 0;
          const y = (scrollY - offset) * speed;
          s.style.transform = `translateY(${y}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// =================== 3. STICKY SCROLL SECTION ===========================
function initStickyScroll() {
  const section = document.querySelector('.sticky-section');
  if (!section || window.innerWidth < 1024) return;

  const steps = section.querySelectorAll('.scroll-step');
  const images = section.querySelectorAll('.sticky-img img');
  if (!steps.length || !images.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.step) || 0;
          steps.forEach((s) => s.classList.remove('active-step'));
          images.forEach((i) => i.classList.remove('active-img'));
          e.target.classList.add('active-step');
          if (images[idx]) images[idx].classList.add('active-img');
        }
      });
    },
    { threshold: 0.7, rootMargin: "-150px 0px -150px 0px" }
  );
  steps.forEach((s) => obs.observe(s));
  // Activate first by default
  if (steps[0]) steps[0].classList.add('active-step');
  if (images[0]) images[0].classList.add('active-img');
}

// =================== 4. COUNTER ANIMATION ===============================
function initCounters() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const end = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (isNaN(end)) { el.textContent = el.dataset.count + suffix; obs.unobserve(el); return; }
        const dur = 1400, start = performance.now();
        (function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * end) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        obs.unobserve(el);
      }
    }),
    { threshold: 0.5 }
  );
  document.querySelectorAll('[data-count]').forEach((el) => obs.observe(el));
}

// =================== 5. NOTICE BOARD ====================================
const ANNOUNCEMENTS = [
  { id:'ntc-01', category:'Admission', title:'Admissions open for session 2026–27', excerpt:'Forms available at the school office for all classes. Seats limited per section.', date:'2026-09-01', pinned:true },
  { id:'ntc-02', category:'Event', title:'Annual Sports Day', excerpt:'Track events and kho-kho finals on the main ground. Parents welcome from 9 AM.', date:'2026-09-20' },
  { id:'ntc-03', category:'Result', title:'Half-yearly results, Classes X & XII', excerpt:'Report cards handed out by class teachers on the notice date.', date:'2026-09-15' },
  { id:'ntc-04', category:'Holiday', title:'School closed — regional holiday', excerpt:'Classes resume as usual the next working day.', date:'2026-10-02' },
  { id:'ntc-05', category:'Academics', title:'Parent–teacher meeting, Classes VI–VIII', excerpt:'Progress cards and syllabus updates will be shared.', date:'2026-09-27' },
];
const CS={Admission:'bg-teal text-white',Event:'bg-amber-100 text-amber-700',Result:'bg-blue-100 text-blue-700',Holiday:'bg-gray-200 text-gray-500',Academics:'bg-purple-100 text-purple-700'};
const IC={
  cal:'<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  mega:'<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l8 4V5l-8 4H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>',
};
function fmt(d){return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
function renderNotices(){
  const g=document.getElementById('notice-grid');if(!g)return;
  const pin=ANNOUNCEMENTS.find(x=>x.pinned),rest=ANNOUNCEMENTS.filter(x=>!x.pinned).slice(0,2);let h='';
  if(pin)h+=`<article class="flex flex-col justify-between rounded-2xl bg-dark p-8 text-white lg:col-span-2 lg:row-span-2" data-animate="fade-up"><div><div class="mb-5 flex items-center gap-2 text-gold">${IC.mega}<span class="text-[11px] font-semibold tracking-wider">${pin.category.toUpperCase()}</span></div><h3 class="font-serif text-xl font-bold leading-snug sm:text-2xl">${pin.title}</h3><p class="mt-3 max-w-md text-[14px] leading-relaxed text-white/55">${pin.excerpt}</p></div><div class="mt-8 flex items-center gap-2 text-[12px] text-white/30">${IC.cal} ${fmt(pin.date)}</div></article>`;
  rest.forEach(n=>{h+=`<article class="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg" data-animate="fade-up"><div><span class="inline-block rounded-lg px-3 py-1 text-[11px] font-semibold ${CS[n.category]}">${n.category}</span><h3 class="mt-3 text-[14px] font-bold leading-snug text-dark">${n.title}</h3><p class="mt-2 text-[13px] leading-relaxed text-gray-400">${n.excerpt}</p></div><div class="mt-5 flex items-center gap-2 text-[11px] text-gray-300">${IC.cal} ${fmt(n.date)}</div></article>`});
  g.innerHTML=h;
  const o2=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o2.unobserve(e.target)}})},{threshold:.12});
  g.querySelectorAll('[data-animate]').forEach(el=>o2.observe(el));
}

// =================== 6. NAVBAR ==========================================
function initNavbar(){
  const hdr=document.getElementById('navbar'),btn=document.getElementById('menu-btn'),im=document.getElementById('icon-menu'),ic=document.getElementById('icon-close'),mp=document.getElementById('mobile-panel');
  const ck=()=>hdr.classList.toggle('scrolled',window.scrollY>50);
  ck();window.addEventListener('scroll',ck,{passive:true});
  let open=false;
  function toggle(){open=!open;btn.setAttribute('aria-expanded',String(open));mp.classList.toggle('open',open);im.classList.toggle('hidden',open);ic.classList.toggle('hidden',!open)}
  btn.addEventListener('click',toggle);
  mp.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{if(open)toggle()}));
}

// =================== INIT ===============================================
document.addEventListener('DOMContentLoaded',()=>{
  initReveal();initParallax();initStickyScroll();initCounters();renderNotices();initNavbar();
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
});
