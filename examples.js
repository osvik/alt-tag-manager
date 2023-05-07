/* jshint esversion: 8 */

const myTM = Object.create(tagManager);

tagManager.debug = true;

myTM.accounts.GA4 = "G-50HRM8825D";
myTM.accounts.hotjar = "1356277";
myTM.accounts.twitter = "nx9ab";

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
        gtag('consent', 'update', {
            'ad_storage': myTM.consent.advertising ? 'granted' : 'denied',
            'analytics_storage': myTM.consent.analytics ? 'granted' : 'denied',
        });
        gtag('config', myTM.accounts.GA4);
        myTM.logs.push("Second part of Google Analytics page load tag");
    }
});

myTM.tag(function google_analytics_consent_update(params) {
    if (
        params.event === "Consent updated"
    ) {
        gtag('consent', 'update', {
            'ad_storage': myTM.consent.advertising ? 'granted' : 'denied',
            'analytics_storage': myTM.consent.analytics ? 'granted' : 'denied',
        });
        myTM.logs.push("Google Analytics consent updated");
    }

});

myTM.tag(function google_analytics_click_li_example(params) {
    if (
        params.event === "click" && params.element === "li"
    ) {
        gtag('event', 'click', {
            'event_category': 'test',
            'event_label': 'test'
        });
        myTM.logs.push("Recorded click event in <li> html element");
    }
});

myTM.tag(function hotjar_page_view(params) {
    if (
        (params.event === "DOM ready" || params.event === "Consent updated") && myTM.consent.analytics
    ) {
        (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
            h._hjSettings = { hjid: myTM.accounts.hotjar, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script'); r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
        myTM.logs.push("Hotjar page load tag");
    }

});


myTM.tag(function twitter_page_view(params) {
    if (
        (params.event === "DOM ready" || params.event === "Consent updated") && myTM.consent.analytics
    ) {
        !function (e, t, n, s, u, a) {
            e.twq || (s = e.twq = function () {
                s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = 'https://static.ads-twitter.com/uwt.js',
                a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
        }(window, document, 'script');
        twq('config', myTM.accounts.twitter);
        myTM.logs.push("Twitter page load tag");
    }

});

myTM.tag(function empty_dom_ready_example(params) {
    if (
        params.event === "DOM ready" && myTM.consent.analytics
    ) {
        myTM.logs.push("Second empty tag to run on Dom Ready");
    }
});

myTM.tag(function hash_has_changed_example(params) {
    if (
        params.event === "Hash changed"
    ) {
        myTM.logs.push("Hash changed in the URL. New hash: " + params.hash);
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