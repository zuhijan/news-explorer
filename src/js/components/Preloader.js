import BaseComponent from './BaseComponent';

export default class Preloader extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

  }

  open() {
    this.domElement.classList.remove('overlay-preloader_hide');
  }

  close() {
    this.domElement.classList.add('overlay-preloader_hide');
  }
}
