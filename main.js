const ANNOUNCEMENTS=[
  {id:'ntc-01',category:'Admission',title:'Admissions open for session 2026–27',excerpt:'Forms are now available at the school office for all classes. Seats are limited per section.',date:'2026-09-01',pinned:true},
  {id:'ntc-02',category:'Event',title:'Annual Sports Day',excerpt:'Track events and kho-kho finals on the main ground. Parents are welcome from 9 AM.',date:'2026-09-20'},
  {id:'ntc-03',category:'Result',title:'Half-yearly results, Classes X & XII',excerpt:'Report cards will be handed out by class teachers on the notice date.',date:'2026-09-15'},
  {id:'ntc-04',category:'Holiday',title:'School closed — regional holiday',excerpt:'Classes resume as usual the next working day.',date:'2026-10-02'},
  {id:'ntc-05',category:'Academics',title:'Parent–teacher meeting, Classes VI–VIII',excerpt:'Progress cards and syllabus updates will be shared. Attendance is encouraged.',date:'2026-09-27'},
];
const CAT_STYLE={Admission:'bg-blue-600 text-white',Event:'bg-amber-100 text-amber-700',Result:'bg-blue-100 text-blue-700',Holiday:'bg-gray-100 text-gray-500',Academics:'bg-purple-100 text-purple-700'};
const IC={
  cal:'<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  mega:'<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l8 4V5l-8 4H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>',
  pin:'<svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5M9 2h6l-1 7h4l-6 8h-1l1-7H8z"/></svg>',
};
function fmt(d){return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
function renderNotices(a){
  const data=a||ANNOUNCEMENTS,grid=document.getElementById('notice-grid');if(!grid)return;
  const pin=data.find(x=>x.pinned),rest=data.filter(x=>!x.pinned).slice(0,2);let h='';
  if(pin)h+=`<article class="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white shadow-xl shadow-brand-900/20 lg:col-span-2 lg:row-span-2"><div><div class="mb-5 flex items-center gap-2 text-amber-300">${IC.mega}<span class="text-[11px] font-bold tracking-wide">${pin.category.toUpperCase()}</span><span class="ml-1 flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">${IC.pin} Pinned</span></div><h3 class="font-display text-xl font-bold leading-snug sm:text-2xl">${pin.title}</h3><p class="mt-3 max-w-md text-[14px] leading-relaxed text-white/60">${pin.excerpt}</p></div><div class="mt-8 flex items-center gap-2 text-[12px] text-white/35">${IC.cal} ${fmt(pin.date)}</div></article>`;
  rest.forEach(n=>{h+=`<article class="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg"><div><span class="inline-block rounded-lg px-3 py-1 text-[11px] font-bold ${CAT_STYLE[n.category]}">${n.category}</span><h3 class="mt-3 text-[14px] font-bold leading-snug text-gray-800">${n.title}</h3><p class="mt-2 text-[13px] leading-relaxed text-gray-400">${n.excerpt}</p></div><div class="mt-5 flex items-center gap-2 text-[11px] font-medium text-gray-300">${IC.cal} ${fmt(n.date)}</div></article>`});
  grid.innerHTML=h;
}
function initNavbar(){
  const hdr=document.getElementById('navbar'),btn=document.getElementById('menu-btn'),im=document.getElementById('icon-menu'),ic=document.getElementById('icon-close'),mp=document.getElementById('mobile-panel');
  const onScroll=()=>{const s=window.scrollY>10;hdr.classList.toggle('shadow-md',s);hdr.classList.toggle('shadow-sm',!s)};
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  let open=false;
  function toggle(){open=!open;btn.setAttribute('aria-expanded',String(open));mp.classList.toggle('open',open);im.classList.toggle('hidden',open);ic.classList.toggle('hidden',!open)}
  btn.addEventListener('click',toggle);
  mp.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{if(open)toggle()}));
}
document.addEventListener('DOMContentLoaded',()=>{renderNotices();initNavbar();const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear()});
