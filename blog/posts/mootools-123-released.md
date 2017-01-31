---
title: "MooTools 1.2.3 Released"
date: "Fri, 19 Jun 2009 21:32:40 +0000"
author: "David Walsh"
tags: "releases"
permalink: "2009/06/19/mootools-123-released/"

---
Today we give you what will likely be the final release of the MooTools Core before the jump to 2.0.  While <a href="/download">MooTools 1.2.3</a> is primarily a bug-fixing release, MooTools 1.2.3 also introduces an important new feature:  Framework compatibility mode.

The value in making this change is allowing developers to use more than one framework within a page (which is NOT something we recommend or endorse, but we recognize this is not always under the developer's control).  Not relying on the dollar function prevents the need for *jQuery.noConflict()* when using jQuery and MooTools together, for example.  <em>If no other framework is detected, however, *$* will be assigned to MooTools.</em>  This means that all of your current MooTools code WILL NOT break. It does, however, mean that if you want to use MooTools and jQuery together (without using jQuery's *noConflict* mode), instead of using $ in your MooTools code, you'll have to use document.id().  

If you want your MooTools plugins to be cross-framework compatible, you'll have to replace all the instances of $ with document.id().This change only applies if you're using more than one framework on your pages. If all you use is MooTools, nothing will change for you.  Look forward to more details about Framework compatibility mode in a future post.

<h3>MooTools Core &amp; More Updates</h3>
While we encourage you to browse <a href="http://mootools.lighthouseapp.com">LightHouse</a> and the histories for <a href="http://github.com/mootools/mootools-core/commits/master/">MooTools Core</a> and <a href="http://github.com/mootools/mootools-more/commits/master/">MooTools More</a> to get the most detailed list of changes,  the following significant updates were committed in MooTools 1.2.3:

<h4>Core</h4>
<ul>
	<li>Element: MooTools compatibility mode: the $ function is only defined if no pre-existing $ function is found. If an existing $ function is found, you can use document.id()</li>
	<li>Element: changed internal instances of $ to document.id</li>
	<li>Core: fix for server-side MS JScript 5.x; makes MooTools more friendly for server side programming</li>
	<li>Class: Class doesn't require Browser, removed from scripts.json</li>
	<li>Element: Fixes for set/get Property</li>
	<li>Element.Dimensions: fix for webkit body.scrollTop inconsistency, getBoundingClientRect used whenever possible (not just for Trident), renaming element.position to element.setPosition; adding docs for the method; alias is included in-line for compatibility</li>
	<li>Hash: Hash extend no longer uses the window if no arguments supplied </li>
	<li>Request: clearing Request readystate before calling success or failure;</li>
	<li>Selectors: Added :enabled pseudoselector, was in the Docs but not implemented.</li>
	<li>Docs: Fixed docs headers for first-child, last-child, and only-child.</li>
	<li>Internal: UnitTester test suite is now a git submodule</li>
	<li>Numerous small fixes, speed improvements, documentation tweaks, etc.</li>
</ul>

<h4>More</h4>
<ul>
<li>Per the change in -core, $ is no longer used (uses document.id instead)</li>
<li>Element.Measure: trying cssText solution for Element.expose (again).</li>
<li>Element.Forms: swapping feature detection for browser support per</li>
<li>Date: Massive refactoring of Date.js and Date.Extras.js</li>
<li>Drag.Move: Fixing drag with grid issues</li>
<li>IframeShim: altering zindex assignment in IframeShim to better ensure that it's always underneath the shimmed element, updating Iframeshim's empty document creation; fixes https issues in IE6</li>
<li>FormValidator: reworking formvalidator scroll-to logic to be a little more efficient</li>
<li>OverText: preventing overtext from focusing on inputs except when they are interacted with (so OverText.update() does not focus an input);now stops polling when elements are hidden (when polling is enabled)</li>
<li>Fx.Scroll: adding scrollIntoView method - scrolls an element so that it is completely visible; if below the view, scrolls down until it is at the bottom of the screen, if above, scrolls up until it is at the top.</li>
<li>JSONP: was calling (the deprecated) this.request instead of this.send during retries</li>
<li>URI: Adding set('data', obj) to set</li>
<li>Assets: adding error callback for Assets.images</li>
<li>Tips: removing dependency for Element.Measure for Tips; updating CSS class name in OverText</li>
<li>Numerous small fixes, speed improvements, documentation tweaks, etc.</li>
</ul>


<h3>MooTools 2.0 is on the Horizon</h3>
As mentioned above, 1.2.3 is likely the last update for MooTools 1.2.  MooTools 2.0 will introduce numerous performance improvements and new features.  We want to stress that MooTools 2.0 will feature 100% compatibility with MooTools 1.2.x.  


<h3>Thank You!</h3>
Thank you for the bug fixes, feature requests, and support during MooTools' 1.* lifetime. You, the MooTools community, have helped make this framework better with every bug found and question asked on the forum. We look forward to releasing MooTools 2.0 this summer and getting feedback from everyone in this awesome community.