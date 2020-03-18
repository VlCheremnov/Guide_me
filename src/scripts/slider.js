import Swiper from 'swiper';

// Days slider options
let days_options = {
  loop: false,
  // 	Slides will not have fixed positions
  freeMode: true,
  freeModeMomentum: true,
  freeModeMomentumRatio: 1.3,
  // Derection
  direction: 'horizontal',
  // Width slide
  width: 76,
  // Distance between slides
  spaceBetween: 11,
  // Duration of transition between slides (in ms)
  speed: 500
};
// End options
document.addEventListener('DOMContentLoaded', ()=> {
  // Initialize the slider
  new Swiper ('.days.swiper-container', days_options);
})


