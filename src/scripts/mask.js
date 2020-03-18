import IMask from 'imask';

document.addEventListener('DOMContentLoaded', ()=> {
  let phone = document.getElementById('phone-mask');

  if (phone) {
    let phoneMask = phone.getAttribute('data-mask') || '+{7}(000)000-00-00';

    IMask(phone, {
      mask: phoneMask
    });
  }
})