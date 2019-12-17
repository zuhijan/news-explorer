import Popup from './popup';
import Overlay from '../css/overlay/overlay';
import Button from './button';



// const popupLogin = document.querySelector(".popup__login");
// const popupReg = document.querySelector(".popup__reg");

// const popupLoginClass = new Popup(popupLogin)
// const popupRegClass = new Popup(popupReg)

const buttonAutorization = document.getElementById("header__button_auto");
const popupLogin = document.getElementById("popup__login");
const popupReg = document.getElementById("popup__reg");
const linkToReg = document.getElementById("popup__link-to-reg");
const linkToLogin = document.getElementById("popup__link-to-login");




console.log(buttonAutorization);

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

// page.addEventListener("click", () => {
//   if (event.target.classList.contains("header__button_auto")) {
//     console.log("popup-login open")
//     popupLoginClass.open();
//     console.log(popupLoginClass)

//   }
//   if (event.target.classList.contains("popup__link_reg")) {
//     popupLoginClass.close();
//     popupRegClass.open();
//   }
//   if (event.target.classList.contains("popup__link_login")) {
//     popupLoginClass.open();
//     popupRegClass.close();
//   }
// })

