---
title: "MooTools 1.4.5 Released"
date: "Mon, 27 Feb 2012 02:00:45 +0000"
author: "Arian Stolwijk"
tags: "all,releases"
permalink: "2012/02/26/mootools-1-4-5-released/"

---
__MooTools Core 1.4.5__ is a maintenance release for the 1.4 branch.

1.4.5 brings a critical bugfix for `Fx.CSS` which caused many troubles for tweening and morphing your element styles. The bug was caused by a fix in 1.4.4 which should improve animating other length units like `%` or `em` (see [#2160](https://github.com/mootools/mootools-core/issues/2160). Many of you noticed the bug and filled bugreports and also helped us testing this new release.

We have improved our tests and are planning to freeze the code for a new release for a longer period so we can gather more feedback to prevent potential regressions. If you're interested in testing a new release in your application, you can ping us on IRC (#mootools on freenode.net), Twitter ([@mootools](http://twitter.com/mootools) / [@astolwijk](http://twitter.com/astolwijk)) or in the [MooTools User Group](https://groups.google.com/forum/#!forum/mootools-users).

<!--more-->

### Fixes

- [#2280](https://github.com/mootools/mootools-core/issues/2280) - Fx.CSS breaks `Fx.Morph` and `Fx.Tween`
- [#2289](https://github.com/mootools/mootools-core/issues/2289) - `.setProperty()` should trigger `.toString()`

### Contribute

Send us issues (tickets) or feature requests to the [MooTools Core Issues](https://github.com/mootools/mootools-core/issues) or report your problems in the [MooTools User Group](https://groups.google.com/forum/#!forum/mootools-users). 

### Get it!

* [Download MooTools Core 1.4.5](http://mootools.net/download); [Build MooTools Core 1.4.5](http://mootools.net/core/)
* Fork / clone [MooTools 1.4.5 from GitHub](http://github.com/mootools/mootools-core/tree/1.4.5), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Google CDN][cdn] (which should be updated soon)
* [Browse the Documentation](http://mootools.net/docs)

[cdn]: http://code.google.com/apis/ajaxlibs/documentation/index.html#mootools