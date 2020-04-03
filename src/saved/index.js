import "../css/index.css";

import MainApi from '../js/api/MainApi';
import NewsCard from '../js/components/NewsCard';
import Button from '../js/components/Button';
import Header from "../js/components/Header";
import Preloader from "../js/components/Preloader";
import {MAIN_API_BASE_URL, MAIN_PAGE } from "../js/constants/config";
import unique from '../js/utils/unique';

const buttonLogOut= document.getElementById("button-header-logout");
const buttonLogOutName= document.getElementById("button-header__name");
const nameUser= document.getElementById("name");
const countArticles= document.getElementById("count");
const savedCardlist= document.getElementById("saved-cardlist");
const circlePreloader = document.getElementById("circle-preloader");
const savedKeys = document.getElementById("saved-keys");

let token = localStorage.getItem('token');
let cardlistArray = [];
let count = 0;
let keywordsArray = [];
let uniqueKeyWordsArray = [];
const optionsMainApi = {
  baseUrl: MAIN_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`
  }
};

const mainApi = new MainApi(optionsMainApi);
const newsCard = new NewsCard();
const header = new Header();
const preloader = new Preloader(circlePreloader);

preloader.open();

mainApi.getUserInfo(token)
  .then((res) => {
    buttonLogOutName.textContent = res.name;
    nameUser.textContent = res.name;
    mainApi.getSavedArticles()
      .then((res) => {
        cardlistArray = res.data;
        cardlistArray.forEach((article) => {
          const cardElement =  newsCard.create(
            article,
            true,
            article.keyword
          );
          keywordsArray.push(article.keyword);
          savedCardlist.appendChild(cardElement);
        });
        count = cardlistArray.length;
        countArticles.textContent = count;
        preloader.close();

        console.log(keywordsArray);
        uniqueKeyWordsArray = unique(keywordsArray);
        console.log(uniqueKeyWordsArray);

        if (uniqueKeyWordsArray.length <= 3) {
          let savedKeysString = uniqueKeyWordsArray.join(',  ');
          savedKeys.textContent = savedKeysString;
        } else {
          let savedKeysString = `${uniqueKeyWordsArray[0]}, ${uniqueKeyWordsArray[1]} и ${uniqueKeyWordsArray.length - 2} другим`;
          savedKeys.textContent = savedKeysString;
        }

      })
  }).catch((err) => {
  console.log(err)
  document.location.href = MAIN_PAGE;
});

new Button(buttonLogOut, {
  click: () => {
    header.render(0);
  },
});

document.addEventListener("click", event => {
  let cardId;

  if (event.target.classList.contains("card__icon")) {
    cardlistArray.forEach((card) => {
      if (card.image === event.target.previousSibling.style.backgroundImage.split(`"`)[1]) {
        cardId = card._id;
      }
    })
    mainApi.deleteArticle(
      cardId,
    )
      .then((res) => {
        console.log(res);
        const keyword = event.target.nextSibling.nextSibling.textContent;
        event.target.closest(".card").remove();
        count = count - 1;
        countArticles.textContent = count;
        const indexKeyWord = keywordsArray.indexOf(keyword);
        keywordsArray.splice(indexKeyWord, 1);
        uniqueKeyWordsArray = unique(keywordsArray);
        if (uniqueKeyWordsArray.length <= 3) {
          let savedKeysString = uniqueKeyWordsArray.join(', ');
          savedKeys.textContent = savedKeysString;
        } else {
          let savedKeysString = `${uniqueKeyWordsArray[0]}, ${uniqueKeyWordsArray[1]} и ${uniqueKeyWordsArray.length - 2} другим`;
          savedKeys.textContent = savedKeysString;
        }

      })
      .catch((err) => {
        console.log(err);
      })

  }
});
