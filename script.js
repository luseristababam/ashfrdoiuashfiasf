// STARSPORTS GATEWAY CONTROLLER
// Direct user click navigation (no automatic redirect), canvas particles, 3D card tilt

(function () {
  'use strict';

  // 1. Destination Configuration
  const urlParams = new URLSearchParams(window.location.search);
  const destOverride = urlParams.get('dest') || urlParams.get('to') || urlParams.get('url');
  const DEFAULT_DESTINATION = 'https://stariptv.co/';
  const targetUrl = destOverride || DEFAULT_DESTINATION;

  document.addEventListener('DOMContentLoaded', () => {
    // 2. Set targets for direct entry links
    const directLinks = [
      document.getElementById('match-entry-btn'),
      document.getElementById('header-direct-link')
    ];

    directLinks.forEach((link) => {
      if (link) {
        link.href = targetUrl;
      }
    });

    // 3. Floating Golden Shimmer Sparks (Lightweight Canvas)
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      const particles = [];
      const PARTICLE_COUNT = 40;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.6,
          color: Math.random() > 0.35 ? 'rgba(255, 215, 0, ' : 'rgba(255, 245, 200, ',
          alpha: Math.random() * 0.65 + 0.25,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.5 - 0.2,
          glow: Math.random() * 8 + 4
        });
      }

      function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.alpha + ')';
          ctx.shadowColor = '#ffd700';
          ctx.shadowBlur = p.glow;
          ctx.fill();
        }

        requestAnimationFrame(animateParticles);
      }
      animateParticles();
    }

    // 4. Interactive 3D Tilt on Hover for Buttons & Cards
    const interactiveCards = document.querySelectorAll('.cta-btn, .bonus-pill-card');
    interactiveCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(500px) rotateX(${(-y / 18).toFixed(1)}deg) rotateY(${(x / 18).toFixed(1)}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  });
})();
