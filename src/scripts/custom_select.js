document.addEventListener('DOMContentLoaded', ()=> {
  // Variable
  let selects_menu = document.querySelectorAll('select[custom]');
  let inputs = document.querySelectorAll('.field.block');
  let blocker = document.querySelector('.blocker');
  let select, custom_selects = [];
  
  // Added custom menu
  selects_menu.forEach((select, i) => {
    // Create a custom menu for each select 
    custom_selects.push(new CreateCustomSelect(select));
  });

  // Close the menu if the target is not on the select menu or input
  document.onclick = (e) => {
    if (e.target.closest('.custom-select') || e.target.closest('.field.block')) return;
    
    custom_selects.forEach((select, i) => {
      select.closeMenu();
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
    e.preventDefault();
    
    if (e.keyCode == 13) {
      // Input blur
      document.querySelectorAll('input').forEach((item, i) => {
        item.blur();
      });

      // Close menu
      custom_selects.forEach((select, i) => {
        select.closeMenu();
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
  if (select.hasAttribute('type')) {
    this.select_type = select.getAttribute('type');
    select.removeAttribute('type');
  } else this.select_type = 'button';

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
  let custom_select, custom_menu, field, field_title;

  this.custom_select = custom_select = document.createElement('div');
  this.custom_menu = custom_menu = document.createElement('div');
  this.field = field = document.createElement('div');
  this.field_wrapper = field_wrapper = document.createElement('div');

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

  if (this.select_type == 'input') {
    this.field_title = field_title = document.createElement('input');
    this.field_placeholder = field_placeholder = document.createElement('div');
    this.field_currency = '₽';

    this.field_title.oninput = this.validNumber.bind(this)
    field.onclick = this.openMenu.bind(this, false);
  } else {
    this.field_title = field_title = document.createElement('span');

    field.onclick = this.toggleMenu.bind(this, false);
  }
  
  // Create field
  this.createField();

  // Adding menu
  this.addingMenu();
};

CreateCustomSelect.prototype = {
  // validNumber
  validNumber: function (e) {
    // Length value
    let length = this.field_title.value.length;

    if ((!e && length > 2) || (e && e.data)) {
      // Replace
      this.field_title.value = this.field_title.value
        .replace(/\D/ig, '')
        .replace(/(\d*)/i, `$1 ${this.field_currency}`);

    } else if (length < 3) this.field_title.value = ''; // value length < 3
  },

  getCaretPos: function (obj) {

    if(obj.selectionStart) return obj.selectionStart;
    else if (document.selection) {
      var sel = document.selection.createRange();
      var clone = sel.duplicate();
      sel.collapse(true);
      clone.moveToElementText(obj);
      clone.setEndPoint('EndToEnd', sel);
      return clone.text.length;
    };
  
    return 0;
  },

  // Create field
  createField: function () {
    // Added class
    this.custom_select.className = `custom-select ${this.select.className}`;
    this.field.classList.add('field');
    this.field_class.forEach(this.addedClass.bind(this));
    this.field_title.classList.add(`field__content`);
    this.field_wrapper.classList.add(`field__wrapper`);

    // Title content
    if (this.select_type == 'input') {
      this.field_title.setAttribute('required', 'required');
      this.field_title.setAttribute('type', 'text');
      this.field_placeholder.classList.add('field__placeholder')
      this.field_placeholder.innerHTML = this.select_title;
      this.field_wrapper.append(this.field_placeholder);
    } else this.field_title.innerHTML = this.select_title;
    
    this.createIcon();

    // Build the field
    this.field_wrapper.prepend(this.field_title);
    this.field.prepend(this.field_wrapper);
    this.custom_select.append(this.field);
  },
  
  addedClass: function (field_class) {
    this.field.classList.add(`field_${field_class.replace(/\s/g, '')}`);
  },

  // Create icon
  createIcon: function () {
    if (this.select_icon){
      let icon = document.createElement('div');

      icon.classList.add(`field__icon-wrapper`);
      icon.innerHTML = `<img class="field__icon" src="${this.select_icon}" alt="icon">`;

      this.field.append(icon);
    }
  },

  // Adding menu
  addingMenu: function () {
    this.custom_menu.classList.add(`custom-select__menu`);

    if (this.select_type == 'input') this.custom_menu.onclick = this.customMenuClick.bind(this);
  
    // Adding item to custom menu
    this.select_items.forEach(this.addingItems.bind(this));

    // Adding to the DOM
    this.custom_select.append(this.custom_menu);
    this.select.before(this.custom_select);
  },

  customMenuClick: function (e) {
    if (e.target.closest('.custom-select__item')) return;
    this.closeMenu.bind(this)();
  },

  // Adding items to the menu
  addingItems: function (item, i) {
    // Create element
    let custom_item = document.createElement('div');
    custom_item.classList.add(`custom-select__item`);
    custom_item.setAttribute('value', item.getAttribute('value'));
    custom_item.setAttribute('label', item.getAttribute('label'));
    custom_item.innerHTML = `<span class="custom-select__title">${item.getAttribute('label')}</span>`;

    if (this.select_type == 'input' && i == 0) {
      this.setSelect(custom_item);
    }

    custom_item.onclick = this.setSelect.bind(this, custom_item);

    // Adding
    this.custom_menu.append(custom_item);
  },

  // Set select value
  setSelect: function (item, e) {
    let value = item.getAttribute('value');
    let label = item.getAttribute('label');
    this.select.querySelector(`option[value="${value}"]`).selected = true;

    let allItems = this.custom_menu.querySelectorAll('.custom-select__item');

    allItems.forEach((menu_item, i) => {
      menu_item.classList.remove('active');
    });

    item.classList.add('active');

    if (this.select_type == 'button') {
      this.field_title.innerHTML = label;
      this.toggleMenu(true);
    } else {
      this.field_currency = label;
      this.validNumber();
      this.field_title.focus();
    }
  },

  toggleMenu: function (close = false) {
    if (this.custom_menu.style.display != 'none' || close) {
      setTimeout(this.closeMenu.bind(this), 200);
    }
    else {
      this.openMenu();
    }
  },

  closeMenu: function () {
    this.custom_menu.style.display = 'none';
    this.blocker.style.display = 'none';
    this.custom_select.style.zIndex = '';
    this.field.querySelector('.field__icon').classList.remove('active');
  },

  openMenu: function () {
    this.custom_menu.style.display = 'flex';
    this.blocker.style.display = 'block';
    this.custom_select.style.zIndex = 100;
    this.field.querySelector('.field__icon').classList.add('active');
  }
};
