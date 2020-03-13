let mySwiper, days_options, slider_options;

slider_options = {
  loop: false,
  // Derection
  direction: 'horizontal',
  // Width slide
  width: 200,
  // Distance between slides
  spaceBetween: 24,
  // Duration of transition between slides (in ms)
  speed: 500
};

days_options = {
  loop: false,
  // 	Slides will not have fixed positions
  freeMode: true,
  freeModeMomentum: true,
  freeModeMomentumRatio: 1.3,
  // Derection
  direction: 'horizontal',
  // Width slide
  width: 74,
  // Distance between slides
  spaceBetween: 10,
  // Duration of transition between slides (in ms)
  speed: 500
};

if (Swiper) {
  new Swiper ('.slider.swiper-container', slider_options);
  new Swiper ('.days.swiper-container', days_options);
};
