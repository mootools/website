---
title: "MooTools 1.2.4"
date: "Mon, 19 Oct 2009 22:41:18 +0000"
author: "Aaron Newton"
tags: "all"
permalink: "2009/10/19/mootools-1-2-4/"

---
It's been three months *to the day* since [the last point release of MooTools](http://mootools.net/blog/2009/06/19/mootools-123-released/) and we're excited about all the goodness packed into this release. At this point, the 1.2 codebase has a very stable API, and our current plan is to release these point releases every three months or so until the 2.0 codebase is online. If we find any serious bugs, though, we'll be sure to get fixes into your hands as fast as we can.

<!--more-->

### Non-breaking Changes

Before we get started telling you all the yummy stuff we've got for you, let us first assure you that the code we released today is 100% backwards compatible with the previous versions. Upgrading should be as simple as dropping the new files in place.

### MooTools Core - 1.2.4

This version of the MooTools Core is one of the most tested and refined we've ever released. We've fixed numerous small bugs, but the ones you may notice most of all are:

* Added Trident 6 (IE8) detection
* Request can take an instance of [URI](/docs/more/Native/URI) as a url
* JSON.stringify and JSON.parse native methods are now accessible
* [DomReady](/docs/core/Utilities/DomReady) always fires before load event
* Fix for creating a Request in early versions of IE6
* Fixes and optimizations for Element.getOffsets

This short list doesn't do it justice, there have been roughly 70 commits to the core since 1.2.3, but most of these fixes are minor including adding to documentation, adding more tests, etc. The point here is that the 1.2 branch is increasingly stable, which is why we release it so infrequently.

### Gecko (Firefox) Detection in 1.2.4, 1.1.2

MooTools has always used object sniffing to detect rendering engines, and while not perfect, this method has proved very reliable in recent years.  However, the upcoming Firefox 3.6 marks a shift in our thinking on this subject because Gecko detection will no longer work on it without an update.  We recognize the significance of this, and therefore are releasing updates for both 1.2 and 1.1 because we understand that 1.1 is still in widespread use.

Looking towards 2.0, we have overhauled our browser detection to be based on the user agent string.  We realize that this is not without its forward compatibility risks, however it is the standard practice among JavaScript libraries because of potential issues as Firefox 3.6 demonstrates.  As browsers grow closer together, looking at "features" to separate them will become more difficult and risky. User agent strings, on the other hand, have remained very consistent in recent years with the exceptions being in mobile browsers and with Google Chrome coming on stage. With 2.0, browser detection will only be used where it would be impossible not to, in order to give the consistent experience across browsers that one would expect from a world-class JavaScript framework.

For those of you still running 1.1, it is imperative that you update to 1.1.2. When we get 1.1.2 up on Google's JavaScript CDN service, those of you requesting 1.0 or 1.1 from that service should see the upgrade without doing anything. If you do not update your 1.1 scripts, users visiting in Firefox 3.6 and beyond will likely encounter issues.

### MooTools More - 1.2.4.1

While MooTools Core has remained pretty much the same since the original 1.2 release, MooTools More continues to add new features that should make building sites even easier. This release is jam-packed with bug fixes and new plugins, and we're excited to see what the community will do with them. Here's a quick list:

* [over 30 issues fixed or closed (in lighthouse)](http://mootools.lighthouseapp.com/projects/24057-mootoolsmore/tickets?q=milestone%3A1.2.4.1)
* New feature: [Element.Delegation](/docs/more/Element/Element.Delegation) - a partial port of event delegation from MooTools 2.0 (does not support custom events or blur/focus)
* New feature: [Elements.From](/docs/more/Element/Elements.From) converts html strings to DOM elements
* New feature: [Depender](/docs/more/Core/Depender) - a client side MooTools dependency loader
** Related: [Depender App](http://github.com/anutron/mootools-depender/) - a server side implementation (that's much faster) - more on this in a later post
* New feature: [Mask](/docs/more/Interface/Mask) - masks elements (including the window) with a semi-opaque overlay
* New feature: [Spinner](/docs/more/Interface/Spinner) - automates the creation of ajax spinners over DOM elements being updated (previously known as [Waiter](http://www.clientcide.com/docs/UI/Waiter) on Clientcide.com)
* New feature: [Form.Request](/docs/more/Forms/Form.Request), [Form.Request.Append](/docs/more/Forms/) - automates creating ajax forms that update HTML in DOM elements (previously [Fupdate](http://www.clientcide.com/docs/Forms/Fupdate) on Clientcide.com)
* New feature: [HtmlTable](/docs/more/Interface/HtmlTable), [HtmlTable.Zebra](/docs/more/Interface/HtmlTable.Zebra), [HtmlTable.Sort](/docs/more/Interface/HtmlTable.Sort), [HtmlTable.Select](/docs/more/Interface/HtmlTable.Select) - interactive and auto-generated html table elements
* New feature: [Keyboard](/docs/more/Interface/Keyboard) - a robust event manager for keyboard groupings
* Added new option to [Fx.Accordion](/docs/more/Fx/Fx.Accordion): returnHeightToAuto
* FormValidator is now [Form.Validator](/docs/more/Forms/Form.Validator)
** Added credit card number validator to FormValidator
* MooTools Lang is now a part of MooTools More (again)
* Added timeDiff method to [Date.Extras](/docs/more/Native/Date.Extras#Date:timeDiff)
* Added ability to ignore scroll position with [Element.Position](/docs/more/Element/Element.Position)
* Element.setPosition is now Element.position (non-breaking change)
* Added hideAll and showAll methods for [OverText](/docs/more/Forms/OverText)
* Added [Element.isVisible](/docs/more/Element/Element.Shortcuts#Element:isVisible) method
* [URI](/docs/more/Native/URI)'s get method no longer returns null for missing parts; it returns an empty string.
* Various other tweaks and bug fixes

### Get Coding!

This release has a lot of good stuff in it, but it's worth noting we have a LOT of other things in the oven right now.

The MooTools development team continues to grow and the more people involved with the creation of the framework, the more cool things we can release. If you want to get involved with making MooTools, all you have to do... is start writing code. Get involved on [github](http://github.com/mootools), in [the mailing list](http://groups.google.com/group/mootools-users), and start getting your own plugins ready for the upcoming release of the MooTools Forge.
