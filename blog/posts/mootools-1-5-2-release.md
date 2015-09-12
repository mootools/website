---
title: "1.5.2 is out!"
date: "Sun, 13 Sep 2015 12:25:41 +0000"
author: "Sérgio Crisóstomo"
tags: "all,releases"
permalink: "2015/09/13/mootools-1-5-2-release/"

---

Today we release MooTools Core versions 1.5.2. In this new version there are some fixes for raised issues and also some new stuff!

You can find the new version in the `dist/` folder of the Github repo or on the website.

The main things in this release are:

#### Core:

* Fix "Unspecified Error" in IE when calling getSize() on a node that isn't in the DOM [(#2648)](https://github.com/mootools/mootools-core/pull/2648)
* fix IE version detection in old IE [(#2653)](https://github.com/mootools/mootools-core/pull/2653)
* Protect 'contains' method in Array prototype [(#2654)](https://github.com/mootools/mootools-core/pull/2654)
* Fix httpOnly cookies [(#2676)](https://github.com/mootools/mootools-core/pull/2676)
* Fix Garbage Collect typo in Element Docs [(link)](https://github.com/mootools/mootools-core/commit/e4a340b33a2462419cd320519203404a766578ba)
* Fix mouseenter/mouseleave Readme where info was incorrectly placed below mousewheel [(#2681)](https://github.com/mootools/mootools-core/pull/2681)
* Fix camelCasing of -ms- prefixed properties in Element.Styles [(#2686)](https://github.com/mootools/mootools-core/pull/2686)
* Fix visibility when fade is chained [(#2597)](https://github.com/mootools/mootools-core/pull/2597)
* Fix event.key for keypress [(link)](https://github.com/mootools/mootools-core/commit/1781fa014d2e6b4eb089210d8710f7e13f9b297f)
* Fix non-enumerables iteration in old IE [(#2696)](https://github.com/mootools/mootools-core/pull/2696)
* Move Object.keys to Core.js, upgrade for in loops [(#2696)](https://github.com/mootools/mootools-core/pull/2696)
* Add pageshow and pagehide events [(#2701)](https://github.com/mootools/mootools-core/pull/2701)
* Fix for typeOf ($family property), when a Class extends a Native Type [(#2688)](https://github.com/mootools/mootools-core/pull/2688)
* Fix mapping of shift onkeypress [(#2703)](https://github.com/mootools/mootools-core/pull/2703)
* Fix relatedTarget in mouseenter and mouseleave [(#2697)](https://github.com/mootools/mootools-core/pull/2697)
* Fix warning for `input[type="email"]` [(#2705)](https://github.com/mootools/mootools-core/pull/2705)
* Fix Microsoft Edge UA string support to Browser [(#2716)](https://github.com/mootools/mootools-core/pull/2716)
* Fixed broken links in docs [(#2728)](https://github.com/mootools/mootools-core/pull/2728)
* Fixed wrong offset calculation because of floating point values [(#2437)](https://github.com/mootools/mootools-core/pull/2437)
* Added tests for [io.js](https://iojs.org/en/index.html) and [Node.js](https://nodejs.org/) versions (0.10 and 0.12) for Mootools Server version [(#2729)](https://github.com/mootools/mootools-core/pull/2729)

#### More:

* New feature: Class.Singleton [(#1285)](https://github.com/mootools/mootools-more/pull/1285)
* Fix tooltip to not show when empty [(#1299)](https://github.com/mootools/mootools-more/pull/1299)
* Added more Norwegian, Swiss, Argentinian translations
* Fix String.QueryString when converting `+` into spaces [(#1313)](https://github.com/mootools/mootools-more/pull/1313)
* Fix module definition of Drag, Slider, Sortables, and others to be consistent with others [(#1311)](https://github.com/mootools/mootools-more/pull/1311)
* Add touch events to Drag [(#1292)](https://github.com/mootools/mootools-more/pull/1292)
* Remove old callbacks in Request.JSONP.request_map [(#1315)](https://github.com/mootools/mootools-more/pull/1315)