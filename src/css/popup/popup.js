import Component from '../../scripts/component';

import './popup.css';

export default class Popup extends Component {
    constructor(...args) {
        super(...args);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.domElement.addEventListener("click", event => {
                if (event.target.classList.contains("popup__close")) this.close();
              });

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
