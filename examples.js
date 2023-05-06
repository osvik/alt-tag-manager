/* jshint esversion: 8 */

const myTM = Object.create(tagManager);

tagManager.debug = true;

myTM.accounts = {
    GA4: "G-50HRM8825D"
};

/*
 * TAGS (Tags and myTM conditions of when they are fired)
 * The name of the function is for reference only with myTM.tags
 * Inside the "if" condition area put the conditions which the tag fires,
 * it can include myTMParams or variables
 * Inside the "if" procedure area put the javascript tracking tag
*/

myTM.tag(function google_analytics_page_view(params) {
    if (
        params.event === "DOM ready"
    ) {
        // Google Analytics consent update based on the consent object
        gtag('consent', 'update', {
            'ad_storage': myTM.consent.advertising ? 'granted' : 'denied',
            'analytics_storage': myTM.consent.analytics ? 'granted' : 'denied',
        });
        // Google Analytics page load tag
        gtag('config', myTM.accounts.GA4);
        // Add to the logs
        myTM.logs.push("Second part of Google Analytics page load tag");
    }
});

myTM.tag(function google_analytics_consent_update(params) {
    if (
        params.event === "Consent updated"
    ) {
        // Google Analytics consent update based on the consent object
        gtag('consent', 'update', {
            'ad_storage': myTM.consent.advertising ? 'granted' : 'denied',
            'analytics_storage': myTM.consent.analytics ? 'granted' : 'denied',
        });
        // Add to the logs
        myTM.logs.push("Google Analytics consent updated");
    }

});

myTM.tag(function empty_dom_ready_example(params) {
    if (
        params.event === "DOM ready" && myTM.consent.analytics
    ) {
        // Add to the logs
        myTM.logs.push("Second empty tag to run on Dom Ready");
    }
});

myTM.tag(function hash_has_changed_example(params) {
    if (
        params.event === "Hash changed"
    ) {
        // Add to the logs
        myTM.logs.push("Hash changed in the URL. New hash: " + params.hash);
    }
});

myTM.tag(function google_analytics_click_li_example(params) {
    if (
        params.event === "click" && params.element === "li"
    ) {
        // Google Analytics event click
        gtag('event', 'click', {
            'event_category': 'test',
            'event_label': 'test'
        });
        // Add to the logs
        myTM.logs.push("Recorded click event in <li> html element");
    }
});

/*
 * TRIGGERS (Events to trigger myTM)
 * First parameter: Name of the DOM events
 * Second parameter: CSS selector of the element, use "" for none
 * Third parameter: Object with the myTM push elements.
*/

// Listen to the DOM custom event ConsentUpdated and trigger a dataLayer event
myTM.trigger("ConsentUpdated", "", {
    "event": "Consent updated"
});

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