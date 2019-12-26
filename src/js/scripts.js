import Popup from './components/Popup';
import Overlay from '../css/overlay/overlay';
import Button from './components/Button';
import Form from './components/Form';

import MainApi from './api/MainApi';
import Validation from './components/Validation';


const page = document.querySelector('.page');
const buttonAutorization = document.getElementById("button-header");
const popupLogin = document.getElementById("login");
const popupReg = document.getElementById("registration");
const linkToReg = document.getElementById("link-to-reg");
const linkToLogin = document.getElementById("link-to-login");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuBack = document.getElementById("mobile-menu-back");
const headerContainer = document.getElementById("container-header");
// const sliderCarousel = document.getElementById("slider-carousel");
const buttonLogUp = document.getElementById("logup-button");
const buttonLogIn = document.getElementById("login-button");

const formLogUp = document.forms.logup;
const emailLogUp = formLogUp.elements.email;
const passLogUp = formLogUp.elements.password;
const nameLogUp = formLogUp.elements.name;

const formLogIn = document.forms.login;
const emailLogIn = formLogIn.elements.email;
const passLogIn = formLogIn.elements.password;


const options = {
  // baseUrl: 'https://api.news-explorer.ru',
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
}
//функция валидации инпутов
function validate(event) {
  // event.preventDefault();
  const errorElement = event.target.nextElementSibling
  if (isEmpty(event.target)) {
    errorElement.textContent = 'Это обязательное поле';
    event.target.classList.add('popup__input_invalidate');
    return false
  }
  if (isWrongLength(event.target)) {
    errorElement.textContent = 'Должно быть от 2 до 30 символов';
    event.target.classList.add('popup__input_invalidate');
    buttonLogIn.classList.remove('popup__button_active');
    buttonLogIn.setAttribute('disabled', true);
    return false
  }
  if (isNotEmail(event.target)) {
    errorElement.textContent = 'Некорректный email';
    event.target.classList.add('popup__input_invalidate');
    buttonLogIn.classList.remove('popup__button_active');
    buttonLogIn.setAttribute('disabled', true);
    return false
  }
  if (isWrongPassword(event.target)) {
    errorElement.textContent = 'Пароль должен быть от 8 до 30 символов';
    event.target.classList.add('popup__input_invalidate');
    buttonLogIn.classList.remove('popup__button_active');
    buttonLogIn.setAttribute('disabled', true);
    return false
  } else {
    errorElement.textContent = '';
    validateForm(formLogIn)
  }
};
//функция валидации форм
function validateForm(form) {
  form.forEach((input) => {
    if (isEmpty(input) && isWrongLength(input) && isNotEmail(input) && isWrongPassword(input)) {
      form.element.button.classList.remove('popup__button_active');
      form.element.button.setAttribute('disabled', true);
      return false
    }
  })
  form.element.button.classList.add('popup__button_active');
  form.element.button.setAttribute('disabled', false);
}

//объявление классов
const login = new Popup(popupLogin, {}, {
  Overlay,
});
const reg = new Popup(popupReg, {}, {
  Overlay,
});
const api = new MainApi(options)
const { isEmpty, isWrongLength, isNotEmail, isWrongPassword } = new Validation();

//исполняющий код
new Button(buttonAutorization, {
  click: () => {
    login.open();
    validateForm(formLogIn)
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

new Button(buttonLogUp, {
  click: () => {
    api.postSignUp(emailLogUp.value, passLogUp.value, nameLogUp.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`что-то пошло не так: ${err.message}`);
        console.log(err);
      })
  }
})

new Button(buttonLogIn, {
  click: () => {
    console.log(emailLogIn.value);

    api.postSignIn(emailLogIn.value, passLogIn.value)
      .then((res) => {
        console.log(res);
        console.log(res.status);
      })
      .catch((err) => {
        console.log(`что-то пошло не так: ${err.message}`);
        console.log(err);

      })
  }
})

new Button(buttonLogIn, {
  click: () => {
    console.log(passLogIn.value);

    api.getUserInfo()
      .then((res) => console.log(res))
      .catch((err) => { `${err} + ${err.message}` })
      .catch((err) => {
        console.log(`что-то пошло не так: ${err.message}`);
        console.log(err);

      })
  }
});




// emailLogIn.addEventListener("input", validate);
// emailLogUp.addEventListener("input", validate);
// passLogIn.addEventListener("input", validate);
// passLogUp.addEventListener("input", validate);
// nameLogUp.addEventListener("input", validate);

// formLogUp.addEventListener("input", validate);
// formLogIn.addEventListener("input", validate);


new Form(formLogUp, {
  input: validate,
})
new Form(formLogIn, {
  input: validate,
})
// new Form(page, {
//   popupOpen: function () {
//     console.log('123')
//   }
// })


// document.cookie="foo=bar";
// console.log(`куки: ${document.cookie}`);

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

// import Flickity from 'flickity';

// console.log(sliderCarousel)
// let flkty = new Flickity( sliderCarousel, {
//   // options
//   cellAlign: 'left',
//   // // contain: true,
//   wrapAround: true,
//   freeScroll: true
// });

// import Glide from '@glidejs/glide'

// new Glide('.glide').mount()