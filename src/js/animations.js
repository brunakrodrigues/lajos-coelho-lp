import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './utils.js';

export function initHeroVideo() {
  splitWords(document.getElementById('hvh1'));

  const hvTL = gsap.timeline({ delay: 0.15 });
  hvTL.fromTo('.hv-tag', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power3.out' });
  hvTL.fromTo('#hvh1 .inner', { y: '110%' },
    { y: '0%', duration: 0.95, stagger: 0.055, ease: 'power4.out' }, '-=0.35');
  hvTL.to('#hvsub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
  hvTL.to('#hvbtns', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
  hvTL.to('#hvscroll', { opacity: 1, duration: 0.6 }, '-=0.2');

  gsap.to('.hv-carousel', {
    y: '18%', ease: 'none',
    scrollTrigger: { trigger: '.hv-sec', scrub: 1, end: 'bottom top' }
  });

  const slides = Array.from(document.querySelectorAll('[data-hv-slide]'));
  if (slides.length > 1) {
    slides.forEach(v => { v.play?.().catch(() => {}); });
    let i = 0;
    setInterval(() => {
      const next = (i + 1) % slides.length;
      slides[i].classList.remove('is-active');
      slides[next].classList.add('is-active');
      slides[next].currentTime = 0;
      slides[next].play?.().catch(() => {});
      i = next;
    }, 4000);
  }
}

export function initHeroSplit() {
  splitWords(document.getElementById('hh1'));

  const heroST = { trigger: '#hero-split', start: 'top 72%' };

  gsap.fromTo('#htag', { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: heroST });

  gsap.fromTo('#hh1 .inner', { y: '110%' },
    { y: '0%', duration: 0.9, stagger: 0.06, ease: 'power4.out', delay: 0.18,
      scrollTrigger: heroST });

  gsap.to(['#hsub', '#hbtns'], { opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
    ease: 'power3.out', delay: 0.4, scrollTrigger: heroST });

  gsap.to('#heroVidWrap', { clipPath: 'inset(0 0 0% 0 round 24px)', duration: 1.2,
    ease: 'power4.inOut', delay: 0.2, scrollTrigger: heroST });

  gsap.to('#hbadge1', { opacity: 1, x: 0, duration: 0.7, ease: 'back.out(1.4)',
    delay: 0.65, scrollTrigger: heroST });

  gsap.to('#hbadge2', { opacity: 1, x: 0, duration: 0.7, ease: 'back.out(1.4)',
    delay: 0.65, scrollTrigger: heroST });

  gsap.to('#scue', { opacity: 1, duration: 0.8, delay: 0.9, scrollTrigger: heroST });

  ScrollTrigger.create({
    trigger: '#hero-split', start: 'top 72%', once: true,
    onEnter: () => gsap.to({ v: 0 }, {
      v: 200, duration: 2, ease: 'power2.out',
      onUpdate: function() {
        const el = document.querySelector('#hbadge1 .hb-val');
        if (el) el.textContent = Math.round(this.targets()[0].v) + '+';
      }
    })
  });

  gsap.to('#heroVidWrap video', {
    y: '15%', ease: 'none',
    scrollTrigger: { trigger: '#hero-split', scrub: 1, end: 'bottom top' }
  });
}

export function initSharedReveals() {
  document.querySelectorAll('.sl').forEach(el => {
    gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  document.querySelectorAll('.sh').forEach(sh => {
    sh.querySelectorAll('.line').forEach((line, i) => {
      gsap.to(line, {
        y: '0%', duration: 0.9, ease: 'power4.out',
        delay: i * 0.08,
        scrollTrigger: { trigger: sh, start: 'top 86%', once: true }
      });
    });
  });
}

export function initAbout() {
  document.querySelectorAll('#stmt-about .line').forEach((line, i) => {
    gsap.to(line, {
      y: '0%', duration: 1, ease: 'power4.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: '#stmt-about', start: 'top 85%', once: true }
    });
  });

  const el = document.getElementById('stmt-about');
  if (el && !el.querySelector('.line')) {
    el.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, '<br>');
    const chunks = el.innerHTML.split('<br>');
    el.innerHTML = chunks.map(c => `<span class="line" style="display:block;overflow:hidden;"><span class="inner" style="display:block;transform:translateY(110%)">${c}</span></span>`).join('');
    el.querySelectorAll('.inner').forEach((inner, i) => {
      gsap.to(inner, { y: '0%', duration: 1, ease: 'power4.out', delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
  }

  gsap.to(['#ap1','#ap2'], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '#ap1', start: 'top 85%', once: true }
  });

  gsap.to('#aboutVidWrap', {
    clipPath: 'inset(0 0 0% 0 round 20px)',
    duration: 1.2, ease: 'power4.inOut',
    scrollTrigger: { trigger: '#aboutVidWrap', start: 'top 80%', once: true }
  });
}

export function initStats() {
  document.querySelectorAll('.cu').forEach(el => {
    const target = +el.dataset.t;
    let obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        el.closest('.stat')?.classList.add('lit');
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: () => el.textContent = Math.round(obj.val)
        });
      }
    });
  });
}

export function initStatementCards() {
  document.querySelectorAll('#ab2-stmt .line').forEach((line, i) => {
    gsap.fromTo(line,
      { y:'110%' },
      { y:'0%', duration:0.9, ease:'power4.out', delay: i * 0.08,
        scrollTrigger:{ trigger:'#ab2-stmt', start:'top 80%', once: true } });
  });

  gsap.to(['#ab2p1','#ab2p2'], {
    opacity:1, y:0, duration:0.8, stagger:0.15, ease:'power3.out',
    scrollTrigger:{ trigger:'#ab2p1', start:'top 82%', once: true }
  });

  ScrollTrigger.create({
    trigger: '.ab2-cards',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      ['#ab2c1','#ab2c2','#ab2c3'].forEach((id, i) => {
        const el = document.querySelector(id);
        if (!el) return;
        gsap.to(el, { opacity:1, y:0, duration:0.75, ease:'power3.out', delay: i * 0.15 });
        setTimeout(() => el.classList.add('lit'), 600 + i * 180);
      });
    }
  });
}

export function initMvv() {
  ScrollTrigger.create({
    trigger: '#mvv .mvv-grid', start: 'top 78%', once: true,
    onEnter: () => {
      ['#mvvc1','#mvvc2','#mvvc3'].forEach((id, i) => {
        gsap.to(id, { opacity:1, y:0, duration:0.85, ease:'power3.out', delay: i * 0.15 });
      });
    }
  });

  ScrollTrigger.create({
    trigger: '#mvvc3', start: 'top 80%', once: true,
    onEnter: () => {
      document.querySelectorAll('#mvvVals .mvv-val-pill').forEach((pill, i) => {
        gsap.to(pill, { opacity:1, y:0, duration:0.55, ease:'power3.out', delay: i * 0.08 + 0.4 });
      });
    }
  });
}

export function initServices() {
  const track = document.getElementById('hsrvTrack');
  const outer = document.getElementById('hsrvOuter');
  const hint = document.getElementById('hsrvHint');

  function getScrollWidth() {
    return track.scrollWidth - window.innerWidth;
  }

  gsap.to(track, {
    x: () => -getScrollWidth(),
    ease: 'none',
    scrollTrigger: {
      trigger: outer,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      end: () => '+=' + getScrollWidth(),
      onEnter: () => gsap.to(hint, { opacity: 1, duration: 0.5, delay: 0.3 }),
    }
  });

  ScrollTrigger.create({
    trigger: outer, start: 'top top', once: true,
    onEnter: () => {
      gsap.utils.toArray('.srv-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 + i * 0.07 }
        );
      });
    }
  });
}

export function initVideoShowcase() {
  const vsVid = document.getElementById('vsVid');
  gsap.fromTo(vsVid,
    { y: '-12%' },
    { y: '12%', ease: 'none',
      scrollTrigger: { trigger: '#vidShowcase', scrub: 1 } });

  gsap.fromTo('#vstag', { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#vidShowcase', start: 'top 70%', once: true } });

  document.querySelectorAll('#vsh .line').forEach((line, i) => {
    gsap.to(line, { y: '0%', duration: 1, ease: 'power4.out', delay: i * 0.12,
      scrollTrigger: { trigger: '#vsh', start: 'top 70%', once: true } });
  });
}

export function initBrandVideo() {
  gsap.to('#bvVid', {
    clipPath: 'inset(0 0% 0 0 round 20px)',
    duration: 1.2, ease: 'power4.inOut',
    scrollTrigger: { trigger: '#bvVid', start: 'top 80%', once: true }
  });
  gsap.to(['#bvp','#bvbtn'], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '#bvp', start: 'top 85%', once: true }
  });
}

export function initProcess() {
  const steps = document.querySelectorAll('.proc-step');
  const fill = document.getElementById('procLineFill');
  const wrap = document.getElementById('procWrap');

  ScrollTrigger.create({
    trigger: wrap, start: 'top 80%', end: 'bottom 50%', scrub: true,
    onUpdate: (self) => {
      fill.style.height = (self.progress * 100) + '%';
      steps.forEach((step, i) => {
        const stepProgress = self.progress * steps.length;
        step.classList.toggle('active', i <= Math.floor(stepProgress));
      });
    }
  });

  steps.forEach((step, i) => {
    gsap.fromTo(step,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        delay: i * 0.05
      });
  });
}

export function initCta() {
  document.querySelectorAll('#ctash .line').forEach((line, i) => {
    gsap.to(line, { y: '0%', duration: 0.9, ease: 'power4.out', delay: i * 0.1,
      scrollTrigger: { trigger: '#ctash', start: 'top 85%', once: true } });
  });
  gsap.to(['#ctasub','#ctabtns'], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '#ctasub', start: 'top 85%', once: true }
  });
}
