---
title: "MooTools More 1.2.2.2"
date: "Tue, 05 May 2009 22:51:48 +0000"
author: "Aaron Newton"
tags: "releases"
permalink: "2009/05/05/mootools-more-1222/"

---
Today we're releasing a small update to MooTools More that address a few bugs and minor feature requests that cropped up after the initial launch. Briefly, these are the things changed since 1.2.2.1:
<ul>
    <li>Removed debug statement that enabled IframeShim in all browsers by default<a href="https://mootools.lighthouseapp.com/projects/24057/tickets/47-iframeshim-added-in-all-browsers-by-default"></a></li>
    <li>Fixed a few docs typos<a href="https://mootools.lighthouseapp.com/projects/24057/tickets/42-typo-in-requestjsonp-docs"></a></li>
    <li>Removed UTF-8 charset signature on String.QueryString and URI.Relative</li>
    <li>Assets.image now have an onError option and handle image load failure more gracefully</li>
    <li>FormValidator.Inline had issues displaying some of it's validators when input values changed</li>
    <li>OverText now allows you to specify the element type for the label test (defaults to "label")</li>
    <li>Fixed an issue with addRequests in Request.Queue; the arguments were reversed (addQueue still worked fine though)</li>
</ul>
None of these changes should affect your usage of the class, except, possibly, the change to OverText, as the element it previously created for the labels was a div. If you styled these with css and referenced the tag name, you'll either need to update your css reference or pass in <em>element: "div" </em>as an option when you invoke the class.