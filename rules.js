/* jshint esversion: 8 */

const dataLayer = Object.create(tagManager);

tagManager.debug = true;

dataLayer.accounts = {};

/*
 * RULES (Tags and dataLayer conditions of when they are fired)
 * The name of the function is for reference only with dataLayer.rules
 * Inside the "if" condition area put the conditions which the rule fires,
 * it can include dataLayerParams or variables
 * Inside the "if" procedure area put the javascript tracking tag
*/

dataLayer.rule(function just_a_test(params) {
    if (
        params.pageType === "Homepage"
    ) {
        dataLayer.logs.push("Homepage loaded");
    }
});

dataLayer.rule(function just_another_test(params) {
    if (
        params.event === "click" && params.element === "li"
    ) {
        dataLayer.logs.push("Recorded click event in li");
    }
});

/*
 * EVENTS (Tags and dataLayer conditions of when they are fired)
 * First parameter: Name of the DOM events
 * Second parameter: CSS selector of the element, use "" for none
 * Third parameter: Object with the datalayer push elements.
*/

// Example click event in a <li> html element
dataLayer.event("click", "li", {
    event: "click",
    element: "li"
});

// Example click event with manual data push and log using data from the event 
dataLayer.event("click", "p.manual", function (e) {
    dataLayer.push({
        event: "click",
        target: e.target,
        text: e.target.innerText
    });
    dataLayer.logs.push("Recorded " + e.type + " event");
});

// HTML example, 10 seconds on page
setTimeout(function () {
    dataLayer.push({
        event: "10 seconds on page"
    });
}, 10000);