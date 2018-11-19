import hfe from './components/hfe';

(function (window) {
    const load = function () {
        hfe.initialize(window.document);
    };

    window.addEventListener('load', load, false);
})(window);