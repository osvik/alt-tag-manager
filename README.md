# Alternative code-based tag manager

Script to help organizing visitor tracking in my websites without using a Tag Manager.

## Why?

It's an **experiment** and:

- It’s **lightweight**. The web pages load faster and spend less battery and resources. An empty tag manager:
  - GTM has 102KB, 40KB tranfered.
  - Matomo TM has 27.6KB, 10KB transfered
  - This script has less than 3KB. 
- The tag manager itself **does not share any information with any company**.
- The tag manager itself **isn't blocked by ad blockers** or the Brave browser.
- It allows more **complex triggers**. This is particularly useful to better manage tags together with cookie consent
- I can **add triggers and tags** either from one ot more JavaScript files or from a web page / template, also using a Wordpress content block.
- Can **use Google Analytics events to trigger other non-GA tags**.

## How does it work?

It works with the dataLayer array.

## Features summary

- Tags
- Triggers
- Variables
- Last parameters
- Consent functions
- Many logs:
  - logs
  - run logs
  - debug mode
  - inspect dataLayer
- Create image pixels (pixels without 3rd party javascript)
- Inject html in your pages
- Default triggers:
  - Dom ready
  - Window loaded
  - Hash changed

