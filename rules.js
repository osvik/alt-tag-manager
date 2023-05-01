/* jshint esversion: 8 */

const myTagManager = Object.create(tagManager);

tagManager.debug = true;

myTagManager.accounts = {};

/*
 * RULES (Tags and myTagManager conditions of when they are fired)
 * The name of the function is for reference only with myTagManager.rules
 * Inside the "if" condition area put the conditions which the rule fires,
 * it can include myTagManagerParams or variables
 * Inside the "if" procedure area put the javascript tracking tag
*/

myTagManager.rule(function once_per_page(params) {
    if (
        params.event === "DOM ready"
    ) {
        myTagManager.logs.push("Event to run on Dom Ready");
    }
});

myTagManager.rule(function once_per_page_2(params) {
    if (
        params.event === "DOM ready"
    ) {
        myTagManager.logs.push("Second event to run on Dom Ready");
    }
});

myTagManager.rule(function just_another_test(params) {
    if (
        params.event === "click" && params.element === "li"
    ) {
        myTagManager.logs.push("Recorded click event in li");
    }
});

/*
 * EVENTS (Tags and myTagManager conditions of when they are fired)
 * First parameter: Name of the DOM events
 * Second parameter: CSS selector of the element, use "" for none
 * Third parameter: Object with the myTagManager push elements.
*/

// Example click event in a <li> html element
myTagManager.event("click", "li", {
    "event": "click",
    "element": "li"
});

// Example click event with custom function
myTagManager.event("click", "p.manual", function (e) {
    dataLayer.push({
        "event": "click",
        "target": e.target,
        "text": e.target.innerText
    });
    myTagManager.logs.push("Recorded " + e.type + " event");
});

// HTML example, 10 seconds on page
setTimeout(function () {
    dataLayer.push({
        "event": "10 seconds on page"
    });
}, 10000);