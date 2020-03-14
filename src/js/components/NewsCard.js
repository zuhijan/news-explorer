import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(...args) {
    super(...args);
    // this.imgValue = imgValue;
    // dateValue, titleValue, descriptionValue, sourceValue
    // this.cardElement = this.create(imgValue, dateValue, titleValue, descriptionValue, sourceValue);
  }

  create(imgValue, dateValue, titleValue, descriptionValue, sourceValue) {
    const card = document.createElement("div");
    // const svg = `<svg xmlns="http://www.w3.org/2000/svg"` + `width="40" height="40" fill="none" ` + `class="card__icon card__icon_mark" ><defs`  ` /><rect width="40" height="40" ` `fill="#fff" rx="8" /><path stroke="#B6BCBF"` `stroke-width="2" d="M19.38 23.71L14 ` `27.94V12h12v15.94l-5.38-4.23-.62-.48-.62.48z"` `/><` `/svg>`;
    const cardImage = document.createElement("div");
    const cardAuto= document.createElement("p");
    const cardBlockDescription = document.createElement("div");
    const cardDate = document.createElement("p");
    const cardTitle = document.createElement("h3");
    const cardDescription = document.createElement("p");
    const cardSource = document.createElement("p");
    card.classList.add("card");
    cardImage.classList.add("card__photo");
    cardImage.style.backgroundImage = `url(${imgValue})`;
    cardAuto.classList.add("card__auto");
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
    // card.insertAdjacentHTML("beforeend", svg);
    card.appendChild(cardAuto);
    cardBlockDescription.appendChild(cardDate);
    cardBlockDescription.appendChild(cardTitle);
    cardBlockDescription.appendChild(cardDescription);
    cardBlockDescription.appendChild(cardSource);
    card.appendChild(cardBlockDescription);

    return card;
  }
}
