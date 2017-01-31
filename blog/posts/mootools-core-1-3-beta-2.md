---
title: "MooTools Core 1.3 beta 2"
date: "Fri, 04 Jun 2010 03:46:19 +0000"
author: "Christoph Pojer"
tags: "all"
permalink: "2010/06/03/mootools-core-1-3-beta-2/"

---
Over the past couple of weeks we have got a lot of great responses over the initial beta of MooTools Core 1.3. We have since
improved both the code and the documentation in order to release a second beta. 

Most notably we have removed the dependency on Hash. If you build 1.3 without compatibility you won't get
the Hash object no more. But fear not, we have added [Object.js](http://github.com/mootools/mootools-core/tree/1.3b2/Source/Types/Object.js) which brings you all the Hash methods as generics. Everything else is really minor, has to do with stability or was meant to improve code quality ([we](http://github.com/mootools/mootools-core/commit/d5bf4d62c4b9515b8aa168b7c0a2f911650a73ed) [really](http://github.com/mootools/mootools-core/commit/e05f35b8f009ee5587da942a398c142b0179befb) [take](http://github.com/mootools/mootools-core/commit/172779f92d4123b88cf3b95fea2c3b16e63a2b2a) [this](http://github.com/mootools/mootools-core/commit/16fd136c59ce6ee17612863132ef386be3ec968f) [seriously](http://github.com/mootools/mootools-core/commit/7e1dbb68596a7cf0ad706a278e9ec595d5930e35)).

We are trying hard to provide you with a consistent and meaningful API so we have decided to introduce one tiny tweeny minor breaking change. If you were setting `tween`, `morph`, `load`, or `send` options using the getter (`element.get('tween', {...options here...})`) that will not work anymore. You will have to use `set`(`element.set('tween', {...options here...})`), as `get` needs to be a pure getter.

All in all the new beta is faster, better, more stable - in a word - sexier. Tell us how it works for you.

### Download

- Download the [built 1.3 beta 2 release](/download/get/mootools-core-1.3b2.js).
- [Fork / clone MooTools 1.3](http://github.com/mootools/mootools-core/tree/1.3b2) from github, and build it yourself with [Packager](http://github.com/kamicane/packager).
- Read the commit logs to [see what has changed](http://github.com/mootools/mootools-core/commits/1.3b2).
- Wondering how those amazing new methods are called? You can [browse our markdown documentation](http://github.com/mootools/mootools-core/tree/1.3b2/Docs/) right on github.
- And don't forget to [report any issue](https://mootools.lighthouseapp.com/projects/2706-mootools/tickets) you find with the beta, compatibility or not! The more reports we get, the fastest we'll have a final release.

Thanks to everyone who helped polishing the 1.3 release.
I would really like to thank <a href="http://www.aryweb.nl/">Arian Stolwijk</a> (<a href="http://twitter.com/astolwijk">@astolwijk</a>) who has contributed significant improvements to the documentation.