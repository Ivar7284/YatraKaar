/* ============================================
   YATRAKAAR — Main JavaScript
   Premium Animations & Interactions
   ============================================ */

// --- Preloader ---
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }, 800);
  }
});

// --- Navbar Scroll & Hide/Show ---
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (navbar) {
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > 150) {
      if (currentScroll > lastScroll) {
        navbar.classList.add('hide-nav');
      } else {
        navbar.classList.remove('hide-nav');
      }
    } else {
      navbar.classList.remove('hide-nav');
    }
  }

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    if (currentScroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  lastScroll = currentScroll;
});

// --- Mobile Navigation ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// --- Back to Top Click ---
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after reveal for performance
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Floating Particles ---
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
    particle.style.opacity = '0';

    container.appendChild(particle);
  }
}

createParticles();

// --- Counter Animation with Easing ---
function animateCounters() {
  const counters = document.querySelectorAll('.hero-stat-number, .stat-number, .counter-value');

  counters.forEach(counter => {
    const text = counter.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    const duration = 2000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);

      counter.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

animateCounters();

// --- Smooth Section Linking ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Parallax Effect for Hero ---
const heroImg = document.querySelector('.hero-bg img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
    }
  });
}

// --- Dynamic 3D Tilt Effect with Glow ---
document.querySelectorAll('.dest-card, .service-card, .team-card, .why-card, .value-card, .package-card').forEach(card => {
  // Ensure we have a tilt-glow element
  let glow = card.querySelector('.tilt-glow');
  if (!glow && (card.classList.contains('dest-card') || card.classList.contains('team-card') || card.classList.contains('package-card'))) {
    glow = document.createElement('div');
    glow.classList.add('tilt-glow');
    card.appendChild(glow);
  }

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set variables for radial gradient glow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px rgba(230, 184, 79, 0.15)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// --- Magnetic Button Effect ---
document.querySelectorAll('.magnetic-btn-wrap').forEach(wrap => {
  const btn = wrap.querySelector('.btn');
  if (!btn) return;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Move wrapper slightly (magnetic pull), move button within wrapper
    wrap.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = '';
    btn.style.transform = '';
  });
});

// --- Image Lazy Loading with Premium Fade-in ---
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const handleLoad = () => {
          img.style.opacity = '1';
        };

        img.addEventListener('load', handleLoad);
        if (img.complete) {
          handleLoad();
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px 0px 100px 0px'
  });

  lazyImages.forEach(img => imgObserver.observe(img));
}

// --- Cursor Glow Effect ---
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(230, 184, 79, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  transition: transform 0.1s ease, opacity 0.3s ease;
  opacity: 0;
  transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
  cursorGlow.style.opacity = '1';
  
  // Set root CSS variables for radial gradient effects on background
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

console.log('🕉️ Yatrakaar — Sacred Journeys, Crafted with Devotion');
