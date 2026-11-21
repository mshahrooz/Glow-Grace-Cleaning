(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent = new Date().getFullYear());
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeMenu = () => { if(!toggle) return; toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');header.classList.remove('menu-open'); };
  if(toggle){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true'; toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');header.classList.toggle('menu-open',open)});
    mobileNav.querySelectorAll('a').forEach(el=>el.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
    document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu()});
    window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu()});}
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const serviceItems = [...document.querySelectorAll('.service-detail')];
  const search = document.getElementById('service-search');
  let activeCategory='All';
  const renderServices=()=>{if(!serviceItems.length)return;const term=(search?.value||'').trim().toLowerCase();let count=0;serviceItems.forEach(item=>{const show=(activeCategory==='All'||item.dataset.category===activeCategory)&&(!term||item.dataset.search.includes(term));item.hidden=!show;if(show)count++;});document.getElementById('service-count').textContent=count;document.querySelector('.no-results').hidden=count!==0;};
  filterButtons.forEach(btn=>btn.addEventListener('click',()=>{activeCategory=btn.dataset.filter;filterButtons.forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});renderServices()}));
  if(search)search.addEventListener('input',renderServices);
  document.getElementById('reset-filters')?.addEventListener('click',()=>{activeCategory='All';search.value='';filterButtons.forEach(b=>{b.classList.toggle('active',b.dataset.filter==='All');b.setAttribute('aria-pressed',String(b.dataset.filter==='All'))});renderServices();search.focus()});
  // Gallery filtering and native accessible dialog lightbox.
  const gBtns=[...document.querySelectorAll('[data-gallery-filter]')];
  const tiles=[...document.querySelectorAll('.gallery-item')];
  gBtns.forEach(btn=>btn.addEventListener('click',()=>{gBtns.forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});const category=btn.dataset.galleryFilter;tiles.forEach(item=>item.hidden=category!=='All'&&item.dataset.galleryCategory!==category)}));
  const lightbox=document.getElementById('gallery-lightbox');
  tiles.forEach(tile=>tile.addEventListener('click',()=>{if(!lightbox)return;const im=lightbox.querySelector('img');im.src=tile.dataset.image;im.alt=tile.querySelector('img').alt;lightbox.querySelector('p').textContent=tile.dataset.caption;lightbox.showModal()}));
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click',()=>lightbox.close());
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
  // All forms work on static hosts using a prefilled mailto URL. No backend implied.
  const form=document.getElementById('quote-form');
  const selectedService=document.getElementById('requested-service');
  if(selectedService){const param=new URLSearchParams(location.search).get('service');if(param&&[...selectedService.options].some(o=>o.value===param))selectedService.value=param}
  if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const selected=selectedService.options[selectedService.selectedIndex]?.textContent||'';
    const subject='Glow Grace Cleaning enquiry — '+selected;
    const body=['Hello Glow Grace Cleaning,','','I would like to enquire about a cleaning service.','','Name: '+data.get('name'),'Phone: '+data.get('phone'),'Email: '+data.get('email'),'Service: '+selected,'Property: '+data.get('property'),'','Details:',data.get('message'),'','Thank you!'].join('\n');
    const url='mailto:glowgracecleaning@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    document.getElementById('form-message').textContent='Your email app should open with the enquiry prepared. Please click Send there to complete your request. If it does not open, email glowgracecleaning@gmail.com directly.';
    window.location.href=url;
  });
  // Deferred hash targeting after page loads, useful when link points into the detailed service menu.
  if(location.hash && serviceItems.length){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target){target.hidden=false;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}
})();
