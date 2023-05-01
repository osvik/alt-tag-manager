/* jshint esversion: 8 */

const tagManager = Object.create(null);

tagManager.rules = [];
tagManager.logs = [];
tagManager.pushLogs = [];
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
    this.rules.push(fun);
};

// Executes a myTagManager.push in all the rules
tagManager.push = function (params) {
    this.pushLogs.push(params);
    this.rules.forEach(element => {
        element(params);
    });
};

// Allows using events
tagManager.event = function (eventName, cssSelector = "", paramsObj = {}) {
    const self = this;
    let proced;
    if (typeof (paramsObj) === "object") {
        proced = function () {
            self.push(paramsObj);
        };
    } else if (typeof (paramsObj) === "function") {
        proced = paramsObj;
    } else {
        throw ("Event's third param must be either an object or a function");
    }

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
        console.log("myTagManager params are: ", params);
    }
});

// Default event: when the dom is ready (html, css and javascript loaded)
tagManager.event("DOMContentLoaded", "", {
    event: "DOM ready"
});

// Default event: when the page is loaded (images, css, javascript and other resources)
tagManager.event("load", "", {
    event: "Window loaded"
});