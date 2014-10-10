---
title: "Dojo and MooTools"
date: "Thu, 01 Apr 2010 16:02:54 +0000"
author: "Aaron Newton"
tags: "all"
permalink: "2010/04/01/dojo-and-mootools/"

---
Over the past several months we here at MooTools have been contemplating how much of what we do is duplicated effort. When we started this whole project years ago it was because we wanted to do things our own way, but as MooTools and JavaScript in general have progressed, we find ourselves facing the tedium of all the low lying code that has to be written to get Browsers to play nice, not to mention the richer things like our inheritance system and other utilities like effects, DomReady, etc. etc.

At FOSDEM we ended up hanging out with the Dojo crew. We like them; they are always doing interesting things and their framework is one that we've always looked at and said to ourselves, "If we ever needed feature X we'd probably just port it from them." Anyway, at FOSDEM a group of their developers and ours got together and started brainstorming about closer ways to work together. Since then the discussion has gotten closer and closer to where we are now.

### MooJo

<img src="/uploads/moojo.png" width="179" height="79" style="float: left; margin: 10px"/>
Starting today the Dojo and MooTools projects will begin merging and joining forces. Part of this is to share resources - more hands coding makes more code, right? But part of it is, well, we'll be frank, we're kind of tired of reinventing the wheel. We love the solutions in MooTools, but at the end of the day, the API is all that matters. It doesn't matter how you detect that the DOM is ready, so long as when it is your code runs. The same could be said for selector engines, XMLHttpRequest, and a whole host of other things. What this means in practical terms is that we just don't have to do as much work and, to be frank, after 4 years of working on MooTools, we're happy to cede some of the more tedious tasks to Dojo. Sure, their architecture isn't quite the same (or maybe even as good) as ours, but it works. This will free our development team's time to work on their own projects and maybe start getting paid for it, which brings us to the second point.

### Making MooJo Profitable

For the past four years we've been writing code and releasing it for free. In our talks with the Dojo team we all agreed that all this free time donated to anyone who happened to want our work just wasn't quite worth the hassle. Don't get us wrong, writing the code is fun, but it's all the other stuff. The bug reports, the hand-holding in the forums and on IRC, the constant demand to "compete" with other frameworks (whatever that means). It just sucks the pleasure right out of it. We find ourselves burning nights and weekends to write code for strangers to use and it gets old.

Going forward, the code base will continue to be free, but access to the documentation will require a small "donation" (we'll probably set a really small minimum, like, say $.25) - frankly, the documentation has gotten too good to be free (we contemplated printing it and just selling it as a book, but micropayments is much more "Web 2.0"). Filing bugs will still be free of course. But we're working on a system that lets our users put money towards the bugs they care about the most. The bug with the most money donated gets our time and gets in the next release. We think this will cut down on both the number of bugs we get but also help manage expectations. If you have a bug that you think is important, you either need a lot of people to agree with you (which they will if the bug is really broad) or you need to pay a lot (in which case it's like you're hiring us as freelancers).

What will we do with the money raised? We'll probably start sponsoring more meet-ups and sending more people to conferences, but we'll also be able to compensate the developers who bring you all this great stuff. Certainly no one can argue with that.

### Compatiblity

As we begin merging functionality we'll likely retire large portions of both frameworks. MooTools has a great effects library while Dojo has a lot of solid widgets. MooTools ART will likely get shelved in favor of `dojo.gfx`, Dojo will likely drop it's effects libraries in favor of MooTools' effects which are really nice, much of MooTools More will either be retired (in favor of existing Dojo widgets) or turned into Dojo widgets themselves, etc.

For backwards compatibility we'll be implementing the "donation" system as well. For the portions of the MooTools and Dojo cores that are deprecated we'll allow the users to prioritize which parts we offer compatibility for. Same goes for effects, plugins, etc. We hope this new model will encourage businesses that use our awesome frameworks to recognize the value we bring and to compensate us for our time.

If you have any questions, post them in the comments below. Comments are still free - we haven't implemented the "donation" system for them yet, either.

**Update**: Yes, this was an April Fool's joke. We love Dojo and that whole team... but not *that* much.