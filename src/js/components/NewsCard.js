import BaseComponent from './BaseComponent';
import {formatDate} from "../utils/date";

export default class NewsCard extends BaseComponent {
  constructor(...args) {
    super(...args);
  }

  create(article, isLoggedIn, key, idCard) {
    const imgValue = article.urlToImage ? article.urlToImage : article.image;
    const dateValue = article.publishedAt ? formatDate(article.publishedAt) : article.date;
    const titleValue = article.title;
    const descriptionValue = article.description ? article.description : article.text;
    const sourceValue = article.source ? article.source.name : article.source;

    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardIcon= document.createElement("div");
    const cardBlockDescription = document.createElement("div");
    const cardDate = document.createElement("p");
    const cardTitle = document.createElement("h3");
    const cardDescription = document.createElement("p");
    const cardSource = document.createElement("p");
    card.classList.add("card");
    cardIcon.classList.add("card__icon");
    cardImage.classList.add("card__photo");
    cardImage.style.backgroundImage = `url(${imgValue})`;
    cardBlockDescription.classList.add("card__block-description");
    cardDate.classList.add("card__date");
    cardDate.textContent = dateValue;
    cardTitle.classList.add("card__title");
    cardTitle.textContent = titleValue;
    cardDescription.classList.add("card__description");
    cardDescription.textContent = descriptionValue;
    cardSource.classList.add("card__source");
    cardSource.textContent = sourceValue;
    card.appendChild(cardImage);
    card.appendChild(cardIcon);
    cardBlockDescription.appendChild(cardDate);
    cardBlockDescription.appendChild(cardTitle);
    cardBlockDescription.appendChild(cardDescription);
    cardBlockDescription.appendChild(cardSource);
    card.appendChild(cardBlockDescription);

    if (!isLoggedIn) {
      const cardAuto= document.createElement("p");
      cardAuto.textContent = 'Войдите, чтобы сохранять статьи';
      cardAuto.classList.add("card__auto");
      card.appendChild(cardAuto);
    }

    if (!key) {
      cardIcon.classList.add("card__icon_mark");
    } else {
      const cardKey = document.createElement("p");
      cardKey.classList.add("card__key");
      cardKey.textContent = key;
      cardIcon.classList.add("card__icon_delete");
      card.appendChild(cardKey);

      const cardAuto= document.createElement("p");
      cardAuto.textContent = 'Убрать из сохранённых';
      cardAuto.classList.add("card__auto");
      card.appendChild(cardAuto);
    }

    return card;
  }
}
