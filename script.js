// ========== Section filter (Publications) ==========
(function(){
    const list = document.getElementById('pub-list');
    const buttons = document.querySelectorAll('.pub-filters [data-filter]');
    if(!list || !buttons.length) return;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.setAttribute('aria-selected', 'false'));
        btn.setAttribute('aria-selected', 'true');
        const y = btn.getAttribute('data-filter');
        list.querySelectorAll('.pub').forEach(item => {
          const show = (y === 'all') || (item.getAttribute('data-year') === y);
          item.style.display = show ? '' : 'none';
        });
      });
    });
  })();
  
  // ========== Active section highlighting (left rail + mobile section-nav) ==========
  (function(){
    const sections = Array.from(document.querySelectorAll('main .section[id]'));
    if(!sections.length) return;
  
    const railLinks = Array.from(document.querySelectorAll('.side-nav a[data-section]'));
    const mobLinks  = Array.from(document.querySelectorAll('.m-section-nav a[data-section]'));
  
    const setActive = (id) => {
      [...railLinks, ...mobLinks].forEach(a => {
        const on = a.dataset.section === id;
        a.classList.toggle('active', on);
        a.setAttribute('aria-current', on ? 'true' : 'false');
      });
    };
  
    // Use a generous rootMargin so "active" changes near mid-screen
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 });
  
    sections.forEach(s => obs.observe(s));
  })();
  
  // ========== Custom cursor ring (reduced-motion & touch aware) ==========
  (function(){
    const ring = document.getElementById('cursor-ring');
    if(!ring) return;
  
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduce   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduce) { ring.remove(); return; }
  
    let x = window.innerWidth/2,  y = window.innerHeight/2;
    let tx = x, ty = y;
    const speed = 0.18;
  
    function raf(){
      x += (tx - x) * speed;
      y += (ty - y) * speed;
      ring.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      ring.style.opacity = '1';
    }, { passive: true });
  
    window.addEventListener('mouseleave', () => { ring.style.opacity = '0'; });
  
    const interactive = 'a, button, .btn, [role="button"], input, textarea, select, summary, .chip';
    document.addEventListener('pointerover', (e) => {
      if (e.target.closest(interactive)) ring.classList.add('hover');
    });
    document.addEventListener('pointerout', (e) => {
      if (e.target.closest(interactive)) ring.classList.remove('hover');
    });
  
    document.addEventListener('mousedown', () => ring.classList.add('down'));
    document.addEventListener('mouseup',   () => ring.classList.remove('down'));
  })();
  