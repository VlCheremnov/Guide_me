import { gsap } from 'gsap';

let tl, menuActive, hamburger, hamburgerItems, menu, title, buttons;

window.onload = () => {
  // Variables
  menuActive = false;
  hamburger = document.querySelector('.hamburger:not(.close)');
  hamburgerItems = document.querySelectorAll('.hamburger__item');
  menu = document.querySelector('header .menu');
  title = document.querySelectorAll('header .menu__title>*');
  buttons = document.querySelectorAll('header .menu__nav>*');

  // Event click
  hamburger.onclick = () => {
    // Turn off the current animation
    if (tl) tl.kill();
    // Gsap timeline
    tl = gsap.timeline();
    
    // Scroll page
    window.scrollTo(0, 0);

    if (!menuActive) {  // Open menu
      // Turn off scroll
      document.body.style.cssText = 'position: fixed; overflow: hidden';

      // Menu animation
      new MenuAnimation().open();
    } else {  // Close menu
      // Turn on scroll
      document.body.style.cssText = null;

      // Menu animation
      new MenuAnimation().close();
    };

    menuActive = !menuActive;
  }
};

/* *** Start of function for menu animation *** */
let MenuAnimation = function () {
  return {
    open: this.openMenu,
    close: this.closeMenu
  };
};

// Open menu
MenuAnimation.prototype.openMenu = function () {
  // Set
  tl.set(menu, {xPercent: 60, opacity: 0, display: 'flex'}, 0)
    .set(title, {opacity: 0}, 0)
    .set(buttons, {opacity: 0}, 0);

  // Animation
  tl.to(menu, .2, {xPercent: 0, opacity: 1}, 0)
    .to(title, .2, {opacity: 1}, .07)
    .to(buttons, .2, {opacity: 1, stagger: 0.02}, .14)
    .to(hamburgerItems[0], .15, {y: 7, rotate: 45}, 0)
    .to(hamburgerItems[2], .15, {y: -7, rotate: -45}, 0)
    .to(hamburgerItems[1], .2, {x: 10, opacity: 0}, 0);
};

// Close menu
MenuAnimation.prototype.closeMenu = function () {
  // Animation
  tl.to(menu, .2, {xPercent: 60, opacity: 0})
    .to(title, .1, {opacity: 0}, 0)
    .to([hamburgerItems[0], hamburgerItems[2]], .15, {y: 0, rotate: 0}, 0)
    .to(hamburgerItems[1], .2, {x: 0, opacity: 1}, 0);

  // Set
  tl.set(menu, {display: 'none'});
};
/* *** End of menu animation function *** */
