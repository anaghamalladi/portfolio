document.addEventListener('DOMContentLoaded', () => {

  // CURSOR GLOW
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  // HERO STAGGER ENTRANCE
  const heroEls = [
    document.querySelector('.greeting'),
    document.querySelector('.hero-name'),
    document.querySelector('.hero-title'),
    document.querySelector('.hero-bio'),
    document.querySelector('.hero-btns'),
  ];
  heroEls.forEach((el, i) => {
    if (!el) return;
    setTimeout(() => {
      el.style.transition = `opacity 1s cubic-bezier(0.22,1,0.36,1) ${i*0.12}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${i*0.12}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  });

  // PHOTO ENTRANCE
  const photo = document.querySelector('.hero-visual');
  if (photo) {
    setTimeout(() => {
      photo.style.transition = 'opacity 1.4s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 1.4s cubic-bezier(0.22,1,0.36,1) 0.5s';
      photo.style.opacity = '1';
      photo.style.transform = 'scale(1)';
    }, 200);
  }

  // SCROLL REVEAL
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .clip-reveal').forEach(el => revealObserver.observe(el));

  // STAGGER GROUPS
  document.querySelectorAll('.stagger-group').forEach(group => {
    const children = group.querySelectorAll('.stagger-child');
    const groupObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 100);
          });
          groupObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    groupObserver.observe(group);
  });

  // TYPING ANIMATION
  const titles = ['Data Engineer', 'Software Developer', 'Full Stack Engineer', 'Problem Solver'];
  let tIdx = 0, cIdx = 0, deleting = false;
  const typingEl = document.getElementById('typing-title');

  function type() {
    if (!typingEl) return;
    const cur = titles[tIdx];
    typingEl.textContent = deleting ? cur.slice(0, --cIdx) : cur.slice(0, ++cIdx);
    if (!deleting && cIdx === cur.length) { setTimeout(() => deleting = true, 2000); }
    else if (deleting && cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % titles.length; }
    setTimeout(type, deleting ? 45 : 85);
  }
  type();

  // COUNTERS
  const counterObs = new IntersectionObserver((entries) => {
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
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

  // 3D CARD TILT
  document.querySelectorAll('.project-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s';
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s';
    });
  });

  // PARALLAX ORBS
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    const o1 = document.querySelector('.orb1');
    const o2 = document.querySelector('.orb2');
    if (o1) o1.style.transform = `translateY(${s * 0.25}px) scale(1)`;
    if (o2) o2.style.transform = `translateY(${-s * 0.15}px) scale(1)`;

    // Back to top
    const btn = document.getElementById('back-to-top');
    if (btn) btn.style.opacity = s > 300 ? '1' : '0';
  });

  // ACTIVE NAV
  const pages = document.querySelectorAll('.page[id]');
  const navLinks = document.querySelectorAll('nav ul a');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.5 });
  pages.forEach(p => navObs.observe(p));

  // SMOOTH SCROLL NAV
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });
  // TOUCH TAP EFFECT FOR MOBILE
if ('ontouchstart' in window) {
  document.querySelectorAll('.project-card, .edu-card, .stat-card, .skill-group').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.style.transition = 'transform 0.2s ease, border-color 0.2s, box-shadow 0.2s';
      card.style.transform = 'scale(0.97)';
      card.style.borderColor = 'rgba(0,255,157,0.4)';
      card.style.boxShadow = '0 8px 32px rgba(0,255,157,0.1)';
    }, { passive: true });

    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s';
        card.style.transform = 'scale(1)';
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }, 150);
    }, { passive: true });
  });
}
});