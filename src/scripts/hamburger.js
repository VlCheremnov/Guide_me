import {gsap} from 'gsap';

let tl, menuActive, hamburger, hamburgerItems, menu, menuBefore, title, buttons;

document.addEventListener('DOMContentLoaded', ()=> {
  // Variables
  menuActive = false;
  hamburger = document.querySelector('.hamburger:not(.close)');
  if (!hamburger) return;
  hamburgerItems = document.querySelectorAll('.hamburger__item');
  menu = document.querySelector('header .menu');
  menuBefore = document.querySelector('header .menu__before');
  title = document.querySelectorAll('header .menu__title>*');
  buttons = document.querySelectorAll('header .menu__nav>*');

  let menuToggle = (close = false) => {
    if (close) menuActive = true;
    // Turn off the current animation
    if (tl) tl.kill();
    // Gsap timeline
    tl = gsap.timeline();
    
    
    // Open menu
    if (!menuActive) new MenuAnimation().open();
    // Close menu
    else new MenuAnimation().close();
  };

  // Event click
  hamburger.onclick = () => menuToggle();
  menuBefore.onclick = () => menuToggle(true);
});

/* *** Start of function for menu animation *** */
let MenuAnimation = function () {
  menuActive = !menuActive;
  
  return {
    open: this.openMenu,
    close: this.closeMenu
  };
};

// Open menu
MenuAnimation.prototype.openMenu = function () {
  // Scroll page
  window.scrollTo(0, 0);

  // Turn off scroll
  document.body.style.cssText = 'position: fixed; overflow: hidden';

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
  // Turn on scroll
  document.body.style.cssText = null;

  // Animation
  tl.to(menu, .2, {xPercent: 60, opacity: 0})
    .to(title, .1, {opacity: 0}, 0)
    .to([hamburgerItems[0], hamburgerItems[2]], .15, {y: 0, rotate: 0}, 0)
    .to(hamburgerItems[1], .2, {x: 0, opacity: 1}, 0);

  // Set
  tl.set(menu, {display: 'none'});
};
/* *** End of menu animation function *** */
