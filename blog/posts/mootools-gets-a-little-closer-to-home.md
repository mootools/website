---
title: "MooTools Gets a Little Closer to Home "
date: "Fri, 01 Apr 2011 09:54:15 +0000"
author: "Aaron Newton"
tags: "all"
permalink: "2011/04/01/mootools-gets-a-little-closer-to-home/"

---
A few months back we [sent out a survey](/blog/2010/12/05/mootools-survey) asking you where you'd like for the development team to focus its energies. Since then we've [worked on demos](/blog/2011/01/04/new-demos/) and [released a new version of the framework](/blog/2011/02/25/mootools-core-more-1-3-1/) with new features based on that valuable feedback. Getting direct input from everyone who uses MooTools helps us as developers stay on target for the things you need.

One of the items that came up several times in the survey was a desire for more support for internationalization. MooTools More already ships with a [system for localizing plugins](/docs/more/Locale/Locale), but this functionality isn't baked deep into the framework. Several comments in the survey implied a desire to see this functionality available throughout MooTools Core. One respondent wrote, "It is difficult to understand MooTools as my English is not great. My website has many visitors from where I live and they need all to understand it. Thank you."

You asked for a more culturally sensitive framework and we listened. Given that the MooTools development team is based all over the world from Italy to Austria to The Netherlands to Germany to Sweden we can understand the value of having MooTools available in your native tongue.

<!--more-->

### Introducing the MooTools Localized API

For the past few weeks we've been hard at work localizing all of MooTools. That's right, you will be able to download MooTools Core and MooTools More in any of the several languages we support. We're are not entirely ready yet and don't have full coverage for each API, but nevertheless wanted to give you a preview of what we're working on.
We were able to do this because MooTools' modularity and JavaScript's flexibility which makes it easy to add and change methods on the fly.

To get started with using the translated API, you need to look at [Github](https://github.com/fakedarren/mootools-locale) for now, since we're still early in development. However we will provide [a download page](/download) in the coming weeks so you can easily select your language and download the required components.

Here's a quick example of the Italian translation in action:

    Element.impostaStile('colore', 'rosso');

We also support British English now as well:

    Element.setStyle('colour', 'red');

Or Dutch:

    venster.gebeurtenisToevoegen('domklaar', function(){
        $('kop').zet('tekst', 'MooTools!');
    });

Everything is right were you expect it to be; it's still just MooTools! All your users will recognize the difference of a site built using their native tongue.

We've also set up a repository on [Github](https://github.com/fakedarren/mootools-locale) which you could use to add and improve translations. You could grab the Dutch translation (Locale.nl-NL.API.js) and translate it to your own language. We would like to add documentation for the translations as well, and are still looking how we could implement this in an efficient way in our future documenation system which is currently under development.

If you're interested in helping us translate into additional languages please get in touch on the [MooTools Google Group](http://groups.google.com/group/mootools-users) or at [Github](https://github.com/fakedarren/mootools-locale).

Here is an early demo with some working JSFiddles:

**Dutch:**

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/arian/sLyj8/5/embedded/"></iframe>

**Ukrainian:**

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/slik/9ucfy/3/embedded/"></iframe>

**GERMAN:**

<iframe style="width: 100%; height: 300px; margin-bottom: 2em" src="http://jsfiddle.net/arian/Ln94J/embedded/"></iframe>


### Keep the Feedback Coming!

In the coming months we hope to add a lot of new features that enrich the MooTools ecosystem. We've gotten a lot of requests to make MooTools Core suitable for mobile devices. Our plans are to make a modular system that allows you to include only the parts you need with small, powerful, and feature rich modules for effects and AJAX as well as enhancements to native objects like strings and functions. We plan to sell this in the iTunes store for 99&cent;. What features would you like to see next in MooTools? Leave a comment!

<strong>Update:</strong> Thanks to [paraboul](https://github.com/paraboul) we added a beginning for French!

<strong>Update 2:</strong> Anyone wishing to find more information on our Localized API efforts, please [read this](http://twitter.com/#!/mootools/status/53918481925668864).