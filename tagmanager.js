/* jshint esversion: 8 */

const tagManager = Object.create(null);

tagManager.tags = [];
tagManager.logs = [];
tagManager.runLogs = [];
tagManager.lastParams = {};
tagManager.debug = false;
tagManager.lastRun = 0;

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
    get origin() {
        return window.location.origin;
    },
    get hash() {
        return window.location.hash.substring(1);
    },
    param(p) {
        const params = new URLSearchParams(window.location.search);
        if (params.has(p)) {
            return params.get(p);
        }
        return "";
    }

};

// Adds a tag function to the list of tags
tagManager.tag = function (fun) {
    this.tags.push(fun);
};

// Executes all the tags with the params
tagManager.run = function (params) {
    this.runLogs.push(params);
    Object.assign(this.lastParams, params);
    this.tags.forEach(element => {
        element(params);
    });
};

// Allows using triggers
tagManager.trigger = function (eventName, cssSelector = "", paramsObj = {}) {
    const self = this;
    let proced;
    if (typeof (paramsObj) === "object") {
        proced = function () {
            dataLayer.push(paramsObj);
        };
    } else if (typeof (paramsObj) === "function") {
        proced = paramsObj;
    } else {
        throw ("Trigger's third param must be either an object or a function");
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

// Loops trough dataLayer and runs each element trough all the tags
tagManager.parseDL = function () {
    let n = this.lastRun;
    while (n < dataLayer.length) {
        this.run(dataLayer[n]);
        n = n + 1;
        this.lastRun = n;
    }
};

// Starts watching for changes in dataLayer
tagManager.start = function () {
    this.parseDL();
    setInterval(() => {
        this.parseDL();
    }, 500);

};

// Default tag for testing/debugging
tagManager.tag(function logs_params(params) {
    if (tagManager.debug) {
        console.log("tagManager params are: ", params);
    }
});

// Default trigger: when the dom is ready (html, css and javascript loaded)
tagManager.trigger("DOMContentLoaded", "", {
    "event": "DOM ready"
});

// Default trigger: when the page is completeley loaded (images, css, javascript and other resources)
tagManager.trigger("load", "", {
    "event": "Window loaded"
});

// Default trigger: when the location.hash in the URL changes
tagManager.trigger("hashchange", "", {
    "event": "Hash changed",
    "hash": tagManager.variables.hash
});