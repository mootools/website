---
title: "JavaScript Challenge #2 (Whac-A-Moo)"
date: "Wed, 01 Aug 2012 09:49:18 +0000"
author: "Christopher Pitt"
tags: "all,challenges"
permalink: "2012/08/01/javascript-challenge-2/"

---
Hopefully the <a href="http://mootools.net/blog/2012/07/25/javascript-challenge-1/">first challenge</a> got you excited for JavaScript development in a competitive environment...

One of the most common requirements of web applications is to be able to respond to user input, and in particular clicks (or touches). Continuing with our theme of element generation (and in some cases animation); this week’s challenge will be to create a basic <a href="http://en.wikipedia.org/wiki/Whac-A-Mole">whac-a-mole</a> game.

<!--more-->

The point of the game will be to click on highlighted elements to increase score. This can be as basic or as intricate as you wish it to be, but it should resemble the following diagram...

<div style="padding-bottom: 1em"><img src="http://mootools.net/blog/wp-content/uploads/2012/08/post3.png" alt="" width="390" height="260" class="alignnone size-full wp-image-1719" /></div>

The green block represents the block a player must click in order to gain points. This means you will need logic to randomly select one of the possible blocks and highlight it. You also need to register user clicks and update the score “label”.

Hint: at times when you need to add many of the same kind of event to a variable amount of elements (in this case blocks); it is helpful and even efficient to use event delegation. You will need to use the <strong>setInterval()</strong> function or the <strong>setTimeout()</strong> function to create a predictable amount of time between each click or highlight.

As before; post your solutions in the form of links to <a href="http://jsfiddle.net/">jsfiddle</a>, <a href="http://tinker.io/">tinker</a> or <a href="http://jsbin.com/">jsbin</a> (in the comment section) and we’ll update this post with a link to a review post detailing solutions that we think tackle the problem in ways worthy of mention.

<strong>EDIT [2012/08/08]</strong>: We are closing comments and reviewing submissions. We will follow this post up with a review of our favourites and what they teach us about the task and JavaScript development in general.

<strong>EDIT [2012/08/22]</strong>: We have posted the <a href="http://mootools.net/blog/2012/08/22/javascript-challenge-2-review/">review post</a> to for these submissions.