import gsap from 'gsap';

export function initCursor() {
  const cur = document.getElementById('cur');
  const curO = document.getElementById('curO');
  const curTxt = document.getElementById('curText');
  let mx = -200, my = -200, ox = -200, oy = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(cur, { x: mx, y: my, duration: 0, overwrite: true });
  });
  gsap.ticker.add(() => {
    ox += (mx - ox) * 0.1; oy += (my - oy) * 0.1;
    gsap.set(curO, { x: ox, y: oy });
    gsap.set(curTxt, { x: ox + 28, y: oy - 8 });
  });

  document.querySelectorAll('video').forEach(v => {
    v.addEventListener('mouseenter', () => document.body.classList.add('on-video'));
    v.addEventListener('mouseleave', () => document.body.classList.remove('on-video'));
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('on-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('on-link'));
  });
}
