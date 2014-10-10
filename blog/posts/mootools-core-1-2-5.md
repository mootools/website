---
title: "MooTools Core 1.2.5"
date: "Wed, 15 Sep 2010 23:17:15 +0000"
author: "Djamil Legato"
tags: "all,releases"
permalink: "2010/09/15/mootools-core-1-2-5/"

---
Today we're releasing MooTools Core 1.2.5, which can be considered the last version of the 1.2 series. 1.2.5 is a maintenance release, and contains fixes for the latest beta browsers, such as [Firefox 4 beta](http://www.mozilla.com/en-US/firefox/beta/), [Chrome 6](http://www.google.com/chrome) and IE9 beta. Below, a quick changelog:

* Fix for [fireEvent](/docs/core/Element/Element.Event#Element:fireEvent) under IE9 beta.
* Forcing MooTools [bind](/docs/core/Native/Function#Function:bind) implementation to work with the latest gecko / webkit beta browsers.
* Fixes HTML Elements creation in IE9 beta.
* Fixed Elements garbage collection in IE.

Or, if you prefer, you can have a look at the actual [code diff](http://github.com/mootools/mootools-core/compare/631d0674...1.2.5).

[Documentation](http://mootools.net/docs/core) has been updated accordingly and many new [Specs](http://github.com/mootools/mootools-core-specs/tree/master/1.2/) have been added. 

As usual, you can [quickly download it](/download) or [build your own version](/core).

Keep an eye out for the 1.3 release in the following days!