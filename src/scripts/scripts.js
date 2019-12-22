import Popup from '../css/popup/popup';
import Overlay from '../css/overlay/overlay';
import Button from './button';

const buttonAutorization = document.getElementById("header__button_auto");
const popupLogin = document.getElementById("popup__login");
const popupReg = document.getElementById("popup__reg");
const linkToReg = document.getElementById("popup__link-to-reg");
const linkToLogin = document.getElementById("popup__link-to-login");
const mobileMenu = document.getElementById("header__mobile-menu");
const mobileMenuBack = document.getElementById("header__mobile-menu-back");
const headerContainer = document.getElementById("header__container");
const sliderCarousel = document.getElementById("slider-carousel");


const login = new Popup(popupLogin, {}, {
  Overlay,
});
const reg = new Popup(popupReg, {}, {
  Overlay,
});

new Button(buttonAutorization, {
  click: () => {
    login.open();
  },
});

new Button(linkToReg, {
  click: () => {
    reg.open();
    login.close();
  },
});

new Button(linkToLogin, {
  click: () => {
    reg.close();
    login.open();
  },
});

new Button(mobileMenu, {
  click: () => {
    mobileMenu.classList.remove("header__mobile-menu_visible")
    mobileMenuBack.classList.add("header__mobile-menu_visible")
    headerContainer.classList.remove("header__container_hide");
  },
});
new Button(mobileMenuBack, {
  click: () => {
    mobileMenuBack.classList.remove("header__mobile-menu_visible")
    mobileMenu.classList.add("header__mobile-menu_visible")
    headerContainer.classList.add("header__container_hide");
  },
});


// import Swiper from 'swiper';
// // const Swiper = require('swiper');


// const swiper = new Swiper('.swiper-container', {
//   // slidesPerView: 5,
//   // spaceBetween: 30,
//   // freeMode: true,
//   pagination: {
//     el: '.swiper-pagination',
//     // type: 'bullets',
//   },
// });

let flkty = new Flickity( sliderCarousel, {
  // options
  cellAlign: 'left',
  contain: true
});