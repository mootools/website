---
title: "Call to Upgrade: MooTools 1.1.2 and MooTools 1.2.4"
date: "Mon, 02 Nov 2009 22:43:18 +0000"
author: "David Walsh"
tags: "news"
permalink: "2009/11/02/upgrade-mootools/"

---
<p>You've probably noticed a flurry of MooTools 1.2 updates recently, including updates to both MooTools Core and More.  We're happy to give them to you and hope you continue to upgrade your existing MooTools 1.2.x builds. We would like to bring to you attention an upgrade to the <a href="/download/version/1.1.2">MooTools 1.1.2 build</a> and <a href="/download">MooTools 1.2.4 build</a> which should be considered a mandatory upgrade for developers still using MooTools 1.1 and MooTools &lt; 1.2.4.</p>

<!--more-->

<h3>Firefox 3.6 and document.getBoxObjectFor</h3>
<p>
The reason we stress the upgrade to MooTools 1.2.4 and MooTools 1.1.2 is the removal of the <code>document.getBoxObjectFor</code> method in the upcoming Mozilla Firefox 3.6 release. Within the browser detection code of MooTools 1.1 and earlier versions of 1.2, MooTools attempts to identify the Gecko engine by checking for the existence of <code>document.getBoxObjectFor</code>.  Mozilla's removal of this method in Firefox 3.6 effectively breaks Gecko detection in MooTools 1.1 and MooTools 1.2.3 down.
</p>

<h3>"What Effect Does This Have on My MooTools Build?"</h3>
<p>
Gecko detection is used within MooTools only twice -- both times for event handling:
</p>
<ul>
<li>Event.relatedTarget - Identifies the related target of any given event.  This property is used in multiple places throughout the framework.</li>
<li>The mousewheel event - Firefox identifies mousewheel events using "DOMMouseScroll" instead of "mousewheel."</li>
</ul>
<p>These items are at risk to break without upgrading your MooTools build.</p>

<h3>The Solution Moving Forward</h3>
<p>
We have overhauled our browser detection to be based on the user agent string. This has become the standard practice among JavaScript libraries because of potential issues as Firefox 3.6 demonstrates. As browsers grow closer together, looking at “features” to separate them will become more difficult and risky. From this point forward, browser detection will only be used where it would be impossible not to, in order to give the consistent experience across browsers that one would expect from a world-class JavaScript framework.
</p>

<h3>"Where Can I Download Upgrades?"</h3>
<p>
You may download the updated MooTools 1.1.2 build on the <a href="/download/version/1.1.2">MooTools 1.1.2 download page</a>.  You may also grab <a href="http://github.com/mootools/mootools-core/tree/1.1.2">MooTools 1.1.2 from GitHub</a>.
</p>
<p>
You may download the updated MooTools 1.2.4 build on the <a href="/download">MooTools 1.2.4 download page</a>.  You may also grab <a href="http://github.com/mootools/mootools-core/tree/1.2.4">MooTools 1.2.4 from GitHub</a>.
</p>

<p>Thank you for upgrading.  We look forward to continued success with the MooTools javascript framework!</p>