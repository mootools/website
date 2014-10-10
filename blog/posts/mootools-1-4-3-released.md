---
title: "MooTools 1.4.3 Released"
date: "Sat, 21 Jan 2012 17:59:21 +0000"
author: "Olmo Maldonado"
tags: "all,releases"
permalink: "2012/01/21/mootools-1-4-3-released/"

---
Today we release **MooTools Core 1.4.3** which is a small maintenance release. Upgrading from 1.4.2 should not cause any backward incompatibilities. We recommend that all users upgrade to 1.4.3 as soon as possible.

<!--more-->

### Fixes
* [#2109](https://github.com/mootools/mootools-core/issues/2109): IE7/8 getProperty returns functions
* [#2110](https://github.com/mootools/mootools-core/issues/2110): Documentation: Request.JSON's behaviour of onFailure
* [#2117](https://github.com/mootools/mootools-core/issues/2117): Document conflicts between Array and Elements methods
* [#2121](https://github.com/mootools/mootools-core/issues/2121): Missing Fx.options.frameSkip documentation.
* [#2126](https://github.com/mootools/mootools-core/issues/2126): Re-add undocumented `from` argument to Element.fade
* [#2127](https://github.com/mootools/mootools-core/issues/2127): Element.js memory leaks
* [#2146](https://github.com/mootools/mootools-core/issues/2146): Add Element.NativeEvents to docs
* [#2150](https://github.com/mootools/mootools-core/issues/2150): Add Fx.isPaused() method
* [#2152](https://github.com/mootools/mootools-core/issues/2152): Packaging issue. Build header and Core.js yml header collide
* [#2155](https://github.com/mootools/mootools-core/issues/2155): Add special note to Element.empty
* **[#2163](https://github.com/mootools/mootools-core/issues/2163): IE7 Crash with Mootools Core 1.4.2**
* [#2164](https://github.com/mootools/mootools-core/issues/2164): Cannot set numerical 0 values to form fields.
* [#2169](https://github.com/mootools/mootools-core/issues/2169): `Array#filter` should store `this[i]` in a variable before calling the callback.
* [#2170](https://github.com/mootools/mootools-core/issues/2170): `propertychange` on an input[type=radio] with this.checked fires standard onChange
* **[#2176](https://github.com/mootools/mootools-core/issues/2176): `uid` remnant which prevented proper cleaning of elements and their storage**
* [#2182](https://github.com/mootools/mootools-core/issues/2182): element.erase( 'html' ) sets content to text 'undefined'

### [Known Issues](https://github.com/mootools/mootools-core/issues?sort=created&direction=asc&state=open&page=1&milestone=8)
* [#2129](https://github.com/mootools/mootools-core/issues/2129): < IE9 sets width/height attribute once, and doesn't update on other loads
* [#2130](https://github.com/mootools/mootools-core/issues/2130): Object.each doesn't address IE DontEnum bugs like Object.extend and others
* [#2160](https://github.com/mootools/mootools-core/issues/2160): Fx.Tween/Fx.Morph problem with '%' unit
* [#2168](https://github.com/mootools/mootools-core/issues/2168): Fixes 2129.
* [#2175](https://github.com/mootools/mootools-core/issues/2175): IE Leak: Array.flatten
* [#2178](https://github.com/mootools/mootools-core/issues/2178): IE doesn't set value when creating element if css attributes are used
* [#2183](https://github.com/mootools/mootools-core/issues/2183): Incorrect event.key from some keypress events in Firefox
* [#2184](https://github.com/mootools/mootools-core/issues/2184): IE9 on Windows Server throws exception; can't continue
* [#2185](https://github.com/mootools/mootools-core/issues/2185): Fix #2184: IE9 on Windows Server throws exception; can't continue
* [#2188](https://github.com/mootools/mootools-core/issues/2188): Fixes #2178 - A input field should keep its value even when the type property is changed (in IE)
* [#2189](https://github.com/mootools/mootools-core/issues/2189): Uncaught TypeError: Property 'id' of object #<HTMLDocument> is not a function
* [#2193](https://github.com/mootools/mootools-core/issues/2193): Element clone storage again
* [#2194](https://github.com/mootools/mootools-core/issues/2194): Function#bind ES5 bug when bound function is called as part of a new expression
* [#2196](https://github.com/mootools/mootools-core/issues/2196): it's better for getStyle method always returns style value with px unit 
* [#2199](https://github.com/mootools/mootools-core/issues/2199): Browser.version always returns the same for Android 2-4
* &hellip; [and more](https://github.com/mootools/mootools-core/issues?sort=created&direction=asc&state=open&page=1&milestone=8)

These issues will be fixed subsequently prior to release of the next maintenance release, **1.4.4**.

### Contribute

These fixes and improvements would not have happened if you didn't submit an issue (ticket) to the [MooTools Core Issues](https://github.com/mootools/mootools-core/issues), or reporting your problems in the [MooTools User Group](https://groups.google.com/forum/#!forum/mootools-users). Send us your (MooTools) issues (or feature requests) so that your favorite JavaScript framework keeps getting better.


### Get it!

* [Download MooTools Core 1.4.3](http://mootools.net/download); [Build MooTools Core 1.4.3](http://mootools.net/core/)
* Fork / clone [MooTools Core 1.4.3 from GitHub](http://github.com/mootools/mootools-core/tree/1.4.3), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Google CDN](http://code.google.com//ajaxlibs/documentation/index.html#mootools) (will be updated soon)
* [Browse the Documentation for Core & More.](http://mootools.net/docs)