---
title: "MooTools 1.4.0"
date: "Sat, 10 Sep 2011 14:16:16 +0000"
author: "Arian Stolwijk"
tags: "all"
permalink: "2011/09/10/mootools-1-4-0/"

---
As of today a new version of MooTools is available. This includes MooTools Core and MooTools More. We've communicated a lot about changes for 2.0 but we also felt we had some good stuff that would benefit you directly which we wanted to add to the 1.x releases. This good stuff contains of course numerous bugfixes but mostly one important new feature for MooTools Core: Delegation. This 1.4 release should be fully _backward compatible_ with the MooTools 1.2 and 1.3 series'.

<!--more-->

### So all changes for 1.4.0:

- Move [Delegation][] into Core.
- ECMAScript 5 compatibility fixes. Among them are Function.bind, Array.map and String.trim
- Deprecate `Element.setOpacity()` and `Element.set('opacity')`. `Element.setStyle('opacity')` is the only correct way now (the same applies for getters).
- Disable the 1.2 compat layer by default in the builder.
- Revamp `Element.getProperty`, `Element.setProperty`. `Element.getProperty` uses `Slick.getAttribute` now to share this code and save some bytes.
- IE7 doesn't crash anymore when cloning an element twice.
- The [Selectors documentation][Selectors] is back and updated for Slick.
- Update Slick to 1.1.6
- Unified `change` event behavior across browsers.
- Renamed `Event` to `DOMEvent` so it will not [conflict](http://trac.webkit.org/changeset/93951) with the native `Event` object.

### Event Delegation

Event delegation is a common practice where an event listener is attached to a parent element to monitor its children rather than attach events to every single child element. It's more efficient for dynamic content or highly interactive pages with a lot of DOM elements.

<strong>Example</strong>

	var myElement = $('myElement');
	var request = new Request({
		// other options
		onSuccess: function(text){
		    myElement.set('html', text); // No need to attach more click events.
		}
	});
	// Adding the event, notice the :relay syntax with the selector that matches the target element inside of myElement.
	// Every click on an anchor-tag inside of myElement executes this function.
	myElement.addEvent('click:relay(a)', function(event, target){
		event.preventDefault();
		request.send({
		    url: target.get('href')
		});
	});

#### MooTools More

- Removed Delegation. It's now in Core obviously.
- Added the `length` validator to Form.Validator
- Added the `update` method to HtmlTable which let you update rows
- Added ARIA accessibility to Tips.

If you'd like to know what exactly changed, checkout the [compare view][core-compare].

We would like to thank everybody who has contributed code, documentation fixes and ideas to make this release possible. Among them are [arieh](https://github.com/arieh), [Delapouite](https://github.com/Delapouite), [madisvain](https://github.com/madisvain), [adamnbowen](https://github.com/adamnbowen), [mooyah](https://github.com/mooyah), [GCheung55](https://github.com/GCheung55), [amadeus](https://github.com/amadeus), [rasmusfl0e](https://github.com/rasmusfl0e), [jasonwaters](https://github.com/jasonwaters), [realityking](https://github.com/realityking), [Nico-B](https://github.com/Nico-B), [mcfedr](https://github.com/mcfedr), [donatj](https://github.com/donatj), [csuwldcat](https://github.com/csuwldcat), [ibolmo](https://github.com/ibolmo), [cpojer](https://github.com/cpojer), [kamicane](https://github.com/kamicane), [timwienk](https://github.com/timwienk), [fakedarren](https://github.com/fakedarren), [anutron](https://github.com/anutron), [subtlegradient](https://github.com/subtlegradient) and myself [arian](https://github.com/arian).

### Bugs

Thanks to GitHub [contributing](https://github.com/blog/712-pull-requests-2-0) is easier [than ever](https://github.com/blog/905-edit-like-an-ace). It's very easy to fix them or to report them, especially since we [moved to GitHub][move-to-github] for our issues. Bugs can reported on the [MooTools Core Bug Tracker][core-bugs] and for MooTools More you can go to the [More Bug Tracker][more-bugs].

If you have any questions, either about how to do something or about contributing you can ask, or something to share, just join the [MooTools Mailing list][ML] or IRC (#mootools on freenode.net). We have an [office hour][] each Tuesday but you can hang out there whenever you want.

### Get it!

* [Download MooTools Core 1.4.0](/download); [Build MooTools Core 1.4.0](/core/)
* [Build MooTools More 1.4.0.1](/more/)
* Fork / clone [MooTools 1.4.0 from GitHub](http://github.com/mootools/mootools-core/tree/1.4.0), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Google CDN][cdn]  (which should be updated soon)
* [Browse the Documentation for Core & More.](/docs)


[Delegation]: /docs/core/Element/Element.Delegation
[Selectors]: /docs/core/Slick/Slick
[core-compare]: https://github.com/mootools/mootools-core/compare/1.3.2...1.4.0
[move-to-github]: /blog/2011/08/01/moving-to-github-issues/
[core-bugs]: https://github.com/mootools/mootools-core/issues
[more-bugs]: https://github.com/mootools/mootools-more/issues
[ML]: https://groups.google.com/forum/#!forum/mootools-users
[office hour]: /blog/2011/06/09/open-irc-office-hours/
[core-builder]: /core
[more-builder]: /more
[download]: /download
[cdn]: http://code.google.com/apis/ajaxlibs/documentation/index.html#mootools