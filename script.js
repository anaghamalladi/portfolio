// ============================================
// SMOOTH SCROLL (Lenis - lightweight library)
// ============================================
document.documentElement.style.scrollBehavior = 'auto';

let scrollY = 0;
let targetScrollY = 0;
let ease = 0.08;

function smoothScroll() {
  targetScrollY += (window.scrollY - targetScrollY) * ease;
  requestAnimationFrame(smoothScroll);
}

// ============================================
// SCROLL TRIGGER - Intersection Observer
// ============================================
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============================================
// STAGGER ANIMATIONS
// ============================================
function initStagger() {
  // Hero stagger
  const heroElements = document.querySelectorAll('.greeting, h1, .hero-content h2, .bio, .hero-btns');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.9s ease-out ${i * 0.12}s, transform 0.9s ease-out ${i * 0.12}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });

  // Photo animation
  const photo = document.querySelector('.photo-wrapper');
  if (photo) {
    photo.style.opacity = '0';
    photo.style.transform = 'scale(0.9) translateY(20px)';
    photo.style.transition = 'opacity 1.2s ease-out 0.6s, transform 1.2s ease-out 0.6s';
    setTimeout(() => {
      photo.style.opacity = '1';
      photo.style.transform = 'scale(1) translateY(0)';
    }, 100);
  }

  // Section titles stagger
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('stagger-item');
    scrollObserver.observe(el);
  });

  // Timeline items stagger
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    el.classList.add('stagger-item');
    scrollObserver.observe(el);
  });

  // Project cards stagger
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    el.classList.add('stagger-item');
    scrollObserver.observe(el);
  });

  // Skill groups stagger
  document.querySelectorAll('.skill-group').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    el.classList.add('stagger-item');
    scrollObserver.observe(el);
  });

  // Stat boxes stagger
  document.querySelectorAll('.stat-box').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    el.classList.add('stagger-item');
    scrollObserver.observe(el);
  });

  // About text paragraphs
  document.querySelectorAll('.about-text p').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    el.classList.add('stagger-item');
    scrollObserver.observe(el);
  });

  // Education cards
  document.querySelectorAll('.education-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    el.classList.add('stagger-item');
    scrollObserver.observe(el);
  });
}

// ============================================
// PARALLAX
// ============================================
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Orbs parallax
    const orb1 = document.querySelector('.orb1');
    const orb2 = document.querySelector('.orb2');
    const orb3 = document.querySelector('.orb3');
    if (orb1) orb1.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (orb2) orb2.style.transform = `translateY(${scrolled * -0.2}px)`;
    if (orb3) orb3.style.transform = `translateY(${scrolled * 0.15}px)`;

    // Hero content parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroContent.style.opacity = `${1 - scrolled / 600}`;
    }
  });
}

// ============================================
// 3D CARD TILT
// ============================================
function initTilt() {
  document.querySelectorAll('.project-card, .education-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      card.style.boxShadow = `0 20px 60px rgba(0,255,157,0.12)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });
}

// ============================================
// TYPING ANIMATION
// ============================================
function initTyping() {
  const titles = ['Data Engineer', 'Software Developer', 'Full Stack Engineer', 'Problem Solver'];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typing-title');
  if (!typingEl) return;

  function type() {
    const current = titles[titleIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => isDeleting = true, 1800);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
    setTimeout(type, isDeleting ? 50 : 90);
  }
  type();
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
          } else {
            el.textContent = count + '+';
          }
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// ACTIVE NAV
// ============================================
function initNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });

    // Back to top
    const btn = document.getElementById('back-to-top');
    if (btn) btn.style.opacity = window.scrollY > 400 ? '1' : '0';
  });

  // Smooth scroll for nav links
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ============================================
// CURSOR GLOW
// ============================================
function initCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-glow');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// ============================================
// INIT ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initStagger();
  initParallax();
  initTilt();
  initTyping();
  initCounters();
  initNav();
  initCursor();
});