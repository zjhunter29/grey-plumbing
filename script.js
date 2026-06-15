(function(){
  "use strict";
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar shrink ---------- */
  var nav = document.getElementById('nav');
  if(nav){
    var onScroll = function(){
      if(window.scrollY > 24){ nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('mobilePanel');
  var closeMenu = function(){
    if(!nav) return;
    nav.classList.remove('open');
    if(toggle) toggle.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
  };
  if(toggle){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
  }
  if(panel){
    panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });

  /* ---------- Helpers ---------- */
  var inView = function(el, margin){
    var r = el.getBoundingClientRect();
    margin = margin || 0;
    return r.top < (window.innerHeight + margin) && r.bottom > -margin;
  };

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-target]');
  var counted = (typeof WeakSet !== 'undefined') ? new WeakSet() : null;
  var isCounted = function(el){ return counted ? counted.has(el) : !!el.__counted; };
  var runCount = function(el){
    if(isCounted(el)) return;
    counted ? counted.add(el) : (el.__counted = true);
    var target = parseFloat(el.getAttribute('data-target'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var setFinal = function(){ el.textContent = prefix + target + suffix; };
    // If motion is reduced or frames are paused (background tab), skip the animation.
    if(reduce || document.hidden){ setFinal(); return; }
    var dur = 1700, start = null;
    var tick = function(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = prefix + Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if(p < 1){ requestAnimationFrame(tick); } else { setFinal(); }
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if(reduce){
    revealEls.forEach(function(el){ el.classList.add('in'); });
    counters.forEach(runCount);
  } else {
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ ro.observe(el); });

    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ runCount(e.target); co.unobserve(e.target); }
      });
    }, {threshold:0.6});
    counters.forEach(function(el){ co.observe(el); });

    // Safety net: if the page loads in a background tab, observers and rAF can be
    // suspended, leaving content stuck at opacity:0. When the tab becomes visible
    // (or finishes loading), force-reveal/count anything already in view.
    var sync = function(){
      revealEls.forEach(function(el){ if(!el.classList.contains('in') && inView(el, 80)) el.classList.add('in'); });
      counters.forEach(function(el){ if(!isCounted(el) && inView(el, 80)) runCount(el); });
    };
    window.addEventListener('load', sync);
    document.addEventListener('visibilitychange', function(){ if(!document.hidden) sync(); });
  }

  /* ---------- Testimonial carousel (About page) ---------- */
  var track = document.getElementById('testiTrack');
  var slides = track ? track.children.length : 0;
  var dots = Array.prototype.slice.call(document.querySelectorAll('#testiDots .t-dot'));
  var idx = 0, timer = null;
  var go = function(i){
    idx = (i + slides) % slides;
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    dots.forEach(function(d, k){
      d.classList.toggle('active', k === idx);
      d.setAttribute('aria-selected', String(k === idx));
    });
  };
  var stop = function(){ if(timer){ clearInterval(timer); timer = null; } };
  var play = function(){ if(reduce) return; stop(); timer = setInterval(function(){ go(idx + 1); }, 6000); };
  if(track){
    var pv = document.querySelector('.t-prev');
    var nx = document.querySelector('.t-next');
    if(nx) nx.addEventListener('click', function(){ go(idx + 1); play(); });
    if(pv) pv.addEventListener('click', function(){ go(idx - 1); play(); });
    dots.forEach(function(d, k){ d.addEventListener('click', function(){ go(k); play(); }); });
    var wrap = document.querySelector('.testi-wrap');
    if(wrap){
      wrap.addEventListener('mouseenter', stop);
      wrap.addEventListener('mouseleave', play);
    }
    go(0); play();
  }

  /* ---------- Contact form (Contact page) ---------- */
  var cForm = document.getElementById('contactForm');
  if(cForm){
    cForm.addEventListener('submit', function(e){
      e.preventDefault();
      var email = cForm.querySelector('[name="email"]');
      var name = cForm.querySelector('[name="name"]');
      var note = document.getElementById('contactNote');
      var ok = name.value.trim() && email.value && /\S+@\S+\.\S+/.test(email.value);
      if(ok){
        note.classList.add('show');
        cForm.reset();
        note.focus();
      } else {
        (name.value.trim() ? email : name).focus();
      }
    });
  }

  /* ---------- Year ---------- */
  var yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();
})();
