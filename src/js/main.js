import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../css/main.css';

import { initCursor } from './cursor.js';
import { initNav } from './nav.js';
import {
  initHeroVideo,
  initHeroSplit,
  initSharedReveals,
  initAbout,
  initStats,
  initStatementCards,
  initMvv,
  initServices,
  initVideoShowcase,
  initBrandVideo,
  initProcess,
  initCta,
} from './animations.js';
import {
  initMagneticButtons,
  initTiltCards,
  initLazyVideos,
} from './interactions.js';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
gsap.defaults({ overwrite: 'auto' });

initCursor();
initNav();
initHeroVideo();
initHeroSplit();
initSharedReveals();
initAbout();
initStats();
initStatementCards();
initMvv();
initServices();
initVideoShowcase();
initBrandVideo();
initProcess();
initCta();
initMagneticButtons();
initTiltCards();
initLazyVideos();
