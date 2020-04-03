import Popup from './components/Popup';
import Overlay from '../css/overlay/overlay';
import Button from './components/Button';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import Validation from './components/Validation';
import Header from './components/Header';
import { today, weekAgo } from './utils/date';
import NewsCardList from "./components/NewsCardList";
import Preloader from "./components/Preloader";
import {ERR_LOG_IN, ERR_LOG_UP} from "./constants/errors-text";
import {MAIN_API_BASE_URL, NEWS_API_BASE_URL, NEWS_API_KEY} from "./constants/config";

const buttonAuthorization = document.getElementById("button-header-login");
const buttonLogOut= document.getElementById("button-header-logout");
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
let sevenDaysAgo = weekAgo();
let timeNow = today();

const optionsMainApi = {
  baseUrl: MAIN_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`
  }
};
const optionsNewsApi = {
  baseUrl: NEWS_API_BASE_URL,
  apiKey: NEWS_API_KEY
};


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
const newsCardList = new NewsCardList(resultsContainer);
const validateSearch  = new Validation(searchInput);
const header = new Header();
const preloader = new Preloader(circlePreloader);
const emailLogInValid = new Validation(emailLogIn);
const emailLogUpValid = new Validation(emailLogUp);
const passLogInValid = new Validation(passLogIn);
const passLogUpValid = new Validation(passLogUp);
const nameLogUpValid = new Validation(nameLogUp);
const formLogUpValid = new Validation(formLogUp);
const formLogInValid = new Validation(formLogIn);

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
    preloader.open();
    mainApi.postSignUp(emailLogUp.value, passLogUp.value, nameLogUp.value)
      .then((res) => {
        console.log(res);
        reg.close();
        preloader.close();
        success.open();

      })
      .catch((err) => {
        preloader.close();
        if (err === 400) {
          buttonLogIn.nextElementSibling.textContent = ERR_LOG_UP;
        }
      })
  }
});

new Button(buttonLogIn, {
  click: () => {
    preloader.open();
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
        preloader.close();

      })
      .catch((err) => {
        preloader.close();
        if (err === 400) {
          buttonLogIn.nextElementSibling.textContent =  ERR_LOG_IN;
        }
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
    if(validateSearch.validateSearch()) {
      articlesArray = [];
      lastRenderedArticle = 0;

      newsCardList.clearContainer();
      preloader.open();

      newsApi.getCards(keyword, sevenDaysAgo, timeNow)
        .then((res) => {
          preloader.close();
          resultsSection.classList.remove('results_hide');
          const { articles } = res;
          articlesArray = articles;
          newsCardList.renderResults(articlesArray, lastRenderedArticle, isLoggedIn);
          lastRenderedArticle = lastRenderedArticle + 3

        })
        .catch(err => console.log(err));
    }
  }
});

new Button( resultsButton, {
  click: () => {
    newsCardList.renderResults(articlesArray, lastRenderedArticle, isLoggedIn);
    lastRenderedArticle = lastRenderedArticle + 3;
  }
});


emailLogIn.addEventListener("input", () => {return emailLogInValid.validate()});
emailLogUp.addEventListener("input", () => {return emailLogUpValid.validate()});
passLogIn.addEventListener("input", () => {return passLogInValid.validate()});
passLogUp.addEventListener("input", () => {return passLogUpValid.validate()});
nameLogUp.addEventListener("input", () => {return nameLogUpValid.validate()});
formLogUp.addEventListener("input", () => {return formLogUpValid.validateForm()});
formLogIn.addEventListener("input", () => {return formLogInValid.validateForm()});



if(token) {
  preloader.open();
  mainApi.getUserInfo(token)
    .then((res) => {
      isLoggedIn = true;
      header.render({isLoggedIn, name: res.name});
      preloader.close();

    }).catch((err) => {
    console.log(err);
    isLoggedIn = false;
  });
}

document.addEventListener("click", event => {
  if (token) {
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
          icon.classList.add('card__icon_saved');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

});

new Button(buttonLogOut, {
  click: () => {
    isLoggedIn = false;
    header.render(isLoggedIn);
  },
});

document.addEventListener('keyup', event => {
  if (event.code === 'Escape') {
    reg.close();
    login.close();
  }
})
