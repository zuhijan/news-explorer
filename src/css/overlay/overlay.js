import Component from '../../scripts/component';

import './overlay.css';

export default class Overlay extends Component {
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
