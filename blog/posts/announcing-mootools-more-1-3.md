---
title: "Announcing MooTools More 1.3"
date: "Fri, 29 Oct 2010 13:41:41 +0000"
author: "Arian Stolwijk"
tags: "all,releases"
permalink: "2010/10/29/announcing-mootools-more-1-3/"

---
We hereby announce the immediate availability of MooTools More 1.3.0.1. We have updated all of MooTools More’s code to work with the recently released Core 1.3 without 1.2 compatibility. Besides the API update, 1.3 improves stability and introduces some awesome new features.

Awesome new features? What awesome new features?

<!--more-->

### Events.Pseudos, wait, this isn’t happening!

MooTools Core 1.3 includes our new selector engine *Slick*. One of Slick’s components is *Slick.Parser*. *Slick.Parser* parses a CSS selector to an object representation of the selector, called a "Slick object". Since our Event Delegation already uses such a CSS style notation for defining events, i.e. `click:relay`, we decided to take this to the next level: [Events.Pseudos][] and [Element.Event.Pseudos][]. I’ll show you an example of how it works:

	document.addEvent('keydown:keys(shift+c)', function(){
		alert('You pressed the shift and c keys!');
	});

We append an event pseudo, `:keys` to the existing event name, to get custom events. This doesn’t only work for Element events, but for the Class event system, the Events mixin, as well. Currently we’ve implemented the pseudo events `:once` for both Events as Element.Event and `:keys` and `:relay` for Element.Event.

[Events.Pseudos]: /docs/more/Class/Events.Pseudos
[Element.Event.Pseudos]: /docs/more/Element/Element.Event.Pseudos

### Locale,  localizzazione,  Lokalisierung, localización, локализация

For 1.3 we’ve rewritten MooTools.lang to [Locale][]. It’s now more powerful and has a much better API. A big thanks to our community as well! A lot of people helped us improve translations for their native languages.

A simple example looks like:

	Locale.use('nl-NL');
	Locale.get('Ping.stop'); // w00fz, kun je alsjeblieft stoppen met pingen


<style type="text/css">
span.cpojer {
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
span.cpojer:hover {
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


However, the real <span class="cpojer">cpower</span> of the new Locale is its inheritance abilities. For example, if you take Portuguese, it’s used in several countries around the world, like in Brazil. Brazilian Portuguese is slightly different, but has many similarities. Now instead of recreating a whole Locale Set file, you can now inherit the Portuguese translations and overwrite only the values that are different.

	Locale.define('pt-BR', 'ping', {
		// ... key-value pairs
	}).inherit('pt-PT');

Another awesome thing is the new [Locale.Set.From][] function which right now allows you to create Locale Sets from a JSON string. The plan is to extend this in the future to support other data formats. This function will make it easier to share translations between server and client side: you can do a [Request][] to your server, and pass the `responseText` to `Locale.Set.From` right away.

[Locale]: /docs/more/Locale/Locale
[Locale.Set.From]: /docs/more/Locale/Locale.Set.From
[Request]: /docs/core/Request/Request

#### Number.format

Because Localization is more than just converting strings to other languages, we added [Number.Format][] to MooTools More. Just like our `Date.format` works for dates, Number.format lets you format numbers in various formats.

	(101).formatCurrency(); // € 101,00

[Number.Format]: /docs/more/Types/Number.Format

### HtmlTable

HtmlTable has received a lot of attention. Its API is a little more useful now, but there are numerous features added including the ability to select multiple rows with shift and ctrl, keyboard support, and more robust sortability controls.

### Notable changes in 1.3

- A total of 105 tickets closed for 1.3.0.1 (first [65 tickets][Milestone1251] here, [28 tickets][Milestone1301rc1] here, and [another 12][Milestone1301] here)
- Hash has been deprecated in 1.3 Core. But fear not! More 1.3 provides Hash now.
- Hash.Extras are now also available as Object.Extras
- Event Delegation now supports the `mouseenter` and `mouseleave` events
- Log.js has been removed. Use [this][old-logjs] or [this][dbg] or just `console.log` and friends.
- Like `myElement.get(‘tween’, options)` Fx Classes in More don’t support the second argument of Element.get anymore either. You can find more information in the [Update Wiki Page][]
- EcmaScript 5 array methods Array:reduce and Array:reduceRight are added to Array.Extras
- Date.parse now follows the [UNIX specification][] of strftime.
- [Full changelog for 1.3][Changelog1301] (Note that changes that we also applied for 1.2.5.1 will be listed under 1.2.5.1)

[Milestone1251]: https://mootools.lighthouseapp.com/projects/24057/milestones/77753
[Milestone1301rc1]: https://mootools.lighthouseapp.com/projects/24057/milestones/83468
[Milestone1301]: https://mootools.lighthouseapp.com/projects/24057/milestones/87438
[Changelog1301]: http://github.com/mootools/mootools-more/blob/1.3.0.1/README.md
[UNIX specification]: http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
[old-logjs]: http://github.com/mootools/mootools-more/blob/1.2.4.4/Source/Core/Log.js
[dbg]: http://github.com/amadeus/dbg
[Update Wiki Page]: http://github.com/mootools/mootools-core/wiki/Update-from-1.2-to-1.3

### Testing

Like Core and Slick we have moved More to use our new [Specs Runner][]. We tried to cover as much as possible in the Specs. However, More contains a lot of UI components that are very difficult to test with the Specs. Therefore we have new UI tests, which are basically HTML pages with JavaScript and CSS. You can run the tests with [mootools-test-runner][] (Python + Django) or [mootools-ui-runner][] (PHP)

[Specs Runner]: http://github.com/mootools/mootools-runner
[mootools-test-runner]: http://github.com/anutron/mootools-test-runner
[mootools-ui-runner]: http://github.com/arian/mootools-ui-runner

### MooTools 1.2.5.1

Together with this 1.3 release we also release MooTools More 1.2.5.1, which is an update for the 1.2 branch for the people who are not (yet) able to upgrade to 1.3. It has the improved stability of 1.3 and some new features.

#### Notable changes in 1.2.5.1

- There are [65 tickets][Milestone1251] closed since the previous 1.2.4.4. release.
- All optimizations and updates done to existing code in 1.3.0.1 are applied on the 1.2.5.1 branch as well
- Depender.js is no more, use [Packager][] or [Depender][] on the server side.
- [Full changelog for 1.2.5.1][Changelog1251]

[Milestone1251]: https://mootools.lighthouseapp.com/projects/24057/milestones/77753
[Changelog1251]: http://github.com/mootools/mootools-more/blob/1.2.5.1/README.md
[Packager]: http://github.com/kamicane/packager
[Depender]: http://github.com/anutron/mootools-depender

### Get It NAOW, with a smile!

- [MooTools More 1.3](/more)
- [MooTools More 1.2.5.1](/more125)
- Fork / clone [MooTools More from github](http://github.com/mootools/mootools-more)
- [See changelog](http://github.com/mootools/mootools-more)
- Browse the Documentation [1.3](/docs/more) and [1.2](/docs/more125)
- Please report any bugs you can find on [Lighthouse](http://mootools.lighthouseapp.com/projects/24057-mootoolsmore), our bug tracker.
