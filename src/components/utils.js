const isEmpty = (str, trim=true) => {
    if (str === undefined || str === null || str === "undefined" || str === "null") {
        return true;
    }
    if (trim) {
        return str.trim().length <= 0;
    }
    return str.length <= 0;
};

class PropertyHelper {
    set = (obj, property, val) => {
        if (obj === undefined || obj === null) {
            return;
        }
        if (obj.dataset === undefined) {
            obj.setAttribute("data-" + property, val);
            return;
        }
        const ps = property.split("-");
        if (ps.length <= 0) {
            return;
        }
        let prop = ps[0];
        for (let i = 1; i < ps.length; i++) {
            if (ps[i].length <= 1) {
                prop += ps[i].toUpperCase();
            } else {
                prop += ps[i].substring(0, 1).toUpperCase();
                prop += ps[i].substring(1);
            }
        }
        obj.dataset[prop] = val;
    };

    has = (obj, property, trim=true) => {
        if (obj === undefined || obj === null) {
            return false;
        }
        if (!trim) {
            return obj.hasAttribute(`data-${property}`);
        }
        const value = this.read(obj, property);
        return !isEmpty(value, trim);
    };

    read = (obj, property) => {
        if (obj === undefined || obj === null) {
            return undefined;
        }
        if (obj.dataset === undefined) {
            return obj.getAttribute(`data-${property}`);
        }
        const ps = property.split('-');
        if (ps.length <= 0) {
            return undefined;
        }
        let prop = ps[0];
        for (let i = 1; i < ps.length; i++) {
            if (ps[i].length <= 1) {
                prop += ps[i].toUpperCase();
            } else {
                prop += ps[i].substring(0, 1).toUpperCase();
                prop += ps[i].substring(1);
            }
        }
        return obj.dataset[prop];
    };

    clear = (obj, property) => {
        if (obj === undefined || obj === null) {
           return;
        }
        const name = `data-${property}`;
        obj.removeAttribute(name);
    };

    resolve = (obj, property) => {
        if (obj === undefined || obj === null) {
            return undefined;
        }
        const name = `data-${property}`;
        if (obj.dataset === undefined) {
            if (!obj.hasAttribute(name)) {
                return undefined;
            }
            const value = obj.getAttribute(name);
            obj.removeAttribute(name);
            return value;
        }
        const ps = property.split('-');
        if (ps.length <= 0) {
            return undefined;
        }
        let prop = ps[0];
        for (let i = 1; i < ps.length; i++) {
            if (ps[i].length <= 1) {
                prop += ps[i].toUpperCase();
            } else {
                prop += ps[i].substring(0, 1).toUpperCase();
                prop += ps[i].substring(1);
            }
        }
        const retValue = obj.dataset[prop];
        obj.removeAttribute(name);
        return retValue;
    };
};

class HandlerCollection {
    handlers = new Map();

    add = (type, handler, allowDuplicate=false) => {
        let handlers = this.handlers.get(type);
        if (!handlers) {
            handlers = new Array();
            this.handlers.set(type, handlers);
        }
        if (!allowDuplicate && handlers.indexOf(handler) >= 0) {
            return;
        }
        handlers.push(handler);
    };

    remove = (type, handler) => {
        let handlers = this.handlers.get(type);
        if (!handlers) {
            return;
        }
        const index = handlers.indexOf(handler);
        if (index < 0) {
            return;
        }
        handlers.splice(index, 1);
    };

    clear = (type) => {
        if (!this.handlers.has(type))
            return;
        this.handlers.delete(type);
    };

    invoke = (type, sender, ...args) => {
        const handlers = this.handlers.get(type);
        if (!handlers) {
            return;
        }
        for (const handler of handlers) {
            handler.call(sender, ...[sender, ...args]);
        }
    };
};

const propertyHelper = new PropertyHelper();

export {
    isEmpty,
    propertyHelper,
    HandlerCollection,
};