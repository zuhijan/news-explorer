import Popup from './components/Popup';
import Overlay from '../css/overlay/overlay';
import Button from './components/Button';
import Form from './components/Form';

import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import Validation from './components/Validation';


const page = document.querySelector('.page');
const buttonAuthorization = document.getElementById("button-header-login");
const buttonLogOut= document.getElementById("button-header-logout");
const buttonLogOutName= document.getElementById("button-header__name");
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
const menuLink = document.getElementById("menu-link");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const formLogUp = document.forms.logup;
const emailLogUp = formLogUp.elements.email;
const passLogUp = formLogUp.elements.password;
const nameLogUp = formLogUp.elements.name;

const formLogIn = document.forms.login;
const emailLogIn = formLogIn.elements.email;
const passLogIn = formLogIn.elements.password;

const today = new Date().toISOString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric'});
const timeInMilSecWeek = 7 * 24 * 3600 * 1000;
const weekAgo = new Date((Date.now() - timeInMilSecWeek)).toISOString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric'});
const optionsMainApi = {
  // baseUrl: 'https://api.news-explorer.ru',
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
};
const optionsNewsApi = {
  // baseUrl: 'https://api.news-explorer.ru',
  baseUrl: 'https://newsapi.org/v2/everything?language=ru&pageSize=100&q=',
  apiKey: "2836cb6ec1c5477f88fc63639c5e0025"
};
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

function validateSearch(element) {
  const errorElement = element.nextElementSibling;
  if (isEmpty(element)) {
    activateError(errorElement, 'Нужно ввести ключевое слово');
    return false
  } else {
    resetError(errorElement);
    return true;
  }
}

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
const mainApi = new MainApi(optionsMainApi);
const newsApi = new NewsApi(optionsNewsApi);
// const newsCard = new NewsCard();
const {isEmpty, isWrongLength, isNotEmail, isWrongPassword} = new Validation();

//исполняющий код
new Button(buttonAuthorization, {
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
    mobileMenu.classList.remove("header__mobile-menu_visible");
    mobileMenuBack.classList.add("header__mobile-menu_visible");
    headerContainer.classList.remove("header__container_hide");
  },
});

new Button(mobileMenuBack, {
  click: () => {
    mobileMenuBack.classList.remove("header__mobile-menu_visible");
    mobileMenu.classList.add("header__mobile-menu_visible");
    headerContainer.classList.add("header__container_hide");
  },
});

new Button(buttonLogUp, {
  click: () => {
    mainApi.postSignUp(emailLogUp.value, passLogUp.value, nameLogUp.value)
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
});

new Button(buttonLogIn, {
  click: () => {
    mainApi.postSignIn(emailLogIn.value, passLogIn.value)
      .then(() => {
        mainApi.getUserInfo()
          .then((res) => {
            buttonAuthorization.classList.add('header__button_hide');
            buttonLogOut.classList.remove('header__button_hide');
            menuLink.classList.remove('menu__link_hide');
            buttonLogOutName.textContent = res.name;
            console.log(res.name)
          }).catch((err) => {
            console.log(err)
          });
        login.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

new Button( successToLogin, {
  click: () => {
    success.close();
    login.open();
  }
});
new Button( searchButton, {
  click: (event) => {
    event.preventDefault();
    const question = searchInput.value;
    if(validateSearch(searchInput)) {
      newsApi.getCards(question, weekAgo, today)
        .then((res) => {
          const { articles } = res;
          const imgValue = articles[0].urlToImage;
          const dateValue = articles[0].publishedAt;
          const titleValue = articles[0].title;
          const descriptionValue = articles[0].description;
          const sourceValue = articles[0].source.name;

          console.log(imgValue);
          console.log(dateValue);
          console.log(titleValue);
          console.log(descriptionValue);
          console.log(sourceValue);
          // newsCard.create(imgValue, dateValue, titleValue, descriptionValue, sourceValue);
        })
        .catch(err => console.log(err));
    }
  }
});



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


