import BaseComponent from './BaseComponent';
import NewsCard from './NewsCard';
const newsCard = new NewsCard();
const noData = document.getElementById("no-data");
const resultsButton = document.getElementById("results-button");


export default class NewsCardList extends BaseComponent {
  constructor(...args) {
    super(...args);
  }

  renderResults(array, lastRenderedArticle, isLoggedIn) {
    let lastStep = lastRenderedArticle + 3;
    if (lastStep > (array.length - 1)) {
        lastStep = array.length - 1;
      }
    for (let i = lastRenderedArticle; i < lastStep; i++) {
      const cardElement =  newsCard.create(
        array[i], isLoggedIn);
      this.domElement.appendChild(cardElement);
      lastRenderedArticle++;
    }
    lastRenderedArticle = lastRenderedArticle + 3;

    if (lastRenderedArticle >= (array.length - 1)) {
      resultsButton.classList.add('results__button_hide');
    } else {
      resultsButton.classList.remove('results__button_hide');
    }
    this._renderError(array.length);

  }
  _renderError(data) {

    if (!data) {
      noData.classList.remove('results_no-data_hide');
    } else {
      noData.classList.add('results_no-data_hide');
    }
  }

  clearContainer() {
    let arr =  Array.from(this.domElement.childNodes);
    arr.forEach(child => child.remove());
  }
}
