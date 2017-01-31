---
title: "MooTools Core 1.3 Stable and MooTools More 1.3RC"
date: "Mon, 11 Oct 2010 21:11:51 +0000"
author: "Christoph Pojer"
tags: "all,releases"
permalink: "2010/10/11/mootools-core-1-3-stable-and-mootools-more-1-3rc/"

---
Good news, everyone! We are extremely happy to announce the official release of MooTools Core 1.3 after almost a year of development. You might call us perfectionists, but we’re now ready to call the 1.3 release complete and stable. For those of you who have been waiting to make the switch, now would be the perfect time. In addition, MooTools Core 1.3 is fully backwards compatible with *all* documented functionality of MooTools Core 1.2, but more on that later.

<!--more-->

MooTools Core 1.3 brings the following new and improved features:

### Core

We have revised the whole base of our Core framework to speed up MooTools, provide an even more beautiful API and to make it future-proof. In order to reduce the number of global variables, we have moved all $-prefixed functions into the most appropriate namespaces available (`$splat` → `Array.from`, etc…). In short, with 1.3 you are getting the best MooTools experience ever.

### Slick

MooTools Core 1.3 includes Slick, our new standalone selector engine. Slick is a new official MooTools project developed by [Thomas Aylott](http://subtlegradient.com/), [Fabio Costa](http://github.com/fabiomcosta) and [Valerio Proietti](http://mad4milk.net) with help from a vast assortment of JavaScript heroes, villains, trolls and kings.

Even if you can't use MooTools Core in a project, you can still use Slick! It's standalone, so instead of Slick requiring anything in MooTools, Core now heavily relies on everything that is Slick.

Slick supports almost every selector you could ever think of and paves new ground with tons of new selectors that you may never have thought possible. The engine is incredibly customizable and supports ninja magic such as *reverse combinators*.

**Slick is unparalleled in its accuracy!** We created an implementation agnostic test suite called the SlickSpec. It includes over 3,000 tests that cover the gamut from the wildest unicode edge case to insanely complex interactions when switching between multiple contexts and documents in more doctypes than you could `stick.shake()` at. Not to mention the obligatory bizarre browser-specific bug fixes and workarounds. We haven't kept all this goodness to ourselves, we've worked hard to implement this test suite in a way that all other selector engines can use it.

Stay tuned in the coming days and weeks. We will certainly be posting much more about Slick and release a dedicated website for it.

Some Examples:

*All div elements and p with the class 'moo'*

    myElement.getElements('div, p.moo');

*All direct child div elements with the class 'cow'*

    myElement.getElements('> div.cow');

*Search for the first parent that matches 'div.cow', matches the next 'div' sibling and returns the first input element that it contains. Ain't that awesome?*

    myElement.getElement('! div.cow ~ div input');

1. Using the `barF` iframe document as the starting point context
2. Find me the first `div`
3. whose direct parent is a `blockquote`
4. whose next sibling is a `ul`
5. who contains an element with the id `foo`.

<pre><code>Slick.find(barF, '#foo ! ul !~ blockquote > div');</code></pre>

[Interactive example](http://jsfiddle.net/DFdpA/2/)

### Element

With the addition of Slick and its new standalone CSS selector parser, we gained the ability to create elements using a CSS expression. I promise that you will love this feature!

	new Element('div#cow.moo.big[data-size=5]');

### Other Stuff in Core 1.3

* Revised `Core.js`, added even more abstractions
* Fixes for a lot of element attributes (`maxlength`, etc…)
* New feature tests further minimize reliance on browser detection
* New `Browser.js` for the rare times when feature detection doesn't cut it
* New `DOMReady` implementation improves speed and fixes edge case bugs
* `Array.each` now chains! *Yes, indeed.*
* Support for touch events on breakthrough communication devices
* Array: `forEach`, `map`, `some`, `every` and `filter` now behave according to the ES5 Spec in IE (skipping undefined values)
* IE opacity style fixes
* If you build without 1.2 compatibility, Hash is gone. MooTools More 1.3 will provide `Hash` from now on.
* `Elements` is now an array-like-object instead of a real array.
* Additions to `Request` -- authentication, `onprogress` and other cool stuff
* Numerous stability improvements
* ... and more!

### Roll your own with Packager

With MooTools Core 1.2.5 and Core 1.3 we have introduced new headers in all of our JavaScript files that allow you to build your own custom edition of MooTools from the command line. Every file can now "provide" and "require" certain functionality. For example, `Class.js` provides "Class" and requires "Array, String, Function, Number". Dependencies can even be specified cross-package; one GitHub repository equals a package and thus can be registered to Packager. You can find more information about Packager and a detailed README on [kamicane/packager on GitHub](http://github.com/kamicane/packager).

<style type="text/css">
a.cpojer {
  display: inline-block;
  padding: 4px;
  outline: 0;
  color: #6B7B95;
  -webkit-transition-duration: 0.25s;
  -moz-transition-duration: 0.25s;
  -o-transition-duration: 0.25s;
  transition-duration: 0.25s;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  transition-property: transform;
  -webkit-transform: scale(1) rotate(0);
  -moz-transform: scale(1) rotate(0);
  -o-transform: scale(1) rotate(0);
  transform: scale(1) rotate(0);
}
a.cpojer:hover {
  background: #6B7B95;
  text-decoration: none;
  color: #fff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  -webkit-transform: scale(1.05) rotate(-1deg);
  -moz-transform: scale(1.05) rotate(-1deg);
  -o-transform: scale(1.05) rotate(-1deg);
  transform: scale(1.05) rotate(-1deg);
}
</style>
All you need to do is clone the GitHub repositories that you need, register them with Packager and build. Packager will calculate all the dependencies from the source files in your registered packages and hand you a freshly baked copy of MooTools with all the goodness you need and nothing you don't. You get all that magical goodness for free, invented by our amazing [Valerio Proietti](http://github.com/kamicane) and honed to perfection by the MooTools Developers. You can find a lot of packager ready plugins for MooTools Core 1.3 on [@kamicane's GitHub](http://github.com/kamicane) or <a href="http://github.com/cpojer" class="cpojer">@cpojer's GitHub</a> (It's-a-me!).

If you prefer Python, fear not! There is also an implementation using Django called [Depender](http://github.com/anutron/mootools-depender) which allows you to do on-the-fly-building and compressing of your files.

### Function.prototype.bind and Element.get with multiple arguments

We've had our own implementation of `Function.prototype.bind` in MooTools Core long before the ECMAScript 5 Standard was a twinkle in Douglas Crockford's eye. Given that we fully support ES5, we have changed our implementation to match this new standard. However, you will only get the new implementation if you drop the 1.2-compatibility-layer.

`Element.get` used to be able to work both as a setter and getter. As described a few months ago when we announced 1.3 beta2, we are now changing this behavior to ensure a consistent API.

The issues that may arise with these two changes are described in the [Update Guide from 1.2 to 1.3](http://github.com/mootools/mootools-core/wiki/Update-from-1.2-to-1.3). If you experience any problems while updating or upgrading, feel free to jump in on IRC (#mootools on irc.freenode.net) or post on the [Mailing List](http://groups.google.com/group/mootools-users) so we can help you get your websites and apps running!  
Don't forget that you can use [jsFiddle.net](http://jsfiddle.net/) to help the community answer your specific questions.

### Testing
Thomas has always encouraged (and by that I mean forced) everyone to do test-driven-development. The only problem was that our old spec engine took forever to run in fast browsers. In slow browsers you were able to drink a coffee while watching the specs run. A few months ago, Arian and I rewrote our current engine which is now used by all major MooTools projects. It is still a work-in-progress and you will hear more about testing in later blog posts. The good news is that with MooTools Core 1.3 we have specifications that cover 95 % of the code base and all of our code is tested when you run the specs, which now takes less than two seconds.

### MooTools More 1.3RC

After literally hundreds of bug fixes, plenty of new features and even a few new team members, we feel that it is the right time to provide a release-candidate of MooTools More 1.3 so that you can instantly get started with 1.3. You will find more information about MooTools More and all its new goodies very soon (once it loses the RC tag).

### Get it while it's hot!

* [Download MooTools Core 1.3](/download); [Build MooTools Core 1.3](/core/)
* [Build MooTools More 1.3RC](/more-rc/)
* [Update from 1.2 to 1.3](http://github.com/mootools/mootools-core/wiki/Update-from-1.2-to-1.3) with 1.2 compatibility.
* [Upgrade from 1.2 to 1.3](http://github.com/mootools/mootools-core/wiki/Upgrade-from-1.2-to-1.3) and drop 1.2 compatibility.
* Fork / clone [MooTools 1.3 from GitHub](http://github.com/mootools/mootools-core/tree/1.3), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Read the commit logs](http://github.com/mootools/mootools-core/commits/1.3) to see precisely what has changed.
* [Browse the Documentation for Core & More.](/docs)
* Please report any bugs you can find on [Lighthouse](https://mootools.lighthouseapp.com/projects/2706-mootools/tickets), our bug tracker.
