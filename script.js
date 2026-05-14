// ============================================
// SMOOTH SCROLL — Pure JS (no library)
// ============================================
function initLenis() {
  let current = 0;
  let target = 0;
  let ease = 0.08;
  let isAnimating = false;
  let touchStartY = 0;

  // Set body height so page is scrollable
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  const wrapper = document.getElementById('smooth-wrapper') || (() => {
    const w = document.createElement('div');
    w.id = 'smooth-wrapper';
    w.style.cssText = 'position:fixed;top:0;left:0;width:100%;will-change:transform;';
    while (document.body.firstChild) w.appendChild(document.body.firstChild);
    document.body.appendChild(w);
    return w;
  })();

  function getMaxScroll() {
    return wrapper.scrollHeight - window.innerHeight;
  }

  function animate() {
    current += (target - current) * ease;
    if (Math.abs(target - current) < 0.5) current = target;
    wrapper.style.transform = `translateY(${-current}px)`;

    // Update scrollY for intersection observers
    Object.defineProperty(window, 'scrollY', { value: current, writable: true });

    // Dispatch scroll event for other listeners
    window.dispatchEvent(new Event('scroll'));

    requestAnimationFrame(animate);
  }

  // Mouse wheel
  window.addEventListener('wheel', (e) => {
    target += e.deltaY * 1.2;
    target = Math.max(0, Math.min(target, getMaxScroll()));
  }, { passive: true });

  // Touch
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const delta = (touchStartY - e.touches[0].clientY) * 2;
    target += delta;
    target = Math.max(0, Math.min(target, getMaxScroll()));
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  // Keyboard scroll
  window.addEventListener('keydown', (e) => {
    const amount = window.innerHeight * 0.85;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') target = Math.min(target + amount, getMaxScroll());
    if (e.key === 'ArrowUp' || e.key === 'PageUp') target = Math.max(target - amount, 0);
    if (e.key === 'Home') target = 0;
    if (e.key === 'End') target = getMaxScroll();
  });

  // Nav click scroll
  document.querySelectorAll('nav ul a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const section = document.querySelector(a.getAttribute('href'));
      if (section) {
        target = Math.min(section.offsetTop - 80, getMaxScroll());
      }
    });
  });

  // Back to top button
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    backBtn.onclick = () => { target = 0; };
  }

  animate();
}

// ============================================
// CURSOR GLOW
// ============================================
function initCursor() {
  if ('ontouchstart' in window) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animateCursor() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// ============================================
// HERO — LINE BY LINE REVEAL
// ============================================
function initHeroReveal() {
  const elements = [
    { el: document.querySelector('.greeting'), delay: 0 },
    { el: document.querySelector('.hero-name'), delay: 0.15 },
    { el: document.querySelector('.hero-title'), delay: 0.28 },
    { el: document.querySelector('.hero-bio'), delay: 0.42 },
    { el: document.querySelector('.hero-btns'), delay: 0.56 },
    { el: document.querySelector('.hero-visual'), delay: 0.3 },
  ];

  elements.forEach(({ el, delay }) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = el === document.querySelector('.hero-visual')
      ? 'scale(0.92) translateY(20px)'
      : 'translateY(28px)';

    setTimeout(() => {
      el.style.transition = `opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)`;
      el.style.opacity = '1';
      el.style.transform = el === document.querySelector('.hero-visual')
        ? 'scale(1) translateY(0)'
        : 'translateY(0)';
    }, 300 + delay * 1000);
  });
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ============================================
// STAGGER GROUPS
// ============================================
function initStagger() {
  const groupObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const children = entry.target.querySelectorAll('.stagger-child');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 110);
      });
      groupObs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stagger-group').forEach(g => groupObs.observe(g));
}

// ============================================
// CLIP PATH REVEAL — section headings
// ============================================
function initClipReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section-heading').forEach(el => {
    el.classList.add('clip-reveal');
    obs.observe(el);
  });
}

// ============================================
// LETTER SPACING FADE — section labels
// ============================================
function initLetterSpacing() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('letter-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.section-label').forEach(el => {
    el.classList.add('letter-fade');
    obs.observe(el);
  });
}

// ============================================
// TYPING ANIMATION
// ============================================
function initTyping() {
  const titles = ['Data Engineer', 'Software Developer', 'Full Stack Engineer', 'Problem Solver'];
  let tIdx = 0, cIdx = 0, deleting = false;
  const el = document.getElementById('typing-title');
  if (!el) return;

  function type() {
    const cur = titles[tIdx];
    el.textContent = deleting ? cur.slice(0, --cIdx) : cur.slice(0, ++cIdx);
    if (!deleting && cIdx === cur.length) setTimeout(() => deleting = true, 2000);
    else if (deleting && cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % titles.length; }
    setTimeout(type, deleting ? 45 : 85);
  }
  type();
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      if (!target) return;
      let n = 0;
      const step = Math.ceil(target / 40);
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n + '+';
        if (n >= target) clearInterval(t);
      }, 35);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-target]').forEach(el => obs.observe(el));
}

// ============================================
// 3D CARD TILT
// ============================================
function initTilt() {
  if ('ontouchstart' in window) return;
  document.querySelectorAll('.project-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s';
      card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(12px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.7s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s';
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });
}

// ============================================
// PARALLAX ORBS
// ============================================
function initParallax() {
  const o1 = document.querySelector('.orb1');
  const o2 = document.querySelector('.orb2');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const s = window.scrollY;
        if (o1) o1.style.transform = `translateY(${s * 0.2}px)`;
        if (o2) o2.style.transform = `translateY(${-s * 0.12}px)`;
        ticking = false;

        // Back to top
        const btn = document.getElementById('back-to-top');
        if (btn) btn.style.opacity = s > 400 ? '1' : '0';
      });
      ticking = true;
    }
  });
}

// ============================================
// ACTIVE NAV
// ============================================
function initNav() {
  const pages = document.querySelectorAll('.page[id]');
  const navLinks = document.querySelectorAll('nav ul a');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  pages.forEach(p => obs.observe(p));
}

// ============================================
// TOUCH TAP EFFECT
// ============================================
function initTouch() {
  if (!('ontouchstart' in window)) return;
  document.querySelectorAll('.project-card, .edu-card, .stat-card, .skill-group').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.style.transition = 'transform 0.2s ease, border-color 0.2s, box-shadow 0.2s';
      card.style.transform = 'scale(0.97)';
      card.style.borderColor = 'rgba(0,255,157,0.4)';
    }, { passive: true });

    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s';
        card.style.transform = 'scale(1)';
        card.style.borderColor = '';
      }, 150);
    }, { passive: true });
  });
}

// ============================================
// INIT ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCursor();
  initHeroReveal();
  initScrollReveal();
  initStagger();
  initClipReveal();
  initLetterSpacing();
  initTyping();
  initCounters();
  initTilt();
  initParallax();
  initNav();
  initTouch();
});