/* jshint esversion: 8 */

const dataLayer = Object.create(tagManager);

tagManager.debug = true;

dataLayer.rule(function just_a_test(params) {
    if (
        params.pageType === "Homepage"
    ) {
        dataLayer.logs.push("Homepage loaded");
    }
});

dataLayer.rule(function just_another_test(params) {
    if (
        params.userClick === "li"
    ) {
        dataLayer.logs.push("Recorded click event in li");
    }
});

dataLayer.event("click", "li", {
    userClick: "li"
});