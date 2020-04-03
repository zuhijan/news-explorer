import Component from './BaseComponent';
const buttonAuthorization = document.getElementById("button-header-login");
const buttonLogOut= document.getElementById("button-header-logout");
const menuLink = document.getElementById("menu-link");
const buttonLogOutName= document.getElementById("button-header__name");

export default class Header extends Component {
  constructor(...args) {
    super(...args);
  }

  render({ isLoggedIn, name }) {

    if (isLoggedIn) {
      buttonAuthorization.classList.add('header__button_hide');
      buttonLogOut.classList.remove('header__button_hide');
      menuLink.classList.remove('menu__link_hide');
      buttonLogOutName.textContent = name;
    } else {
      localStorage.removeItem('token');
      document.location.href = 'http://localhost:8080/index.html';

    }
  }
}
