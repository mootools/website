---
title: "MooTools 1.2.1 Released"
date: "Thu, 16 Oct 2008 21:02:50 +0000"
author: "Tom Occhino"
tags: "all,releases"
permalink: "2008/10/16/mootools-121-released/"

---
In keeping with our new pledge to release more often, we've been working hard lately to get 1.2.1 ready for release, and we're finally happy with it.  This release brings a ton of bug fixes, and is a drop in replacement for 1.2.0.  (That's right, no breaking changes!)

<!--more-->

####What's new?

Element.Properties.html (<code>element.set('html', html);</code>) now works even with select and table elements in Internet Explorer.  Element:clone is also now faster than ever, and retains the values of form elements being cloned.  A lot of work has also been done to fix some bugs in Class.js, and Safari 2 support is now back.  With the help of Daniel Steigerwald, we've also cleaned up quite a few memory leaks in IE related to events and Element storage, and destroyed elements are now more effectively destroyed.

For a complete list of changes, see the changelog on GitHub...

#### Links:

- [Changelog](http://github.com/mootools/mootools-core/tree/1.2.1/CHANGELOG)
- [MooTools 1.2.1 Download](http://mootools.net/download)
- [MooTools 1.2.1 Builder](http://mootools.net/core)

#### What's next?

We are going to keep going through all the tickets, and try to start fixing the bugs that have cropped up with some of the plugins. 1.2.2 might also see a few new features as we start preparing for some exciting changes and additions we have planned for 1.3.

MooTools 1.2 will be the last version of MooTools to support Safari 2 and Opera 9.5.  These browsers have been advancing at a tremendous pace, and have a user base which updates regularly, so we don't think this will be much of an issue when the time comes.  Note that you don't need to worry about this for quite some time yet because 1.3 is a long way off, but we just thought this was a good place to let everyone know.