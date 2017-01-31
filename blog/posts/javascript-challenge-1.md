---
title: "JavaScript Challenge #1 (Wait, weekly?)"
date: "Wed, 25 Jul 2012 10:06:46 +0000"
author: "Christopher Pitt"
tags: "all,challenges"
permalink: "2012/07/25/javascript-challenge-1/"

---
The purpose of MooTools is not simply to bring syntactic sugar to JavaScript development but also to make you better at JavaScript. Often in forums and on Stack Overflow, the question will arise; "how do I do [insert UI widget] with [insert popular library]".

The problem with these kinds of questions is that they often speak of the over-dependence on a certain framework (such as MooTools or jQuery) without a proper understanding of how JavaScript works or how to structure code well.
 
It is with this in mind that we want to set some challenges in plain old JavaScript (which are probably good programming challenges for any language) that will flex your grey matter.

<!--more-->
 
This week's challenge is to find an elegant solution to generating elements in a spiral pattern. Consider the following diagram...

<div style="padding-bottom: 1em"><img src="/blog/wp-content/uploads/2012/07/Screen-Shot-2012-07-25-at-11.53.43-AM.png" alt="" width="399" height="201" /></div>

Your solution can be <a href="http://en.wikipedia.org/wiki/Procedural_programming">procedural</a> or <a href="http://en.wikipedia.org/wiki/Recursive#Functional_recursion">recursive</a>, but in either case you will be dealing with a shrinking grid of possible locations for elements. The colours do not have to be in the result - they are only used to indicate the pattern.

Hint: Try defining variables for columns and rows so that the shape can change but the positioning and order remain the same.

Try also to minimize your use of any one particular set of libraries or modules, but rather use as much vanilla JavaScript in your solution as possible.

Post your solutions in the form of links to <a href="http://jsfiddle.net/">jsfiddle</a>, <a href="http://tinker.io/">tinker</a> or <a href="http://jsbin.com/">jsbin</a> (in the comment section) and we’ll update this post with a link to a review post detailing solutions that we think tackle the problem in ways worthy of mention.

We hope to make it a weekly thing, so be on the lookout for more challenges to follow!

<strong>EDIT [2012/08/01]</strong>: We are closing comments and reviewing submissions. We will follow this post up with a review of our favourites and what they teach us about the task and JavaScript development in general.

<strong>EDIT [2012/08/08]</strong>: We have posted the <a href="/blog/2012/08/08/javascript-challenge-1-review/">review post</a> to for these submissions.