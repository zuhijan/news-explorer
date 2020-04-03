import BaseComponent from './BaseComponent';
import {ERR_KEY_WORD, ERR_EMAIL, ERR_MIN_MAX_LENGTH, ERR_PASS, ERR_REQUIRE_FIELD} from "../constants/errors-text";

export default class Validation extends BaseComponent {
  constructor(...args) {
    super(...args);
  }
  _isEmpty(field) {
    return !field.value;
  }
  _isWrongLength(field) {
    return (field.value.trim().length < 2 || field.value.trim().length > 30) && field.type === 'text';
  }
  _isNotEmail(field) {
    return field.validity.typeMismatch && field.type == 'email';
  }
  _isWrongPassword(field) {
    return (field.value.trim().length < 8 || field.value.trim().length > 30) && field.type == 'password';
  }
  resetError(element) {
    element.classList.remove('popup__input_invalidate');
    element.textContent = '';
  }
  activateError(element, text) {
    element.textContent = text;
    element.classList.add('popup__input_invalidate');
  }

  validateSearch() {
    const errorElement = this.domElement.nextElementSibling;
    if (this._isEmpty(this.domElement)) {
      this.activateError(errorElement, ERR_KEY_WORD);
      return false
    } else {
     this.resetError(errorElement);
      return true;
    }
  }

  validate() {
    const errorElement = this.domElement.nextElementSibling;
    if (this._isEmpty(this.domElement)) {
      this.activateError(errorElement, ERR_REQUIRE_FIELD);

      return false
    } else if (this._isWrongLength(this.domElement)) {
      this.activateError(errorElement, ERR_MIN_MAX_LENGTH);

      return false
    } else if (this._isNotEmail(this.domElement)) {
      this.activateError(errorElement, ERR_EMAIL);

      return false
    } else if (this._isWrongPassword(this.domElement)) {
      this.activateError(errorElement, ERR_PASS);

      return false
    } else {
      this.resetError(errorElement);
    }
    return true;
  }

  validateForm() {
    const form = this.domElement;
    const inputs = Array.from(form.elements);
    let isValidForm = true;

    inputs.forEach((elem) => {
      if (elem.name !== 'button') {
        if (this._isEmpty(elem)) {
          isValidForm = false;
          return false;
        } else if (this._isWrongLength(elem)) {
          isValidForm = false;
          return false;
        } else if (this._isNotEmail(elem)) {
          isValidForm = false;
          return false;
        } else if (this._isWrongPassword(elem)) {
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
}
