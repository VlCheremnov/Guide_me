import { gsap } from 'gsap';

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
]

window.addEventListener('load', () => {
  let buttons = document.querySelectorAll('.type-tour__item');
  let slider = document.querySelector('.slider');

  new CreateTourList(slideList);

  buttons.forEach((item) => {
    // Item click
    item.onclick = () => {

      // Remove class all button
      buttons.forEach((itemRmClass) => {
        itemRmClass.classList.remove('active');
      });

      // Add class active
      item.classList.add('active');

      new CreateTourList(slideList);
    };
  });
});

// Create tour list
function CreateTourList (slideList) {
  if (!options) return;
  let list;

  this.slideList = slideList;

  // Create list items
  this.list = list = document.createElement('div');
  // Added class
  this.list.className = 'slider__wrapper swiper-wrapper'

  this.listFilling();
};

CreateTourList.prototype = {
  listFilling: function () {

    this.slideList.forEach(() => {
      
    }, this)

    // <div class="slider__card swiper-slide">
    //   <!-- Card image -->
    //   <img src="/img/{{item.img}}" alt="tour" class="slider__card-image">

    //   <!-- Card title -->
    //   <h3 class="slider__card-title">{{ item.title }}</h3>
    // </div>
  }
};