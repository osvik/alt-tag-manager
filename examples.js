/* jshint esversion: 8 */

const myTagManager = Object.create(tagManager);

tagManager.debug = true;

myTagManager.accounts = {};

/*
 * TAGS (Tags and myTagManager conditions of when they are fired)
 * The name of the function is for reference only with myTagManager.tags
 * Inside the "if" condition area put the conditions which the tag fires,
 * it can include myTagManagerParams or variables
 * Inside the "if" procedure area put the javascript tracking tag
*/

myTagManager.tag(function once_per_page_example(params) {
    if (
        params.event === "DOM ready"
    ) {
        myTagManager.logs.push("Trigger to run on Dom Ready");
    }
});

myTagManager.tag(function once_per_page_2_example(params) {
    if (
        params.event === "DOM ready"
    ) {
        myTagManager.logs.push("Second trigger to run on Dom Ready");
    }
});

myTagManager.tag(function click_li_example(params) {
    if (
        params.event === "click" && params.element === "li"
    ) {
        myTagManager.logs.push("Recorded click event in li");
    }
});

/*
 * TRIGGERS (Tags and myTagManager conditions of when they are fired)
 * First parameter: Name of the DOM events
 * Second parameter: CSS selector of the element, use "" for none
 * Third parameter: Object with the myTagManager push elements.
*/

// Example click event in a <li> html element
myTagManager.trigger("click", "li", {
    "event": "click",
    "element": "li"
});

// Example click event with custom function
myTagManager.trigger("click", "p.manual", function (e) {
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