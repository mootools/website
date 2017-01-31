---
title: "MooTools 1.4.4 Released"
date: "Tue, 07 Feb 2012 16:30:11 +0000"
author: "Olmo Maldonado"
tags: "all,releases"
permalink: "2012/02/07/mootools-1-4-4-released/"

---
Today we release **MooTools Core 1.4.4** which is a **critical** maintenance release. 1.4.3 release introduced a bug as a result of fixing another bug. Specifically, 1.4.3 did not allow custom attributes (e.g. `data-` or non-standard attributes). [See this issue](https://github.com/mootools/mootools-core/issues/2247) for a full explanation and solution.

We recommend that all users upgrade to 1.4.4 as soon as possible.

<!--more-->

### Fixes
* [#2160](https://github.com/mootools/mootools-core/issues/2160): Fx.Tween/Fx.Morph problem with '%' unit
* [#2175](https://github.com/mootools/mootools-core/issues/2175): IE Leak: Array.flatten
* [#2178](https://github.com/mootools/mootools-core/issues/2178): IE doesn't set value when creating element if css attributes are used
* [#2241](https://github.com/mootools/mootools-core/issues/2241): Slick.finder index selector
* **[#2247](https://github.com/mootools/mootools-core/issues/2247): Element.get not reading custom attributes in IE7/8**
* [#2248](https://github.com/mootools/mootools-core/issues/2248): contains causes "Out of Stack Space" in IE
* [#2252](https://github.com/mootools/mootools-core/issues/2252): Element.getParents doc clarification
* [#2262](https://github.com/mootools/mootools-core/issues/2262): SVGAnimatedString causes Slick error
* [#2266](https://github.com/mootools/mootools-core/issues/2266): Calling setOpacity with null does not remove the style 
* [#2275](https://github.com/mootools/mootools-core/issues/2275): Update Slick to 1.1.7

### [Known Issues](https://github.com/mootools/mootools-core/issues?sort=created&direction=asc&state=open&page=1&milestone=9)
* [#2184](https://github.com/mootools/mootools-core/issues/2184): IE9 on Windows Server throws exception; can't continue
* [#2194](https://github.com/mootools/mootools-core/issues/2194): Function#bind ES5 bug when bound function is called as part of a new expression
* [#2199](https://github.com/mootools/mootools-core/issues/2199): Browser.version always returns the same for Android 2-4
* [#2207](https://github.com/mootools/mootools-core/issues/2207): Fx.cancel() should clear animation so Fx.resume() will not continue it
* [#2214](https://github.com/mootools/mootools-core/issues/2214): IE8 - Cannot inject into window.opener
* [#2225](https://github.com/mootools/mootools-core/issues/2225): IE in-page memory leak when using removeChild
* [#2236](https://github.com/mootools/mootools-core/issues/2236): IE8 tween/morph clip:rect breaks
* [#2243](https://github.com/mootools/mootools-core/issues/2243): Memory leak with request class
* [#2245](https://github.com/mootools/mootools-core/issues/2245): Element.getOffsets() is broken in iOS 4.3 if using -webkit-transform
* [#2265](https://github.com/mootools/mootools-core/issues/2265): new Element('style', {text: ''}) throws IE exception
* &hellip; [and more](https://github.com/mootools/mootools-core/issues?sort=created&direction=asc&state=open&page=1&milestone=9)

These issues will be fixed subsequently prior to release of the next maintenance release, **1.4.5**.

### Contribute

These fixes and improvements would not have happened if you didn't submit an issue (ticket) to the [MooTools Core Issues](https://github.com/mootools/mootools-core/issues), or reporting your problems in the [MooTools User Group](https://groups.google.com/forum/#!forum/mootools-users). Send us your (MooTools) issues (or feature requests) so that your favorite JavaScript framework keeps getting better.


### Get it!

* [Download MooTools Core 1.4.4](/download); [Build MooTools Core 1.4.4](/core/)
* Fork / clone [MooTools Core 1.4.4 from GitHub](http://github.com/mootools/mootools-core/tree/1.4.4), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Google CDN](http://code.google.com/apis/libraries/devguide.html#mootools) (will be updated soon)
* [Browse the Documentation for Core & More.](/docs)