/* jshint esversion: 8 */

const dataLayer = Object.create(null);

dataLayer.rules = [];

dataLayer.rule = function (fun) {
    dataLayer.rules.push(fun);
};

dataLayer.push = function (params) {
    dataLayer.rules.forEach(element => {
        element(params);
    });
};
