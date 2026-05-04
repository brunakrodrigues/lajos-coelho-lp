import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNav() {
  ScrollTrigger.create({
    start: 60,
    onEnter: () => document.getElementById('nav').classList.add('stuck'),
    onLeaveBack: () => document.getElementById('nav').classList.remove('stuck'),
  });

  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  const close = () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };
  const open = () => {
    burger.classList.add('open');
    menu.classList.add('open');
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };

  burger.addEventListener('click', () => {
    burger.classList.contains('open') ? close() : open();
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
