---
title: "MooTools Core and More 1.5 are here! "
date: "Mon, 19 May 2014 21:38:19 +0000"
author: "Sérgio Crisóstomo"
tags: "all,releases"
permalink: "2014/05/19/mootools-1-5-is-here/"

---
##### More stable and well tested than ever

1.5 is a HUGE bug fix release with roughly 240 commits addressing new browsers that have entered the market as well as new features in the JavaScript language. The team spent a *ton* of time instrumenting the tests to run against [Travis CI](https://travis-ci.org/) and [Sauce Labs](https://saucelabs.com/) so that the source code would be easier to test. This will help to make new contributions, fixes and features to the framework and release much more rapidly. 

It's easy to underestimate the value of all the work that went into the project over the past two months.

<!--more-->

### What's different in version 1.5

The main things in this release are:

#### Core:

* Swiff is gone from Core (now found in More)
* Many of the user agent properties on `Browser` are now deprecated and MooTools depends on feature detection instead
* Added support for IE11 so that `Browser.ie` continues to work, but is undefined in compatibility mode. See this [pull request](https://github.com/mootools/mootools-core/pull/2569) for additional information
* A *tremendous* amount of work done to overhaul the unit tests, the test runner and integration with Travis CI and SauceLabs. This new test suite can also run locally, opening and testing local browsers
* Speed improvements for managing Element classes (using the new classList API available in modern browsers)
* `appendHTML` method added to Element
* `Fx.isPaused()` method added to Fx
* `String.contains` is now implemented according to the new ES6 standard
* `getComputedStyle` is now the default engine behind the `getStyle()` method
* Build system now uses Grunt ([http://gruntjs.com/](http://gruntjs.com/))

#### More:

* Spinner now has _[WAI-ARIA](http://www.w3.org/WAI/intro/aria)_ support
* Form Validator now uses event delegation to watch inputs and whatnot
* New Array.Extras method: `Array.pluck`
* New Event `move` in Slider.js
* Numerous updates to language files
* Swiff moved to More, from Core
* Added support for `:keys(+)` in Element.Event.Pseudos.Keys
* Dependency on Core's now deprecated `Browser` flags removed
* New test infrastructure: Grunt-Karma-Jasmine, Travis CI and Saucelabs

### Get 1.5 while it's hot

Use the web builder for [core](/core) or [more](/more) to download your copy, download core from the [download page](/download), or:

    git clone https://github.com/mootools/mootools-core
    cd mootools-core
    grunt packager # see the Gruntfile.js and README for additional build and test options
    
