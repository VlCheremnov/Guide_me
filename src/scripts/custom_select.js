window.addEventListener('load', ()=> {
  // Variable
  let selects_menu = document.querySelectorAll('select[custom]');
  let inputs = document.querySelectorAll('.input.block');
  let blocker = document.querySelector('.blocker');
  let select, custom_selects = [];
  
  // Added custom menu
  selects_menu.forEach((select, i) => {
    // Create a custom menu for each select 
    custom_selects.push(new CreateCustomSelect(select));
  });

  // Close the menu if the target is not on the select menu or input
  document.onclick = (e) => {
    if (e.target.closest('.custom-select') || e.target.closest('.input.block')) return;

    custom_selects.forEach((select, i) => {
      select.toggleMenu(true);
    });
  };

  // Adding/removal a blocker at the input focus/blur
  inputs.forEach((item, i) => {
    // Focus
    item.querySelector('input').onfocus = () => {
      blocker.style.display = 'block';
      item.style.zIndex = 100;
    };

    // Blur
    item.querySelector('input').onblur = () => {
      blocker.style.display = 'none';
      item.style.zIndex = 0;
    };
  });

  // When you press enter
  window.onkeyup = (e) => { 
    if (e.keyCode == 13) {

      // Input blur
      inputs.forEach((item, i) => {
        item.querySelector('input').blur();
      });

      // Close menu
      custom_selects.forEach((select, i) => {
        select.toggleMenu(true);
      });
    }
  };
});
  

function CreateCustomSelect (select = null) {
  if (!select) return;
  select.removeAttribute('custom');

  // Hide select
  select.style.display = 'none';

  // Type
  if (select.hasAttribute('type')) this.select_type = select.getAttribute('type');
  else this.select_type = 'button';

  // Icon
  if (select.hasAttribute('icon')) {
    this.select_icon = select.getAttribute('icon');
    select.removeAttribute('icon');
  };

  // Field class
  if (select.hasAttribute('field-class')) {
    this.field_class = select.getAttribute('field-class').split(',');
    select.removeAttribute('field-class');
  };

  // Create element
  let custom_select, custom_menu, button, button_title;

  this.custom_select = custom_select = document.createElement('div');
  this.custom_menu = custom_menu = document.createElement('div');
  this.button = button = document.createElement('div');
  this.button_title = button_title = document.createElement('span');
  this.button_wrapper = button_wrapper = document.createElement('span');

  // Hide custom menu
  this.custom_menu.style.display = 'none';

  // This select
  this.select = select;
  // Select items
  this.select_items = select.querySelectorAll('option');
  // Select title
  this.select_title = select.getAttribute('title');

  // Blocker
  this.blocker = document.querySelector('.blocker')

  // Event button click
  button.onclick = this.toggleMenu.bind(this, false);
  
  // Create button
  if (this.select_type == 'button') this.createButton();

  // Adding menu
  this.addingMenu();
};

CreateCustomSelect.prototype = {
  // Create button
  createButton: function () {
    // Added class
    this.custom_select.className = `custom-select ${this.select.className}`;
    this.button.classList.add('field');
    this.field_class.forEach(this.addedClass.bind(this));
    this.button_title.classList.add(`field__content`);
    this.button_wrapper.classList.add(`field__wrapper`);

    // Title content
    this.button_title.innerHTML = this.select_title;
    
    this.createIcon();

    // Build the button
    this.button_wrapper.append(this.button_title);
    this.button.prepend(this.button_wrapper);
    this.custom_select.append(this.button);
  },
  
  addedClass: function (field_class) {
    this.button.classList.add(`field_${field_class.replace(/\s/g, '')}`);
  },

  // Create icon
  createIcon: function () {
    if (this.select_icon){
      let icon = document.createElement('div');

      icon.classList.add(`field__icon-wrapper`);
      icon.innerHTML = `<img class="field__icon" src="${this.select_icon}" alt="icon">`;

      this.button.append(icon);
    }
  },

  // Adding menu
  addingMenu: function () {
    this.custom_menu.classList.add(`custom-select__menu`);
  
    // Adding item to custom menu
    this.select_items.forEach(this.addingItems.bind(this));

    // Adding to the DOM
    this.custom_select.append(this.custom_menu);
    this.select.before(this.custom_select);
  },

  // Adding items to the menu
  addingItems: function (item, i) {
    // Create element
    let custom_item = document.createElement('div');
    custom_item.classList.add(`custom-select__item`);
    custom_item.setAttribute('value', item.getAttribute('value'));
    custom_item.setAttribute('label', item.getAttribute('label'));
    custom_item.innerHTML = `<span class="custom-select__title">${item.getAttribute('label')}</span>`;

    custom_item.onclick = this.setSelect.bind(this, custom_item);

    // Adding
    this.custom_menu.append(custom_item);
  },

  setSelect: function (item, e) {
    let value = item.getAttribute('value');
    let label = item.getAttribute('label');
    this.select.querySelector(`option[value="${value}"]`).selected = true;
    this.button_title.innerHTML = label;

    let allItems = this.custom_menu.querySelectorAll('.custom-select__item');

    allItems.forEach((menu_item, i) => {
      menu_item.classList.remove('active');
    });

    item.classList.add('active');

    this.toggleMenu(true);
  },

  toggleMenu: function (close = false) {
    if (this.custom_menu.style.display != 'none' || close) {
      this.custom_menu.style.display = 'none';
      this.blocker.style.display = 'none';
      this.custom_select.style.zIndex = '';
      this.button.querySelector('.field__icon').classList.remove('active');
    }
    else {
      this.custom_menu.style.display = 'flex';
      this.blocker.style.display = 'block';
      this.custom_select.style.zIndex = 100;
      // this.select_icon.classList.remove('active');
      this.button.querySelector('.field__icon').classList.add('active');
    }
  }
};