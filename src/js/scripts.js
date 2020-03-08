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
const popupSuccess = document.getElementById("success");
const linkToReg = document.getElementById("link-to-reg");
const linkToLogin = document.getElementById("link-to-login");
const successToLogin = document.getElementById("success-to-login");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuBack = document.getElementById("mobile-menu-back");
const headerContainer = document.getElementById("container-header");
const buttonLogUp = document.getElementById("logup-button");
const buttonLogIn = document.getElementById("login-button");

const formLogUp = document.forms.logup;
const emailLogUp = formLogUp.elements.email;
const passLogUp = formLogUp.elements.password;
const nameLogUp = formLogUp.elements.name;

const formLogIn = document.forms.login;
const emailLogIn = formLogIn.elements.email;
const passLogIn = formLogIn.elements.password;
console.log(popupSuccess);


const options = {
  // baseUrl: 'https://api.news-explorer.ru',
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
}
//функция валидации инпутов
function resetError(element) {
  element.classList.remove('popup__input_invalidate');
  element.textContent = '';
}

function activateError(element, text) {
  element.textContent = text;
  element.classList.add('popup__input_invalidate');
}

function validate(event) {
  const errorElement = event.target.nextElementSibling;
  if (isEmpty(event.target)) {
    activateError(errorElement, 'Это обязательное поле');

    return false
  } else if (isWrongLength(event.target)) {
    activateError(errorElement, 'Должно быть от 2 до 30 символов');

    return false
  } else if (isNotEmail(event.target)) {
    activateError(errorElement, 'Некорректный email');

    return false
  } else if (isWrongPassword(event.target)) {
    activateError(errorElement, 'Пароль должен быть от 8 до 30 символов');

    return false
  } else {
    resetError(errorElement);
  }
  return true;
}

function validateForm(event) {
  const form = event.currentTarget;
  const inputs = Array.from(form.elements);
  let isValidForm = true;

  inputs.forEach((elem) => {
    if (elem.name !== 'button') {
      if (isEmpty(elem)) {
        isValidForm = false;
        return false;
      } else if (isWrongLength(elem)) {
        isValidForm = false;
        return false;
      } else if (isNotEmail(elem)) {
        isValidForm = false;
        return false;
      } else if (isWrongPassword(elem)) {
        isValidForm = false;
        return false;
      }
    }
  });
  if (isValidForm) {
    form.elements.button.classList.add('popup__button_active');
    form.elements.button.removeAttribute('disabled');
  } else {
    form.elements.button.classList.remove('popup__button_active');
    form.elements.button.setAttribute('disabled', true);
  }
};

// объявление классов
const login = new Popup(popupLogin, {}, {
  Overlay,
});
const reg = new Popup(popupReg, {}, {
  Overlay,
});
const success = new Popup(popupSuccess, {}, {
  Overlay,
});
const api = new MainApi(options)
const {isEmpty, isWrongLength, isNotEmail, isWrongPassword} = new Validation();

//исполняющий код
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

new Button(buttonLogUp, {
  click: () => {
    api.postSignUp(emailLogUp.value, passLogUp.value, nameLogUp.value)
      .then((res) => {
        console.log(res);
        reg.close();
        success.open();
      })
      .catch((err) => {
        console.log(`что-то пошло не так: ${err.message}`);
        console.log(err);
      })
  }
})

new Button(buttonLogIn, {
  click: () => {
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

new Button( successToLogin, {
  click: () => {
    success.close();
    login.open();
  }
})
// new Button(buttonLogIn, {
//   click: () => {
//     console.log(passLogIn.value);
//
//     api.getUserInfo()
//       .then((res) => console.log(res))
//       .catch((err) => { `${err} + ${err.message}` })
//       .catch((err) => {
//         console.log(`что-то пошло не так: ${err.message}`);
//         console.log(err);
//
//       })
//   }
// });


emailLogIn.addEventListener("input", validate);
emailLogUp.addEventListener("input", validate);
passLogIn.addEventListener("input", validate);
passLogUp.addEventListener("input", validate);
nameLogUp.addEventListener("input", validate);

new Form(formLogUp, {
  input: validateForm,
})


new Form(formLogIn, {
  input: validateForm,
})
// new Form(page, {
//   popupOpen: function () {
//     console.log('123')
//   }
// })


// document.cookie="foo=bar";
// console.log(`куки: ${document.cookie}`);


