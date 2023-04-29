/* jshint esversion: 8 */

const tagManager = Object.create(null);

tagManager.rules = [];
tagManager.logs = [];
tagManager.debug = false;

tagManager.variables = {
    get path() {
        return window.location.pathname;
    },
    get title() {
        return document.title;
    },
    param(p) {
        const params = new URLSearchParams(window.location.search);
        if (params.has(p)) {
            return params.get(p);
        }
        return "";
    }

};

tagManager.rule = function (fun) {
    tagManager.rules.push(fun);
};

tagManager.push = function (params) {
    tagManager.rules.forEach(element => {
        element(params);
    });
};

tagManager.rule(function logs_params(params) {
    if (tagManager.debug) {
        console.log("Datalayer params are: ", params);
    }
});