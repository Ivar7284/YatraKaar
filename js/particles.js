/* ============================================
   YatraKaar — Golden Particle System
   ============================================ */

export function initParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -(Math.random() * 0.5 + 0.1);
      this.opacity = Math.random() * 0.6 + 0.1;
      this.fadeSpeed = Math.random() * 0.003 + 0.001;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      // Gold color variations
      const hue = 38 + Math.random() * 15;
      const sat = 60 + Math.random() * 30;
      const light = 55 + Math.random() * 25;
      this.color = `hsla(${hue}, ${sat}%, ${light}%,`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += this.pulseSpeed;
      
      const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.15;
      
      // Reset if out of bounds
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 10;
      }

      return Math.max(0, pulseOpacity);
    }

    draw(currentOpacity) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + currentOpacity + ')';
      ctx.fill();
      
      // Glow effect
      if (this.size > 1.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color + (currentOpacity * 0.15) + ')';
        ctx.fill();
      }
    }
  }

  // Create particles - fewer on mobile for performance
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 30 : 60;
  
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(particle => {
      const opacity = particle.update();
      particle.draw(opacity);
    });

    animationId = requestAnimationFrame(animate);
  }

  // Only animate if user doesn't prefer reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (!prefersReducedMotion.matches) {
    animate();
  }

  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, width, height);
    } else {
      animate();
    }
  });

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else if (!prefersReducedMotion.matches) {
      animate();
    }
  });
}
