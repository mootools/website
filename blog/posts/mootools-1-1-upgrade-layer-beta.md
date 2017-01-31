---
title: "MooTools 1.1 Upgrade Helper (beta)"
date: "Thu, 31 Dec 2009 20:03:50 +0000"
author: "Moo Tools"
tags: "releases,tips"
permalink: "2009/12/31/mootools-1-1-upgrade-layer-beta/"

---
Users wishing to upgrade any large site from MooTools 1.1 to 1.2 can sometimes find it difficult. The API for 1.2 changed quite a bit, so without help upgrading your code can be fraught with danger.

Our solution is an upgrade helper that will allow you to replace your old MooTools 1.1 code with 1.2 code by logging deprecated methods to the console and telling you what needs to be changed.

The upgrade helper also attempts to automatically convert 1.1 calls to 1.2 calls. However, this helper is not really meant to be a compatibility script so much as a script designed to help you migrate your code. In almost all cases methods that have been deprecated or have had their API altered will provide feedback to the console when they are called. Ideally, developers will put this script into their environment with MooTools 1.2, use their application and change all the calls that throw warnings, then remove the upgrade helper from their environment.

### Using the Upgrade Helper

You can download the upgrade helper on the [MooTools Download Page](/download#upgrade-helper) along with current build of MooTools built for it. This companion library has all the functionality found in MooTools 1.1 (Drag, Accordion, etc. - some of these plugins moved out of MooTools Core and into MooTools More in 1.2).

Simply replace MooTools 1.1 with MooTools 1.2, include the upgrade helper, then include your site's code. Browse your site with a browser that provides a console API (we recommend [Firefox](http://firefox.com) with [Firebug](http://getfirebug.com)) and take note of the warnings thrown (note, you can adjust the logging; see the [readme](http://github.com/mootools/mootools-upgrade-helper#readme)). Address these in your code base until you cannot find any more, then remove the upgrade helper. You have now an upgraded website, and you can use the plugins in the [Forge](/forge)!

If you still have warnings after you have finished converting your code, have a look at the [documentation for 1.1](http://docs111.mootools.net/) and [1.2](/docs/core/) and also the source code in the [upgrade helper](http://github.com/mootools/mootools-upgrade-helper). Most changes are simple, but may require a change of arguments. There are a few breaking changes but in the vast majority of cases these should not affect you. A complete list of the changes between 1.1 and 1.2 can be found in the readme of the github [upgrade-helper repository](http://github.com/mootools/mootools-upgrade-helper#readme).

### Feedback, Help, and Resources

The upgrade helper is being released as a beta for now. We've written and run tests against the browsers we support but the real world usage of MooTools will be the real test. As such, we hope that you, the MooTools community, will help us polish this script, by letting us know what features on your sites don't work. Bugs can be filed using the [github issues for the repository](http://github.com/mootools/mootools-upgrade-helper/issues).

Arguably, this is something we should have provided long ago. Going forward, we've pledged to make all releases 100% backwards compatible for all documented methods and features.

Should you require any guidance or assistance, you can, as always, find us in the [#mootools IRC channel](irc://irc.freenode.net/#mootools)  or post in the [MooTools Google Group](http://groups.google.com/group/mootools-users/).

Last of all, massive thanks to [Nathan White](http://www.nwhite.net) and [David Isaacson](http://www.siafoo.net/snippet/137), for their early work on this. In the last few weeks the MooTools Dev team has spent a lot of time making and testing this upgrade helper, but these guys kicked this off with their contributions and they are most appreciated.
