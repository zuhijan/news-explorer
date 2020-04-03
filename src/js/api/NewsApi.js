export default class NewsApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._apiKey = options.apiKey;
  }

  _getResponseJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getCards(question, weekAgo, today) {
    return fetch(`${this._baseUrl + question}&from=${weekAgo}&to=${today}&apiKey=${this._apiKey}`).then(res => this._getResponseJson(res))
  }
}
