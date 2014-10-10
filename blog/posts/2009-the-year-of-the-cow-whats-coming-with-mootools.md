---
title: "2009, The Year of the Cow - What's Coming with MooTools"
date: "Tue, 03 Feb 2009 01:51:27 +0000"
author: "Aaron Newton"
tags: "all"
permalink: "2009/02/02/2009-the-year-of-the-cow-whats-coming-with-mootools/"

---
Ok, it's the <a href="http://en.wikipedia.org/wiki/Ox_(zodiac)">year of the Ox</a>, but you get the idea. Regardless, it's shaping up to be a very interesting one for MooTools. There are many things going on with the framework and we thought we'd give you a heads up on what you should expect in the coming weeks and months.

<!--more-->

####MooTools 1.3

As <a href="http://www.clientcide.com/3rd-party-libraries/mootools/the-mootools-13-upgrade-path/">discussed elsewhere</a> MooTools 1.3 is on the horizon and features numerous changes that will interest you. The caveate here is that all of this is subject to change, as the work is still very much underway.
<ol>
    <li>Class is getting a rewrite that should make it both less likely to encounter browser issues but will also empower you to do some cool stuff like post- and pre-initilization mutators and inherit object properties from prototypes (the current Class breaks this inheritance link for things like options to prevent pollution across instances).</li>
    <li>There is a new <em>Type </em>constructor that has numerous methods that help you manage objects. For instance, the <em>$type</em> method is now <em>Type.of</em> and there are methods for each type (<em>Type.isString('foo') === true</em>). In addition, most <em>Native</em> instances will have a <em>.from</em> method (<em>Array.from(iterable)</em>).</li>
    <li>Most of the <em>$method</em> functions are moving into better places in the framework. This means that <em>$type</em> is now <em>Type.of</em>, <em>$empty</em> is <em>Function.empty</em>, <em>$lambda</em> is <em>Function.lambda</em>, <em>$random</em> becomes <em>Number.random</em>, etc. Not all the <em>$methods</em> will get this treatment as there are at least a few of them that don't really go anywhere. We're still discussing what to do with them (<em>$pick</em>, <em>$each</em>, <em>$defined</em>, etc).</li>
    <li>Event Delegation will make it's way officially into the framework (there are some implementations out there of this already).</li>
    <li>Hash, Cookie, and Swiff are all likely moving into mootools-more. The thinking here is that the Core doesn't need these things to function and while they are useful features of MooTools, they aren't needed by everyone.</li>
    <li>In a new policy change, the default pre-built version of the MooTools core will come with the compatibility layer for the previous version built in. This means that if you have a site running MooTools 1.2 you should be able to just drop in 1.3 and continue partying. You'll want to start using the MooTools 1.3 syntax going forward, but in general, upgrading should be a <em>lot</em> easier.</li>
    <li>Various small bug fixes and the like.</li>
</ol>
As a side note, we'll point out that while there are some organizational changes to the library with numerous methods being renamed and moved, by and large the changes are all search-and-replace friendly. Other changes, like those to Class, aren't likely to affect existing code.

####MooTools -more Has a Posse

For the past year or more the focus among the MooTools developer team has been to continue to refine the MooTools core. The changes made there are mostly refinement and enrichment, but to a great extent are not really about new features. With MooTools 1.2 the various interface oriented files were split into mootools-more and haven't really been touched in a long time other than to fix bugs and whatnot.

Starting today this split is becoming even more pronounced in that the -more files are going to be considered their own project. To that end these plugins and new ones will have their own development team and their own mission, namely, to expose to the MooTools community the plugins authored by the MooTools -more development team. By default, this group is defined as the developers who have been contributing to MooTools for a while now, but the scope of the files will broaden greatly. The definition for a good plugin for mootools-more will be "Any well written plugin that serves a reasonable use case that is contributed by someone willing to continue contributing to mootools-more." Simply put, expect to see lots and lots more plugins for your use.<a href="http://www.clientcide.com"></a>

To manage this new project and team I (Aaron) have been tapped to put together the development team. If you've ever visited my site (<a href="http://www.clientcide.com">Clientcide</a>) to download plugins you'll know that I have a lot to share. In the coming weeks expect to see a lot of these plugins (not all of them) move into mootools-more and become official MooTools plugins. Expect to see more plugins from MooTools contributors as well as plugins written by others who are interested in joining the team. We mean <em>you</em>. Expect more on how you can help out in the coming weeks as well as an official roadmap.

2009 is going to be a great year to develop with MooTools. We're very excited and hope you are too.