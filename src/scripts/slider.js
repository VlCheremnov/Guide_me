let mySwiper, options = {
  loop: false,
  // Derection
  direction: 'horizontal',
  // Width slide
  width: 200,
  // Distance between slides
  spaceBetween: 24,
  // Duration of transition between slides (in ms)
  speed: 500
}

if (Swiper) mySwiper = new Swiper ('.swiper-container', options);
