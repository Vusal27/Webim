// Бургер меню //
var navBurger = document.querySelector('.nav__burger');
 navBurger.addEventListener('click', toggleClass);
  function toggleClass() {
      navBurger.classList.toggle("nav__burger--active");
  }