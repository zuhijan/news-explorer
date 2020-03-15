import Popup from './components/Popup';
import Overlay from '../css/overlay/overlay';
import Button from './components/Button';
import Form from './components/Form';

import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import Validation from './components/Validation';
import Header from './components/Header';
import { today, weekAgo, formatDate } from './utils/date';

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
const resultsContainer = document.getElementById("results-container");
const resultsButton = document.getElementById("results-button");
const resultsSection = document.getElementById("results");
const circlePreloader = document.getElementById("circle-preloader");

const formLogUp = document.forms.logup;
const emailLogUp = formLogUp.elements.email;
const passLogUp = formLogUp.elements.password;
const nameLogUp = formLogUp.elements.name;

const formLogIn = document.forms.login;
const emailLogIn = formLogIn.elements.email;
const passLogIn = formLogIn.elements.password;

let articlesArray = [];
let lastRenderedArticle = 0;
let token = localStorage.getItem('token');
let isLoggedIn = false;
let keyword;
const optionsMainApi = {
  baseUrl: 'https://api.news-explorer.ru',
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`
  }
};
const optionsNewsApi = {
  baseUrl: 'https://newsapi.org/v2/everything?language=ru&pageSize=100&q=',
  apiKey: "2836cb6ec1c5477f88fc63639c5e0025"
};
//функция валидации инпутов
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
}

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
const newsCard = new NewsCard();
const { isEmpty, isWrongLength, isNotEmail, isWrongPassword, resetError, activateError } = new Validation();
const header = new Header();
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
      .then((data) => {
        localStorage.setItem('token', data.token);
        token = localStorage.getItem('token');
        isLoggedIn = true;
      })
      .then(() => {
        mainApi.getUserInfo(token)
          .then((res) => {
            header.render({isLoggedIn, name: res.name});
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
    keyword = searchInput.value;
    if(validateSearch(searchInput)) {
      circlePreloader.classList.remove('overlay-preloader_hide');
      newsApi.getCards(keyword, weekAgo, today)
        .then((res) => {
          console.log(res);
          circlePreloader.classList.add('overlay-preloader_hide');
          resultsSection.classList.remove('results_hide');
          const { articles } = res;
          articlesArray = articles;
          let lastStep = lastRenderedArticle + 3;
          for (let i = lastRenderedArticle; i < lastStep; i++) {
            const cardElement =  newsCard.create(
            articlesArray[i].urlToImage,
            formatDate(articlesArray[i].publishedAt),
            articlesArray[i].title,
            articlesArray[i].description,
            articlesArray[i].source.name, isLoggedIn);
            resultsContainer.appendChild(cardElement);
            console.log(resultsContainer);
            lastRenderedArticle++;
          }
          if (lastRenderedArticle >= (articlesArray.length - 1)) {
            resultsButton.classList.add('results__button_hide');
          }
        })
        .catch(err => console.log(err));
    }
  }
});

new Button( resultsButton, {
  click: () => {
    let lastStep = lastRenderedArticle + 3;
    if (lastStep > (articlesArray.length - 1)) {
      lastStep = articlesArray.length - 1;
    }
    for (let i = lastRenderedArticle; i < lastStep; i++) {
      const cardElement =  newsCard.create(
        articlesArray[i].urlToImage,
        formatDate(articlesArray[i].publishedAt),
        articlesArray[i].title,
        articlesArray[i].description,
        articlesArray[i].source.name, true);
        resultsContainer.appendChild(cardElement);
        lastRenderedArticle++;
    }

    if (lastRenderedArticle >= (articlesArray.length - 1)) {
      resultsButton.classList.add('results__button_hide');
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
});

new Form(formLogIn, {
  input: validateForm,
});


if(token) {
  circlePreloader.classList.remove('overlay-preloader_hide');
  mainApi.getUserInfo(token)
    .then((res) => {
      isLoggedIn = true;
      header.render({isLoggedIn, name: res.name});
      circlePreloader.classList.add('overlay-preloader_hide');
    }).catch((err) => {
    console.log(err);
    isLoggedIn = false;
  });
}

document.addEventListener("click", event => {
  if (event.target.classList.contains("card__icon")) {
    const icon = event.target;
    const imageUrl = icon.previousSibling.style.backgroundImage.split(`"`)[1];
    const cardDescriptionBlock = event.target.nextSibling;
    const cardDate = cardDescriptionBlock.firstChild;
    const cardDateValue = cardDate.textContent;
    const cardTitle = cardDate.nextElementSibling;
    const cardTitleValue = cardTitle.textContent;
    const cardDescription = cardTitle.nextElementSibling;
    const cardDescriptionValue = cardDescription.textContent;
    const cardSource = cardDescription.nextElementSibling;
    const cardSourceValue = cardSource.textContent;
    const link = 'http://localhost:8080/';

    mainApi.postArticle(
      keyword,
      cardTitleValue,
      cardDescriptionValue,
      cardDateValue,
      cardSourceValue,
      link,
      imageUrl,
    )
      .then((res) => {
        console.log(res);
        icon.classList.add('card__icon_saved');
      })
      .catch((err) => {
        console.log(err);
      })

  }
});
