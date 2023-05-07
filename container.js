/* jshint esversion: 8 */

tagManager.debug = true;

const container = Object.create(tagManager);

/*
 * TAGS (Tags and conditions of when they are fired)
 * The name of the function is for reference only, you can ommit it
 * Inside the "if" condition area put the conditions which the tag fires:
 * it can include params, variables, lastParams, consent and other conditions
 * Inside the "if" procedure area put the javascript tracking tag
*/

container.accounts.GA4 = "G-50HRM8825D";

container.tag(function google_analytics_page_view(params) {
    if (
        params.event === "DOM ready"
    ) {
        gtag('consent', 'update', {
            'ad_storage': container.consent.advertising ? 'granted' : 'denied',
            'analytics_storage': container.consent.analytics ? 'granted' : 'denied',
        });
        gtag('config', container.accounts.GA4);
        container.logs.push("Second part of Google Analytics page load tag");
    }
});

container.tag(function google_analytics_consent_update(params) {
    if (
        params.event === "Consent updated"
    ) {
        gtag('consent', 'update', {
            'ad_storage': container.consent.advertising ? 'granted' : 'denied',
            'analytics_storage': container.consent.analytics ? 'granted' : 'denied',
        });
        container.logs.push("Google Analytics consent updated");
    }

});

container.tag(function google_analytics_click_li_example(params) {
    if (
        params.event === "click" && params.element === "li"
    ) {
        gtag('event', 'click', {
            'event_category': 'test',
            'event_label': 'test'
        });
        container.logs.push("Recorded click event in <li> html element");
    }
});

container.accounts.hotjar = "1356277";

container.tag(function hotjar_page_view(params) {
    if (
        (params.event === "DOM ready" || params.event === "Consent updated") && container.consent.analytics
    ) {
        (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
            h._hjSettings = { hjid: container.accounts.hotjar, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script'); r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
        container.logs.push("Hotjar page load tag");
    }

});

container.accounts.twitter = "nx9ab";

container.tag(function twitter_page_view(params) {
    if (
        (params.event === "DOM ready" || params.event === "Consent updated") && container.consent.analytics
    ) {
        !function (e, t, n, s, u, a) {
            e.twq || (s = e.twq = function () {
                s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = 'https://static.ads-twitter.com/uwt.js',
                a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
        }(window, document, 'script');
        twq('config', container.accounts.twitter);
        container.logs.push("Twitter page load tag");
    }

});

container.tag(function empty_dom_ready_example(params) {
    if (
        params.event === "DOM ready" && container.consent.analytics
    ) {
        container.logs.push("Second empty tag to run on Dom Ready");
    }
});

container.tag(function hash_has_changed_example(params) {
    if (
        params.event === "Hash changed"
    ) {
        container.logs.push("Hash changed in the URL. New hash: " + params.hash);
    }
});

/*
 * TRIGGERS (Events to trigger container)
 * First parameter: name of the DOM event
 * Second parameter: CSS selector of the element, use "" for none
 * Third parameter: Object with the container push elements.
*/

// Listen to the DOM custom event ConsentUpdated and trigger a dataLayer event
container.trigger("ConsentUpdated", "", {
    "event": "Consent updated"
});

// Example click event in a <li> html element
container.trigger("click", "li", {
    "event": "click",
    "element": "li"
});

// Example click event with custom function
container.trigger("click", "p.manual", function (e) {
    dataLayer.push({
        "event": "click",
        "target": e.target,
        "text": e.target.innerText
    });
    container.logs.push("Recorded " + e.type + " event");
});

// HTML example, 10 seconds on page
setTimeout(function () {
    dataLayer.push({
        "event": "10 seconds on page"
    });
}, 10000);

container.start();