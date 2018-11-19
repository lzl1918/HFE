import Button from './button';

class HFE {
    initialize = (root) => {
        const buttons = this.query(root, 'div[type="button"]');
        for (const button of buttons) {
            new Button(button);
        }
    };

    query = (root, selector) => {
        return root.querySelectorAll(selector);
    };
};

const hfe = new HFE();
export default hfe;
