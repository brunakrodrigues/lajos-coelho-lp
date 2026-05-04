import gsap from 'gsap';

export function initMagneticButtons() {
  document.querySelectorAll('.mag').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });
}

export function initTiltCards() {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: x * 12, rotateX: -y * 8,
        duration: 0.5, ease: 'power2.out',
        transformPerspective: 1000
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1,0.6)' });
    });
  });
}

export function initLazyVideos() {
  const lazyVids = document.querySelectorAll('[data-lazy-video]');
  if ('IntersectionObserver' in window) {
    const vidObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const v = entry.target;
          v.load();
          v.play().catch(() => {});
          vidObs.unobserve(v);
        }
      });
    }, { rootMargin: '200px' });
    lazyVids.forEach(v => vidObs.observe(v));
  } else {
    lazyVids.forEach(v => { v.load(); v.play().catch(() => {}); });
  }
}
