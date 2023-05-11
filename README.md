# Alternative code-based tag manager

Script to help organizing visitor tracking in my websites without using a Tag Manager.

&rarr; **[Wiki with documentation](https://github.com/osvik/alt-tag-manager/wiki)** &larr;

## Why?

It's an **experiment** and:

- It’s **lightweight**. The web pages load faster and spend less battery and resources. An empty tag manager:
  - GTM has 102KB, 40KB tranfered.
  - Matomo TM has 27.6KB, 10KB transfered
  - This script has less than 3KB. 
- The tag manager itself **does not share any information with any company**.
- The tag manager itself **isn't blocked by ad blockers** or the Brave browser.
- Can create tags with the main and an alternative version if the user doesn't accept cookies.
- It allows more **complex triggers**. This is particularly useful to better manage tags together with cookie consent
- I can **add triggers and tags** either from one ot more JavaScript files or from a web page / template, also using a Wordpress content block.
- Can **use Google Analytics events to trigger other non-GA tags**.

## How does it work?

When something is pushed to the `dataLayer` it checks all the tags and fire those that match. It has triggers that can watch anything that happens in a page. It also has variables, can use consent mode, has logs any many other features. 

## Features summary

- **dataLayer** - It uses the `dataLayer` object, so many websites already have triggers that it can use
- **Tags** - Send information to one service and can be fired by one or more triggers.
- **Triggers** - Watch something that happens in a page (including page loading) and fire one or more tags. With this tag manager you can control exactly what information is sent to the tags.
- **Variables** - Get values about the web page, website or the user's browser.
- **Last parameters** - Keeps track of the last values sent by dataLayer objects. Last params can also be used in triggers to perform math operations and/or fire tags that when a sequence of triggers happen. 
- **Consent functions** - Help to integrate the tag manager with cookie or tracking consent dialogs.
- Many logs:
  - **Logs** - Manual records of tags that have fired or triggers.
  - **Run logs** - Already processed dataLayer objects
  - **Debug mode** - When enabled outputs stuff to the developer console.
  - **Inspect dataLayer** - All triggers output something to the dataLayer. You can inspect it to check what events have happened in the page.
- Create tags with **image pixels** - Image pixels don't add 3rd party JavaScript that can collect more data on your users.
- Create tags with **cookieless image pixels** - Prevents an image pixel from adding a cookie in your user's browser. 
- Tags that **inject html** in your pages
- **Default triggers**:
  - Dom ready
  - Window loaded
  - Hash changed
- **Recommended triggers**:
  - Consent updated
