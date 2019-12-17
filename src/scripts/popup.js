// export default class Popup {
//   constructor(popupLayer) {
//     this.popup = popupLayer;

//     this.popup.addEventListener("click", event => {
//       if (event.target.classList.contains("popup__close")) this.close();
//     });
//   }
//   open() {
//     this.popup.classList.add("popup_open");

//   }
//   close() {
//     this.popup.classList.remove("popup_open");

//   }
// }

import Component from './component';

// import './popup.css';

export default class Popup extends Component {
    constructor(...args) {
        super(...args);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        if (this.deps.Overlay) {
            this.overlay = new this.deps.Overlay(
                this.domElement.querySelector('.overlay'),
                {
                    click: this.close,
                }
            );
        }
    }

    open() {
        this.domElement.classList.add('popup_open');

        if (this.overlay && typeof this.overlay.show === 'function') {
            this.overlay.show();
        }
    }

    close() {
        this.domElement.classList.remove('popup_open');

        if (this.overlay && typeof this.overlay.hide === 'function') {
            this.overlay.hide();
        }
    }
}
