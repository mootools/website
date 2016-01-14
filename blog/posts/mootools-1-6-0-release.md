---
title: "1.6.0 is out!"
date: "Thu Jan 14 2016 12:00:00 +0000"
author: "Sérgio Crisóstomo"
tags: "all,releases"
permalink: "2016/01/14/mootools-1-6-0-release/"

---


Today marks the release of MooTools Core and More versions `1.6.0`. This is a _minor_ revision that delivers a number of bug fixes as well as the introduction of new features.

The main new adition is Class.Thenable which is a new Class mixin that can be used in Promise style flows by using its `then` method. When implemented in a Class, it makes the class "thenable" in the [Promises/A+][] sense of the word, meaning it can be used in Promise style flows by using its `then` method.

The implementation, however, is more than just a "then" method. Any instance of a Class implementing `Class.Thenable` is a `Promises/A+` compliant object (generally referred to as "a Promise") with only one exception: it is possible to reset the Class's value resolution state fully (rejecting pending reactions, and starting empty) to support a Class instance living for longer than just the lifetime of one value resolution.

Example using Request:

```javascript
var request = new Request();
request.send().then(function(response){ console.log(response.text); });
```

Example hooking into a native Promise:

```javascript
var request = new Request();
var promise = Promise.resolve(request);
request.send();
promise.then(function(response){ console.log(response.text); });
```


You can find this new version `1.6.0` in the website or within the `dist` folder of the `1.6.0` tag (Core).  


### Warnings:

**IE warning:** This will be the last version to support old IE browsers. Next _minor_ and/or _major_ versions should be only IE11+ compatible. We might still release some _patch_ in the `1.6.x` version if needed.

**Array.from deprecated, now called Array.convert:** Following the conclusion of the ES6 specs we know now that `Array.from` will have a different implementation than the one MooTools uses.  
Because of this we renamed `Array.from` to `Array.convert` to not overwrite the Native implementation.  
We kept it as it was though in the _compat layer_ for compatibility reasons if you really to use it still.  

To keep the API consistency we changed also the name of the method in `Function`, `Number` and `String` Types.


---

The main changes in this release are:

#### Core:

* Rename `.from` method in Array, Function, String and Number [(#2758)](https://github.com/mootools/mootools-more/pull/2758)[(#2760)](https://github.com/mootools/mootools-more/pull/2760)
* New feature: Class.Thenable [(#2743)](https://github.com/mootools/mootools-more/pull/2743)
* Add Safari 9 to Sauce Labs tested browsers [(#2749)](https://github.com/mootools/mootools-core/pull/2749)
* Added ESLint to Grunt specs to keep code styled and clean [(#2748)](https://github.com/mootools/mootools-core/pull/2748)
* Gruntfile refactor [(#2741)](https://github.com/mootools/mootools-core/pull/2741)
* MooTools specs goes Mocha [(#2737)](https://github.com/mootools/mootools-core/pull/2737)
* Specs upgrade, refactor and cleanup. Huge specs cleanup by Tim [(#2736)](https://github.com/mootools/mootools-core/pull/2736)
* Fix so the legacy `$pick` gets exported to global  [(#2735)](https://github.com/mootools/mootools-core/pull/2735)
* Fix so `Event` Class gets exported to global  [(#2733)](https://github.com/mootools/mootools-core/pull/2733)


#### More:

* Add extra aliases to Assets package's description [(#1335)](https://github.com/mootools/mootools-more/pull/1335)
* Added ESLint to Grunt specs to keep code styled and clean [(#1327)](https://github.com/mootools/mootools-more/pull/1327)
* New feature: new option `keepOpen` to Accordion [(#1333)](https://github.com/mootools/mootools-more/pull/1333)
* New feature: added sort order to `onSort` function arguments [(#1332)](https://github.com/mootools/mootools-more/pull/1332)
* Fix String.extras regex to not mix self closing tags [(#1328)](https://github.com/mootools/mootools-more/pull/1328)
* Fix `validate-match` "matchName" when containing spaces[(#1186)](https://github.com/mootools/mootools-more/pull/1186)
* Fix `unDraggableTags` in Drag [(#1159)](https://github.com/mootools/mootools-more/pull/1159)
* Fix to `validate-reqchk-byname` [(#1329)](https://github.com/mootools/mootools-more/pull/1329)
* New feature: added IPv6 compatibility to URI.regex  [(#1322)](https://github.com/mootools/mootools-more/pull/1322)
* Fix semicolon in end of file that broke packager [(#1319)](https://github.com/mootools/mootools-more/pull/1319)

[Promises/A+ tests]: https://www.npmjs.com/package/promises-aplus-tests
[Promises/A+]: https://promisesaplus.com/
