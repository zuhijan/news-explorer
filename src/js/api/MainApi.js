export default class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  getResponseJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      credentials: 'include',
    })
      .then(res => this.getResponseJson(res)
      )
  }
  getSavedArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      headers: this.headers
    })
      .then(res => this.getResponseJson(res)
      )
  }
  postArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.baseUrl}/articles`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image
      })
    })
      .then(res => this.getResponseJson(res))
  }
  deleteArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/articleId`, {
      method: "DELETE",
      // credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        articleId: articleId
      })
    })
      .then(res => this.getResponseJson(res))
  }
  postSignUp(email, password, name) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(res => this.getResponseJson(res))
  }
  postSignIn(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res =>  {
        if (res.ok) {
          return res;
        } else {
          return Promise.reject(res.status);
        }
      })
  }
}
