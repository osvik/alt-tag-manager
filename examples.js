/* jshint esversion: 8 */

const myTM = Object.create(tagManager);

tagManager.debug = true;

myTM.accounts = {};

/*
 * TAGS (Tags and myTM conditions of when they are fired)
 * The name of the function is for reference only with myTM.tags
 * Inside the "if" condition area put the conditions which the tag fires,
 * it can include myTMParams or variables
 * Inside the "if" procedure area put the javascript tracking tag
*/

myTM.tag(function once_per_page_example(params) {
    if (
        params.event === "DOM ready"
    ) {
        myTM.logs.push("Trigger to run on Dom Ready");
    }
});

myTM.tag(function once_per_page_2_example(params) {
    if (
        params.event === "DOM ready"
    ) {
        myTM.logs.push("Second trigger to run on Dom Ready");
    }
});

myTM.tag(function click_li_example(params) {
    if (
        params.event === "click" && params.element === "li"
    ) {
        myTM.logs.push("Recorded click event in li");
    }
});

/*
 * TRIGGERS (Tags and myTM conditions of when they are fired)
 * First parameter: Name of the DOM events
 * Second parameter: CSS selector of the element, use "" for none
 * Third parameter: Object with the myTM push elements.
*/

// Example click event in a <li> html element
myTM.trigger("click", "li", {
    "event": "click",
    "element": "li"
});

// Example click event with custom function
myTM.trigger("click", "p.manual", function (e) {
    dataLayer.push({
        "event": "click",
        "target": e.target,
        "text": e.target.innerText
    });
    myTM.logs.push("Recorded " + e.type + " event");
});

// HTML example, 10 seconds on page
setTimeout(function () {
    dataLayer.push({
        "event": "10 seconds on page"
    });
}, 10000);

myTM.start();