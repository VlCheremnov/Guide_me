import { gsap } from 'gsap';
import Swiper from 'swiper';

// Main slider options
let slider_options = {
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
// End options

// Slide list
let slideList = [
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour1.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'},
  {img:'/img/tour2.jpg', title:'Треккинг вокруг Монблана. Доломитовые Альпы'}
];

let indexCurrentButton = 0;

document.addEventListener('DOMContentLoaded', () => {
  let buttons = document.querySelectorAll('.type-tour__item');
  if (!buttons || buttons.length == 0) return;
  let slider = document.querySelector('.slider');

  // Create first list
  new CreateTourList(slideList);

  buttons.forEach((item, index) => {
    // Item click
    item.onclick = () => {

      if (item.classList.contains('active')) return; 

      // Remove class all button
      buttons.forEach((itemRmClass) => {
        itemRmClass.classList.remove('active');
      });
      
      // Added class
      item.classList.add('active');

      indexCurrentButton = index;

      // Create new list
      new CreateTourList(slideList, item);
    };
  });
});

// Create tour list
function CreateTourList (options, button) {
  if (!options) return;
  let list, newSlider;

  this.tl = gsap.timeline();
  this.button = button;

  this.slideList = slideList;

  // Current slider
  this.currentSlider = document.querySelector('.slider');

  // Create slider
  this.newSlider = newSlider = document.createElement('div');
  // Create list items
  this.list = list = document.createElement('div');
  // Added class
  this.newSlider.className = 'slider container swiper-container';
  this.list.className = 'slider__wrapper swiper-wrapper';

  this.addedSlider();
};

CreateTourList.prototype = {
  // List filling
  listFilling: function () {
    // Added item
    this.slideList.forEach((item) => {
      
      this.list.innerHTML += `
        <div class="slider__card swiper-slide">
          <img src="${item.img}" alt="tour" class="slider__card-image">
          <h3 class="slider__card-title">${indexCurrentButton + 1} - ${item.title}</h3>
        </div>
      `
    }, this);

    // Adding a list to the slider
    this.newSlider.append(this.list);
  },

  // Animation & Adding slider to the DOM
  addedSlider: function () {
    // Variable
    let parentSlider = document.querySelector('.tour-section');
    let currentSlider = this.currentSlider;
    let newSlider = this.newSlider;
    let button = this.button;

    newSlider.style.display = 'none';
    // Added new slider
    parentSlider.prepend(newSlider);
    
    if (currentSlider) {
      // Hide old slider
      this.tl
        .set(currentSlider, {opacity: 1})
        .to(currentSlider, .2, {opacity: 0});

      // List filling
      this.listFilling();

      // Show new slider
      this.tl
        .set(newSlider, {opacity: 0, onComplete: () => {
          // Remove old slider
          currentSlider.remove();
          newSlider.style.display = null;
          // Swiper initialization
          new Swiper ('.slider.swiper-container', slider_options);
        }})
        .to(newSlider, .2, {opacity: 1});
    } else {
      // First load
      newSlider.style.display = null;
      this.listFilling();
      parentSlider.prepend(newSlider);
      new Swiper ('.slider.swiper-container', slider_options);
    };
  }
};