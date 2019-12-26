import BaseComponent from '../../js/components/BaseComponent';

import './overlay.css';

export default class Overlay extends BaseComponent {
    constructor(...args) {
        super(...args);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        this.domElement.classList.add('overlay_visible');

        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.domElement.classList.remove('overlay_visible');

        document.body.style.overflow = '';
    }
}
