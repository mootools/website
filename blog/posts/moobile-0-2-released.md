---
title: "Moobile 0.2 Released"
date: "Sat, 03 Nov 2012 15:16:48 +0000"
author: "Jean-Philippe Déry"
tags: "news"
permalink: "2012/11/03/moobile-0-2-released/"

---
I’m very happy to present the latest version of <a href="http://moobilejs.com">Moobile</a>. This release focuses on stability and building solid groundwork for the future. This includes, for instance...

<h3>iOS 6 Theme</h3>
The iOS theme has been updated to closely match the recent changes in iOS 6 for both iPhone and iPad. This release also addresses the updated border-image syntax that casued issues with buttons inside bars or alerts. Finally, elements that were not hardware-accelerated (using only translateX or translateY) are now as smooth as they should be.

<h3>Android Theme</h3>
This release includes a basic Android 4 theme. This is still a work in progress and, since my testing devices are limited, I cannot guarantee it will work well on all devices. Any tips you can share about improving speed on Android would be greatly appreciated.

<h3>Transitions</h3>
Two more transitions were added: Cover.Page and Cover.Box. They aim to replicate <a href="http://developer.apple.com/library/ios/#featuredarticles/ViewControllerPGforiPhoneOS/ModalViewControllers/ModalViewControllers.html">modal view transition on iPad</a>. The cover transition, using the Android theme, has also been customized to match the native Android look and feel.

<h3>Simulator</h3>
The simulator’s UI has been improved. It’s now less intrusive and provides a zoom functionality. Keyboard shortcuts were also added; you may now use the arrow keys to zoom or rotate. Settings (such as orientation, zoom and options) are now saved on a per-device basis so you won’t have to zoom out every time you use the iPad device on your laptop. 

<h3>The Boiler Plate</h3>
Touch icons and startup images for all sizes have been added to the boiler plate.

<h3>Moobile.Component.defineAttribute</h3>
A minor improvement, but an improvement nonetheless. For those who were tired of writing data-option-style-name, data-style is the new alternative. It’s now possible to specify a behavior for certain attributes on a component thanks to the Moobile.Component.defineAttribute function.

<h3>The Future</h3>
The next release will geared towards adding content. Tab views, split views and on-off switches will be included in the new version. I’m also planning to improve the documentation, add more examples and make things easier to understand.

<h3>Requests</h3>
If you have any requests, you’re welcome to contact me through the <a href="https://github.com/jpdery">GitHub page</a>. I’ll be glad to listen to your requests and, hopefully, improve your experience working with Moobile.

Moobile is developed by Jean-Philippe Déry and is hosted on <a href="http://moobilejs.com">moobilejs.com</a>