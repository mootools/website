---
title: "MooTools 1.2.6 Released"
date: "Tue, 19 Feb 2013 17:12:28 +0000"
author: "Cristian Carlesso"
tags: "all"
permalink: "2013/02/19/mootools-1-2-6-released/"

---
This is a new maintenance release for the old 1.2 series. The new ECMAScript 6 specification has a proposal for [String.prototype.contains](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/contains) that unfortunately [conflicts](https://github.com/mootools/mootools-core/issues/2402) with the [MooTools implementation of contains](/docs/core/Types/String#String:contains).

Firefox 18 already ships this new version of contains. This is not a problem for MooTools 1.3.x and onward, but this breaks MooTools 1.2.5, especially the code inside the MooTools framework that utilized this method, like selectors.

This new 1.2.6 release solves these issues by overwriting the native version with the MooTools version of `String.prototype.contains`.

For the next MooTools version, 1.5, we will use the standard ES6 version. If you rely on the old behavior (which is only when you use the second argument), it will be possible to use the old version through the compatibility layer.

- [Download 1.2.6](/download/version/1.2.6)
- [Or upgrade to 1.4.5](/download)
- [See changes on GitHub](https://github.com/mootools/mootools-core/compare/1.2.5...1.2.6)