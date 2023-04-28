/* jshint esversion: 8 */

const tagManager = Object.create(null);

tagManager.rules = [];
tagManager.logs = [];

tagManager.rule = function (fun) {
    tagManager.rules.push(fun);
};

tagManager.push = function (params) {
    tagManager.rules.forEach(element => {
        element(params);
    });
};
