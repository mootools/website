---
title: "MooTools More 1.2.4.3, 1.2.4.4"
date: "Wed, 10 Feb 2010 02:10:29 +0000"
author: "Aaron Newton"
tags: "releases"
permalink: "2010/02/09/mootools-more-1-2-4-3/"

---
<strong>UPDATE</strong>: 1.2.4.4 is also released; there was a new bug in Tips introduced in 1.2.4.3 that was immediately patched.

This is mostly a bug fix release.

* Nearly 50 bug fixes ([see the milestone for 1.2.4.3 in Lighthouse](https://mootools.lighthouseapp.com/projects/24057/milestones/54424-1243)).
* Keyboard:
  * Added some support for just pressing 'shift', 'control', or 'alt'
  * Added a bunch of keycodes for Mac compatibility
* Keyboard.Extras:
  * Support for "shortcuts" which are keyboard entries that have names and descriptions.
  * Also provides methods for listing all the active shortcuts as well as allowing a shortcut to be rebound (for instance, if you were to allow the user to choose a key for a shortcut).
  * Added a change event to Keyboard.manager whenever any keyboard is activated.
* Tips:
  * NEW Tips option "windowPadding" allows you to reduce or expand the virtual size of the window for tip positioning. Defaults to `{x:0, y:0}`. You can use that is a workaround for the scrollbars not being considered when calculating tip positions.
* HtmlTable:
  * fixed numerous bugs filed in Lighthouse
  * HtmlTable can no longer apply it's click behavior more than once.
  * HtmlTable now pushes headers defined in the options.
  * Reworked HtmlTable's DOM a bit to allow for positioning of the sort icon
  * Added new set method for headers and footers.
  * Fixed error in HtmlTable.Parsers when sorting by date. format('db') was being applied to the text and not the date object.
* Array: 
  * Added Array.shuffle
* Request.JSONP:
  * Made JSONP pass all arguments, not just the first, to its complete/success methods; [see this discussion on the google group](http://groups.google.com/group/mootools-users/browse_thread/thread/9cfa52bf0cf05bac).
* Fx.Slide:
  * Added an option to specify the wrapper element for Fx.Slide. Was already present in the docs but could not be passed as an option.
* Mask:
  * Added options for the IframeShim for Mask

[Download it with the MooTools More builder](http://mootools.net/more).

As usual, if you find any issues, [file a ticket at lighthouse](https://mootools.lighthouseapp.com/projects/24057/). There are already [tickets open for 1.2.4.4](https://mootools.lighthouseapp.com/projects/24057-mootoolsmore/milestones/60506-1244) that we are not including fixes for in this release. Look for a release for these things in the next few weeks.