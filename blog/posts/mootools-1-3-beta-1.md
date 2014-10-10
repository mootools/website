---
title: "MooTools 1.3 βeta 1"
date: "Tue, 27 Apr 2010 23:25:06 +0000"
author: "Valerio Proietti"
tags: "all"
permalink: "2010/04/27/mootools-1-3-beta-1/"

---
MooTools 1.3 beta 1 launches today. Lots of bug fixes and improvements, and all that jazz. Before presenting you with a random rundown of features, let me be clear about something: MooTools 1.3 is (or will be) 100% compatible with every public documented API of MooTools 1.2. So chill already.

Anyways, here's what's new:

### Globals

MooTools 1.3 moves away from the `$name` functions. Most of the useless ones, such as `$chk` (god knows why I thought it was a good idea to have `$chk`), were completely nixed. Some of them moved to the proper object's namespace (`$merge` » `Object.merge`, `$pick` » `Array.prototype.pick`). Some others were renamed without the stupid `$` in front (`$type` » `typeOf`, `$defined` » `nil`). In the end, there are a lot less global variables now. You can refer to the 1.3 documentation to have a proper list of what's changed. Keep in mind that the old version of the methods will still work, by default. There will be a way in the future to "compile" MooTools without the compatibility stuff, but the feature is not ready yet.

### From types with love

Every native type has now a `from` method that will try to convert every object passed to that type. `Array.from`, for instance, replaces both `$A` and `$splat`. `Function.from` will return a function that returns the passed in value, if it wasn't a function itself. `String.from`... well you know that at this point, don't you? We also changed how we internally handle Native types, but that should be none of your concerns, since they were handled with private apis anyways.

### Generating your own MooTools, from your own computer

It is now possible, easy, and even perhaps recommended to generate MooTools (and its plugins) yourself. Last few months I've been working, on and off, on a pretty advanced projects-builder. It's called Packager, it supports multiple project dependancies and has a very similar syntax of what's used in the Forge right now. It's written in php and you can use it from your php webpages to dynamically include JavaScripts for development, or you can build a single .js for production from the command line.

If you care to build MooTools and MooTools projects for yourself, you should take these steps:

1. Clone [MooTools 1.3b1.1](http://github.com/mootools/mootools-core/tree/1.3b1.1) from github.
2. Clone whatever other Packager-ready MooTools project from github ([color](http://github.com/kamicane/mootools-color), [table](http://github.com/kamicane/mootools-table) and [touch](http://github.com/kamicane/mootools-touch), for instance, are my Packager-ready plugins).
3. Clone [Packager](http://github.com/kamicane/packager) itself from github.
4. Read Packager's [README](http://github.com/kamicane/packager/blob/master/README.md). Pretty much everything you need to know is in there.

Ofcourse, Packager itself is not limited to MooTools, MooTools plugins or just javascript projects. A tutorial post on how to use Packager for development is coming soon (few years tops).

If you dislike php, worry not! There is also a Django builder, called Depender, written by our [Aaron Newton](http://www.clientcide.com/), on github as well. I really don't know how it works, as I don't do python, but I do know it's scope is way greater than that of Packager. Depender can, for instance, dynamically build your MooTools for production use, like that. But don't take my word for it, go [check it out on github](http://github.com/anutron/mootools-depender).

### Slick

The most notable new feature in 1.3 is *Slick*. *Slick* is our new, shiny, super fast, exhaustively tested, pure-javascript selector engine. There will probably be a dedicated *Slick* post in the following days (or months, given our relaxed release cycles), but here's a few Slick-facts for those who haven't checked it out already:

 - *Slick* is a MooTools-family project by MooTools developers [Thomas Aylott](http://subtlegradient.com/), [Fabio Costa](http://www.meiocodigo.com/) and [yours truly](http://mad4milk.net). It can be [forked from github](http://github.com/mootools/slick), free of charge!
 - *Slick* is an incredibly advanced evolution of our previous selector engine.
 - *Slick* is written using only pure-javascript, none of the MooTools apis are required. It can be used in any project or framework, and it does not require MooTools to function (though the MooTools DOM components do require *Slick*).
 - *Slick* is speedy, blows away the 1.2 selector engine by 50%, at least. We will give you detailed data in the post dedicated to *Slick*.
 - *Slick* supports every selector you can think of. Seriously, every one of them. I promise you.
 - *Slick* is customizable, you can make your own pseudo-selectors, your own attribute-selectors, and many more your-own kinds of things.
 - *Slick* supports reversed combinators. You might not know what they are, but they are pretty darn cool.
 - *Slick* has a [detached parser](http://github.com/mootools/slick/blob/master/Slick.Parser.js). You can parse a css-style-selector string and get back a property-filled object.
 - *Slick* perfectly supports XML documents.
 - *Slick* is slick!

On another note, thanks to the *Slick*'s parser, you will be able to build an element using a css selector. Let me give you an example of this cool new feature (courtesy of our amazing [Christoph Pojer](http://cpojer.net)):

#### Creating an element using an object (the 1.2 way):

	new Element("input", {"id": "someID", "class": "someClass1 someClass2", "disabled": true});
	
#### Creating an element using a selector string (the coolest way):

	new Element("input#someID.someClass1.someClass2[disabled=true]");

### In conclusion

As I get back to work on an exciting number of totally amazing upcoming MooTools projects that you know nothing about because [you don't follow me on github](http://github.com/kamicane), I'll leave you with a few useful 1.3 links:

 - Download the [built 1.3 beta 1 release](http://mootools.net/download/get/mootools-core-1.3b1.1.js).
 - [Fork / clone MooTools 1.3](http://github.com/mootools/mootools-core/tree/1.3b1.1) from github, and build it yourself with [Packager](http://github.com/kamicane/packager), or [Depender](http://github.com/anutron/mootools-depender).
 - If you want a full changelog, go [read the git history](http://github.com/mootools/mootools-core/commits/1.3b1.1), you lazy bastard. Changelogs are so 2001.
 - Wondering how those amazing new methods are called? You can [browse our markdown documentation](http://github.com/mootools/mootools-core/tree/1.3b1.1/Docs/) right on github.
 - And don't forget to [report any issue](https://mootools.lighthouseapp.com/projects/2706-mootools/tickets) you find with the beta, compatibility or not! The more reports we get, the fastest we'll have a final release.

**UPDATE**: There was a "merge" problem with beta1, so we quickly fixed it and re-tagged [beta 1.1](http://github.com/mootools/mootools-core/tree/1.3b1.1).

Have fun with 1.3! I know I will.

Valerio
