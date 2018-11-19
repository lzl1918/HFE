import { HandlerCollection } from './utils';

class Component {
    constructor(element) {
        this.element = element;
        element.component = this;
        this.events = new HandlerCollection();
    };
};

export default Component;
