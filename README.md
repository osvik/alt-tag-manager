# Code-based tag manager

Script to help me organise the tracking in my websites without using a Tag Manager.

## Why?

It's an experiment, not ready to put in production yet, but:

- It’s lightweight. The web pages load faster.
- It allows more complex triggers.
- I can add triggers and tags either from one ot more JavaScript files or from a web page / template.
- The tag manager itself does not share any information with any company.
- The tag manager itself isn't blocked by ad blockers or Brave.


## How does it work?

It works with the dataLayer array.

## Features summary

- Tags
- Triggers
- Variables
- Last parameters
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

