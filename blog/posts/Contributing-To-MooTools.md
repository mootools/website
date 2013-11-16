---
title: Contributing to MooTools
date: 2013-03-18
author: Arian Stolwijk
tags: All
---
Sometimes we get requests from people that want to contribute to MooTools. In this post I would like to give some pointers how one could help, but first I'll tell how I got involved in the MooTools project.

It was late 2009, the MooTools Forge (plugin repository) was just released, and I was learning JavaScript and MooTools by creating many plugins. This is already the first form of contributing to the MooTools project: releasing code that might benefit others. The cool thing about this was that I also helped other people on GitHub that released their MooTools plugins, and thanks to this interaction I learned even more.

At the same time the MooTools Core developers were building MooTools 1.3. I closely followed the developments and noticed that a few things were still missing. One thing that seemed easy was the documentation. So, in some spare time I dove into the MooTools source code, looking through the commit history to see what changed, and update the existing MooTools 1.2 documentation accordingly. If I remember correctly a pull request on GitHub at that time was basically a private message to the MooTools devs, so it was exciting whether my changes would be accepted. Fortunately contributing to the documentation is always helpful, so my changes got merged!

Because MooTools 1.3, at that time, was fully under construction, there were many loose ends that were easy to fix. I got invited to talk to the MooTools devs on IRC, and got involved more and more. So I started working on MooTools More 1.3, which was something else that was not updated for the new 1.3 release. This was a great way to learn how the internals of MooTools work: we had to look into MooTools Core to know how to effectively update the More code, or even fix things in MooTools Core, but at the same time it wasn't too difficult yet.

Later that year I went to the MooTools Hackathon in London, where we finalized the MooTools Core 1.3 and More 1.3 releases which were released later that year. I also got a nice place on the [MooTools developers](http://mootools.net/developers) page!

So how does my nice story tell you how to contribute? Basically what I did is look if something was blocking the release for MooTools 1.3, went ahead and fixed that, just by spamming the MooTools devs with new pull requests.

The most important point is direct communication with the developers. This mainly happened on IRC, but is still valid. Join #mootools, say you want to help out with something, or did something, explain again why we should merge your pull request. This is really the best way to get started. If you don't directly see a loose end where you can help, the MooTools developers probably know something interesting for you.

Currently there are a few aspects where you can help. If you have followed the development on GitHub you might know about prime, elements, agent, moofx etc. There is still some stuff (especially website/documentation related) to be done for a real release. See also the [roadmap](https://github.com/mootools/prime/wiki/Roadmap) on the Prime Wiki.
But it's also perfectly fine if you like to work on the current version of MooTools Core. The idea is to release a MooTools 1.5 with mostly bugfixes, and a few deprecations. The biggest chunk of work for 1.5 is a review of bug reports and pull requests.

If you're not really comfortable contributing code or documentation directly, writing blog posts, tweeting about MooTools or helping other people on the [MooTools Mailing List](https://groups.google.com/forum/?fromgroups#!forum/mootools-users), #mootools on IRC or [stackoverflow](http://stackoverflow.com/questions/tagged/mootools) are really great ways to contribute too.

I would like to conclude with the benefit of contributing to MooTools or [Open Source](https://www.google.com/search?q=why+contribute+to+open+source) in general. I've learned so much and you get the opportunity to do things right. Apply testing techniques, try new technologies, learn more than you want to know about IE7 or other interesting browser behaviors. The things I learned by contributing MooTools simply made me a better developer.

*Edit:* we created a wiki to collaborate on design and websites for MooTools projects on [GitHub](https://github.com/mootools/website/wiki). So if you're into that kind of thing, this is another great way to contribute!
