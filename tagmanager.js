/* jshint esversion: 8 */

const tagManager = Object.create(null);

tagManager.tags = [];
tagManager.logs = [];
tagManager.runLogs = [];
tagManager.lastParams = {};
tagManager.debug = false;
tagManager.lastRun = 0;
tagManager.accounts = {};

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
    },
    form(cssSelector) {
        const formEl = document.querySelector(cssSelector);
        const fData = new FormData(formEl);
        let formObject = {};
        for (const pair of fData.entries()) {
            formObject[pair[0]] = pair[1];
        }
        return formObject;
    },
    now: {
        date: new Date().toJSON().split('T')[0],
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        weekday: new Date().getDay(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
    }
};

// Obtaining consent status. This method shoud be updated with the actual consent mechanism.
tagManager.consent = {
    _essential: true,
    _analytics: false,
    _advertising: false,
    get essential() {
        return this._essential;
    },
    set essential(value) {
        if (typeof (value) === "boolean") {
            this._essential = value;
        }
    },
    get analytics() {
        return this._analytics;
    },
    set analytics(value) {
        if (typeof (value) === "boolean") {
            this._analytics = value;
        }
    },
    get advertising() {
        return this._advertising;
    },
    set advertising(value) {
        if (typeof (value) === "boolean") {
            this._advertising = value;
        }
    }
};

// Create an URL with parameters from an object
tagManager.addUrlParameters = function (baseUrl, params) {
    const url = new URL(baseUrl);
    const searchParams = new URLSearchParams(url.search);
    Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value);
    });
    url.search = searchParams.toString();
    return url.toString();
};

// Creates an image pixel
tagManager.imagePixel = function (imageURL, params = {}) {
    let pixel = document.createElement("img");
    pixel.src = this.addUrlParameters(imageURL, params);
    pixel.width = "1";
    pixel.height = "1";
    pixel.style.position = "absolute";
    pixel.style.left = "-5px";
    pixel.style.top = "0px";
    document.body.appendChild(pixel);
};

// Creates a cookieless image pixel
tagManager.cookieLessImagePixel = function (baseUrl, params = {}) {
    const url = this.addUrlParameters(baseUrl, params);
    const pixelSrc = `<img src='${url}' />`;
    const pc = document.createElement("iframe");
    pc.width = 1;
    pc.height = 1;
    pc.role = "img";
    pc.frameBorder = "0";
    pc.sandbox = "";
    pc.srcdoc = pixelSrc;
    document.body.appendChild(pc);
};

// Add html to the body
tagManager.addHtml = function (html, appendTo = document.body) {
    const node = document.createRange().createContextualFragment(html);
    appendTo.append(node);
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
