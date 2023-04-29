/* jshint esversion: 8 */

const tagManager = Object.create(null);

tagManager.rules = [];
tagManager.logs = [];
tagManager.debug = false;

// Default variables
tagManager.variables = {
    get path() {
        return window.location.pathname;
    },
    get title() {
        return document.title;
    },
    get referrer() {
        return document.referrer;
    },
    param(p) {
        const params = new URLSearchParams(window.location.search);
        if (params.has(p)) {
            return params.get(p);
        }
        return "";
    }

};

// Adds a rule function to the list of rules
tagManager.rule = function (fun) {
    tagManager.rules.push(fun);
};

// Executes a dataLayer.push in all the rules
tagManager.push = function (params) {
    tagManager.rules.forEach(element => {
        element(params);
    });
};

// Allows using events
tagManager.event = function (eventName, cssSelector = "", paramsObj = {}) {
    const self = this;
    const proced = function () {
        self.push(paramsObj);
    };
    if (cssSelector === "") {
        window.addEventListener(eventName, proced);
        return true;
    }
    const list = document.querySelectorAll(cssSelector);
    if (list.length === 0) {
        return false;
    }
    for (let el of list) {
        el.addEventListener(eventName, proced);
    }
};

// Default rule for testing/debugging
tagManager.rule(function logs_params(params) {
    if (tagManager.debug) {
        console.log("Datalayer params are: ", params);
    }
});