/* jshint esversion: 8 */

const dataLayer = Object.create(tagManager);

dataLayer.rule(function (params) {
    if (
        params
    ) {
        console.log("Params are: ", params);
        dataLayer.logs.push("Comment added to the log");
    } else {
        dataLayer.logs.push("Another comment added to the log");
    }
});