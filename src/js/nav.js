import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNav() {
  ScrollTrigger.create({
    start: 60,
    onEnter: () => document.getElementById('nav').classList.add('stuck'),
    onLeaveBack: () => document.getElementById('nav').classList.remove('stuck'),
  });
}
