import Component from './component';
import { propertyHelper } from './utils';
import styles from '../styles/button.less';

const onButtonClick = (element) => {
    const { component } = element;
    if (!component.isEnabled()) {
        return;
    }
    const args = {
        handled: false,
    }
    component.events.invoke('click', component, args);
    if (args.handled) {
        return;
    }
    const url = propertyHelper.read(element, 'href');
    if (url) {
        window.location.href = url;
    }
};

const initializeButton = (element) => {
    if (propertyHelper.has(element, 'text')) {
        const text = propertyHelper.read(element, 'text');
        element.innerHTML = '';
        const span = document.createElement('span');
        span.innerText = text;
        element.appendChild(span);
    } else {

    }
    element.classList.add(styles['hfe-button']);
    element.addEventListener('click', (e) => {
        onButtonClick(e.currentTarget);
    }, false);
}

const supportedProperty = ['text', 'disabled', 'href'];

class Button extends Component {
    constructor(element) {
        super(element);
        initializeButton(element);
        console.log(styles);
    };

    isEnabled = () => {
        return !propertyHelper.has(this.element, 'disabled');
    }

    setEnabled = (isEnable) => {
        if (isEnable) {
            propertyHelper.clear(this.element, 'disabled');
        } else {
            propertyHelper.set(this.element, 'disabled');
        }
    }
};

export default Button;