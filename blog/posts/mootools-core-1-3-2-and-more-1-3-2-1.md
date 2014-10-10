---
title: "MooTools Core 1.3.2 and More 1.3.2.1"
date: "Thu, 28 Apr 2011 20:23:28 +0000"
author: "Arian Stolwijk"
tags: "all"
permalink: "2011/04/28/mootools-core-1-3-2-and-more-1-3-2-1/"

---
Today we announce the simultaneous release of MooTools Core 1.3.2 and More 1.3.2.1. This is mostly a bugfix release and does not contain many new features. The most important fix is within our selector engine, Slick, which failed in some cases where the selectors began with an operator (ex. `~div`).

A new component has been added to MooTools More: Table. Table was slated to be added in MooTools Core 2.0, but we're making it available in MooTools More now. Table is similar to the JavaScript object literal, but where an object can only have a scalar value (string or number) as a key, Table can have any value as a key. Where the order of values in an object is not static like an array (by specification, usually browsers keep the order which they are defined), the values in Table will have a static order. These advantages come with a performance cost, where an object value is a direct look-up, Table uses `indexOf` which is less efficient, so use with care.

### Notable changes in MooTools Core include:

- Fixed Slick bug with `~div`-like selectors
- Fixed MooTools in the Node.js environment
- Fixed an exception in DOMReady in Chrome when the page with MooTools was in an IFrame
- Fixed `setOpacity` for very small numbers in IE
- Fixed an exception in FireFox 4 when MooTools tried to overwrite `document.head`
- Added the possibility to create elements with boolean values with an selector, e.g. `new Element('input[checked]');`

### MooTools More:

- Rewritten Element.Position which solved some issues 
- Added Table, as described above
- Ironed out some Event Delegation issues
- Additional fixes can be found at the [Lighthouse for 1.3.2.1](https://mootools.lighthouseapp.com/projects/24057/milestones/104271-1322)


### Get it!

* [Download MooTools Core 1.3.2](http://mootools.net/download); [Build MooTools Core 1.3.2](http://mootools.net/core/)
* [Build MooTools More 1.3.2.1](http://mootools.net/more/)
* Fork / clone [MooTools 1.3.2 from GitHub](http://github.com/mootools/mootools-core/tree/1.3.2), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Read the Core commit logs](http://github.com/mootools/mootools-core/commits/1.3.2) to see precisely what has changed.
* [Read the More commit logs](http://github.com/mootools/mootools-more/commits/1.3.2.1) to see precisely what has changed for More.
* [Browse the Documentation for Core & More.](http://mootools.net/docs)
* Please report any bugs you can find on [Lighthouse](https://mootools.lighthouseapp.com/projects/2706-mootools/tickets), our bug tracker.