---
title: "MooTools Core & More 1.3.1"
date: "Fri, 25 Feb 2011 20:05:33 +0000"
author: "Christoph Pojer"
tags: "all,releases"
permalink: "2011/02/25/mootools-core-more-1-3-1/"

---
The MooTools team is very happy to announce a simultaneous update of both Core and More repositories. The past year was amazing for us. We had a great hackathon in London, we gave you MooTools 1.3, added a lot of new people to our team and improved everything around the code. The results of the MooTools survey clearly showed that we are doing the right things and we intend to make MooTools even better in 2011. We spent the past weeks fixing bugs and adding new features on both projects. This is what's new:

### Changes
* Lots (and by that I mean LOTS) of documentation improvements, clarifications and cleanups
* Updated Slick to 1.1.5 and improved the speed of our Slick selector engine
* Added delegation support for `submit`, `focus`, `blur`, `reset`, `change` and `select` events in MooTools More
* If available the native JSON methods are now used in JSON.decode and JSON.encode
* Multiple Pseudos click:relay(a):once [(demo)](http://mootools.net/demos/?demo=Element.Event.Pseudos)
* Two new [pseudo events](http://mootools.net/docs/more/Class/Events.Pseudos#Pseudos:throttle): `:throttle` and `:pause`
* Added String.truncate to String.Extras in More
* More than two hundred changes to increase the stability of both [Core](https://github.com/mootools/mootools-core/compare/1.3...1.3.1) & [More](https://github.com/mootools/mootools-more/compare/1.3.0.1...1.3.1.1)

I am also pleased to announce our newest addition to the MooTools More team, [Jacob Thornton](http://twitter.com/#!/fat), who is a great developer, currently working for Twitter. He has put a substantial amount of work into making MooTools More even better.

Be sure to check out the updated demos in our new [demos section](http://mootools.net/demos/).

### Get it!

* [Download MooTools Core 1.3.1](http://mootools.net/download); [Build MooTools Core 1.3.1](http://mootools.net/core/)
* [Build MooTools More 1.3.1.1](http://mootools.net/more/)
* Fork / clone [MooTools 1.3.1 from GitHub](http://github.com/mootools/mootools-core/tree/1.3.1), and build it yourself with [Packager](http://github.com/kamicane/packager).
* [Read the commit logs](http://github.com/mootools/mootools-core/commits/1.3.1) to see precisely what has changed.
* [Browse the Documentation for Core & More.](http://mootools.net/docs)
* Please report any bugs you can find on [Lighthouse](https://mootools.lighthouseapp.com/projects/2706-mootools/tickets), our bug tracker.