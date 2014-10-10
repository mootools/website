---
title: "MooTools More 1.2.4.2"
date: "Tue, 27 Oct 2009 19:50:23 +0000"
author: "Aaron Newton"
tags: "all"
permalink: "2009/10/27/mootools-more-1-2-4-2/"

---
There's nothing like releasing code to uncover glitches. Since last week's release of MooTools Core 1.2.4 and MooTools More 1.2.4.1, there have been a few bugs reported and we wanted to get the fixes out to you as quickly as possible. Most of these are minor. We have unit tests for all the classes we release, but writing a test for every possible configuration is tough, and it's the real world that sees these features used in ways we can't imagine.

Today's release offers no new features, a lot of very minor fixes (to docs and the like), and the restoration of a few changes to the API that weren't intended (Tips and Fx.Slide, in particular).

<!--more-->

Here's what's in 1.2.4.2:

* [roughly a dozen issues fixed or closed (in lighthouse)](https://mootools.lighthouseapp.com/projects/24057-mootoolsmore/tickets?q=milestone%3A1.2.4.1)
* Numerous documentation updates
* Spinner: Adding a getSpinner method to Request in Spinner's refactoring of that Class
* Spinner: Fixing default styles
* Form.Validator, Date: Added Ukrainian translations
* Date: Added new Date parser (parses "Thu Oct 22 08:11:23 +0000 2009")
* Fx.Accordion: handling the alwaysHide option so you can still have returnHeightToAuto set to true (see [this discussion](http://groups.google.com/group/mootools-users/browse_thread/thread/27004d2d0dc227c2u))
* Tips: Restoring arguments to the show/hide events; tip no longer defaults to display:none (this restores the previous behavior)
* Fx.Reveal: stores cssText whenever it starts a transition and restores it when it finishes or is canceled, leaving the element without a bunch of inline styles, as if you'd just done setStyle('display', 'block'/'none')
* Fx.SmoothScroll: adding a "scrolledTo" event
* Drag: added new 'stopPropagation' option
* HtmlTable.Select: ensuring that instances only delegates to immediate children (for nested tables)
* HtmlTable.Sort.js: detects and sorts date columns more accurately, handles negative integers and floats
* Reorganized scripts json so Depender can implement Log

As always, if you find any issues, [file tickets](https://mootools.lighthouseapp.com/projects/24057-mootoolsmore) and we'll get on it.