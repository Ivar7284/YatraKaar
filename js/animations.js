/* ============================================
   YatraKaar — Scroll Animations (Intersection Observer)
   ============================================ */

export function initScrollAnimations() {
  // Animate single elements
  const animateElements = document.querySelectorAll('[data-animate]');
  
  if (animateElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.animateDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay, 10));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  // Stagger children
  const staggerContainers = document.querySelectorAll('[data-animate-stagger]');
  
  if (staggerContainers.length) {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    staggerContainers.forEach(el => staggerObserver.observe(el));
  }
}
