// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card, .skill-group, .timeline-item, .education-card, .stat-box').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Active nav highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });

  // Back to top button
  const btn = document.getElementById('back-to-top');
  if (btn) btn.style.opacity = window.scrollY > 400 ? '1' : '0';
});

// Typing animation
const titles = ['Data Engineer', 'Software Developer', 'Full Stack Engineer', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-title');

function type() {
  if (!typingEl) return;
  const current = titles[titleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => isDeleting = true, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// Animated counters
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = el.getAttribute('data-target');
      if (!target) return;
      let count = 0;
      const increment = Math.ceil(parseInt(target) / 40);
      const timer = setInterval(() => {
        count += increment;
        if (count >= parseInt(target)) {
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