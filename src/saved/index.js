import "../css/index.css";

import MainApi from '../js/api/MainApi';
import NewsCard from '../js/components/NewsCard';
import Button from '../js/components/Button';

const buttonLogOut= document.getElementById("button-header-logout");
const buttonLogOutName= document.getElementById("button-header__name");
const nameUser= document.getElementById("name");
const countArticles= document.getElementById("count");
const savedCardlist= document.getElementById("saved-cardlist");
const circlePreloader = document.getElementById("circle-preloader");

let token = localStorage.getItem('token');
let cardlistArray = [];

const optionsMainApi = {
  baseUrl: 'https://api.news-explorer.ru',
  // baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`
  }
};

const mainApi = new MainApi(optionsMainApi);
const newsCard = new NewsCard();
circlePreloader.classList.remove('overlay-preloader_hide');

mainApi.getUserInfo(token)
  .then((res) => {
    buttonLogOutName.textContent = res.name;
    nameUser.textContent = res.name;
    mainApi.getSavedArticles()
      .then((res) => {
        console.log(res);
        cardlistArray = res.data;
        res.data.forEach((article) => {
          const cardElement =  newsCard.create(
            article.image,
            article.date,
            article.title,
            article.text,
            article.source,
            true,
            article.keyword
          );
          countArticles
          savedCardlist.appendChild(cardElement);
        })
        circlePreloader.classList.add('overlay-preloader_hide');
      })
  }).catch((err) => {
  console.log(err)
  document.location.href = 'http://localhost:8080/index.html';
});

new Button(buttonLogOut, {
  click: () => {
    document.location.href = 'http://localhost:8080/index.html';
    localStorage.removeItem('token');
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
        event.target.closest(".card").remove();
      })
      .catch((err) => {
        console.log(err);
      })

  }
});
