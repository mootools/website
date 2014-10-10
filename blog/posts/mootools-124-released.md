---
title: "New MooTools Core & More Releases;  Forge, Depender, ART, and Moo 2 on the Horizon"
date: "Wed, 23 Sep 2009 01:39:40 +0000"
author: "David Walsh"
tags: "all"
permalink: "2009/09/22/mootools-124-released/"

---
<p>There&#8217;s always a lot going on behind the scenes with the MooTools javascript framework.  And how could there not be?  Here&#8217;s a look at what&#8217;s coming in the next few months.</p>

<h3>MooTools Core 1.2.4 and 1.1.2</h3>
<p>As we turn our attentions towards MooTools 2.0, version 1.2 will not receive any significant upgrades. However, until MooTools 2.0 is released we will continue to support the current version with bug fixes. To that end we&#8217;re releasing MooTools Core 1.2.4 which fixes several small bugs and addresses a change coming in the next release of Firefox. Because of this inconvenient Firefox change, we&#8217;ll also be releasing MooTools Core 1.1.2, an update to the 1.1.1 release. Sites using 1.1.1 will be able to drop in 1.1.2 without it affecting anything. We&#8217;ll post more details on this when we release these two updates.</p>

<h3>MooTools More 1.2.4.1</h3>

<p>While the 1.2 version of MooTools Core no longer accepts additions, MooTools More, the official plugins collection, continues to be iterated upon constantly. Included in the next version of MooTools More (1.2.4.1) are numerous bug fixes and performance enhancements, along with new widgets, classes, and extensions for you to play with. Here are a few:</p>

<img src="http://mootools.net/uploads/zebra.png" alt="Zebra Table" style="float:right;margin:0 0 20px 20px;" />
<ul>
<li>Mask - An overlay class that allows you to put a semi-transparent layer above any element, including the window.</li>
<li>Spinner - This class automates putting an AJAX indicator over any element.</li>
<li>Form.Request - This class makes any form element into an AJAX form.</li>
<li>HtmlTable - This suite of classes let you create HTML tables on the fly, update and alter their contents, make them zebra striped, selectable, and sortable.</li>
<li>Keyboard - The Keyboard class provides the tools necessary to manage a complex user interface with different keyboard enhancements.</li>
</ul>

<h3>Depender</h3>

<p>Another plugin coming in MooTools More 1.2.4.1 is a client side dependency manager. This class allows you to lazy-load files from the MooTools libraries and any other libraries that use similar organization (i.e. those that map their dependencies with the same mechanisms). </p>

<p>In addition to this client side implementation of the dependency loader is a server side version that greatly improves performance. The server side implementation concatenates and (optionally) compresses the files together so that there&#8217;s only one request and is far more efficient.</p>

<h3>MooTools ART</h3>

<p>
<img src="http://mootools.net/uploads/art.png" alt="MooTools ART" style="float:right;margin:0 0 40px 20px;" />
MooTools ART has been under development off and on for nearly a year now and for the most part has been under wraps. MooTools ART is the foundation for MooTools&#8217; upcoming UI library. Using canvas and VML, it features support for dynamic illustrations, allowing complex UI elements that have numerous interactive states. When released, will come with numerous plugins for stylable windows, buttons, and more.</p>

<p>One of the most interesting ART features is its support for themes using CSS-like syntax in javascript. In conjunction with the default widgets that come with ART we hope to see the MooTools community create numerous interfaces using the system that allows for a fully themable UI by the end of the year.</p>

<h3>Forge</h3>

<p>Anyone who has been around the MooTools forums or IRC channel has heard that the user plugin catalog (which we call the Forge) is always &#8220;coming soon&#8221;. Well, this time, we mean it. The MooTools Forge is a new application which will act as a central repository for MooTools plugins created by, well, by you. The Forge will pull your code directly from GitHub, taking into account versioning and dependencies, and providing plugin usage details.</p>

<p>The Forge is currently in the last stages of testing. Look forward to seeing the MooTools forge by the end of October at the latest.</p>

<h3>MooShell</h3>

<p><a href="http://mooshell.net">MooShell</a> is an outstanding interactive shell editor for debugging your MooTools code created by Piotr Zalewa. Instead of pasting your CSS, javascript, and HTML into static PasteBins, you may use MooShell to show others the issues you are experiencing with your code. You may also quickly experiment with different techniques and share your ideas with others.</p>

<h3>MooTools 2.0</h3>

<p>Your favorite javascript framework is about to become 1.612903225806452 times as awesome. MooTools 2.0 will feature an optimized Fx library, an improved Class class (one of the foundations of the entire framework) and inheritance model, blazing fast selector engine (Slick), numerous speed optimizations, and many more goodies. Look forward to a more detailed post soon!</p>
