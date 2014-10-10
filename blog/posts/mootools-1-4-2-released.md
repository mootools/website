---
title: "MooTools 1.4.2 Released"
date: "Fri, 02 Dec 2011 21:03:31 +0000"
author: "Olmo Maldonado"
tags: "all"
permalink: "2011/12/02/mootools-1-4-2-released/"

---
Today we release MooTools Core 1.4.2 which is a small maintenance release. Upgrading from 1.4.1 should not cause any backward incompatibilities. We recommend all users upgrade to 1.4.2 as soon as possible.

<!--more-->

### Fixes
* [#2073](https://github.com/mootools/mootools-core/issues/2073): Reduced redundant call to `onTimeout` if `async` option is `true`.
* [#2083](https://github.com/mootools/mootools-core/pull/2083): Fixes `Element.clone` in IE. 
* [#2085](https://github.com/mootools/mootools-core/issues/2085): All specs are green across.
* [#2110](https://github.com/mootools/mootools-core/issues/2100): `Element.erase('class')` did not clear the class.
* [#2113](https://github.com/mootools/mootools-core/issues/2113): `button.set('type', 'button')` is now fixed for [webkit bug](https://bugs.webkit.org/show_bug.cgi?id=14439).
* [#2116](https://github.com/mootools/mootools-core/issues/2116): Fixes `Element.fade` chain.
* [#2118](https://github.com/mootools/mootools-core/issues/2118): `$uid` method is no longer exposed

### Improvements
* [#2089](https://github.com/mootools/mootools-core/issues/2089): Added support for native `mouseenter` and `mouseleave`. 
* [#2134](https://github.com/mootools/mootools-core/issues/2134): Deprecates the [MooTools Core Specs](http://github.com/mootools/mootools-core-specs) repository in favor of including the specs in the Core repo. Due to ease of development.
* Series of new specs and refactoring of old specs. Specs are all passing and much faster.
* [#2138](https://github.com/mootools/mootools-core/pull/2138): Native `Element.fireEvent` in IE is now accessible in via `Element._fireEvent`.

### [Known Issues](https://github.com/mootools/mootools-core/issues?milestone=&page=1&state=open)
* Documentation fixes/additions for `Element.NativeEvents`, `Fx`, `Request.JSON`, and conflicts between `Array` and `Elements` methods.
* `Object.each` enumeration
* Possible leak with `Element.adopt`
* IE returns methods for some Element attributes.
* `Element.Delegation` problem with non-elements.

These issues will be fixed subsequently prior to release of the next maintenance release.

### Get it!

* [Download MooTools Core 1.4.2](http://mootools.net/download); [Build MooTools Core 1.4.2](http://mootools.net/core/)
* Fork / clone [MooTools Core 1.4.2 from GitHub](http://github.com/mootools/mootools-core/tree/1.4.2), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Google CDN](http://code.google.com/apis/ajaxlibs/documentation/index.html#mootools) (will be updated soon)
* [Browse the Documentation for Core & More.](http://mootools.net/docs)

### Contribute

These fixes and improvements would not have happened if you didn't submit an issue (ticket) to the [MooTools Core Issues](https://github.com/mootools/mootools-core/issues), or reporting your problems in the [MooTools User Group](https://groups.google.com/forum/#!forum/mootools-users). Send us your (MooTools) issues (or feature requests) so that your favorite JavaScript framework keeps getting better.
