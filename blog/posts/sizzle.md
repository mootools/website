---
title: "Sizzle"
date: "Fri, 05 Dec 2008 04:34:37 +0000"
author: "Valerio Proietti"
tags: "all"
permalink: "2008/12/04/sizzle/"

---
During the last couple of days, there has been a <a href="http://ajaxian.com/archives/a-great-example-of-sharing-sizzle-engine-in-dojo-foundation">discussion</a> in <a href="http://www.clientcide.com/industry-news/sizzle-power-in-mootools/
">various places</a> about JavaScript frameworks implementing Sizzle, the new CSS selector engine by John Resig, which is allegedly the fastest.

Resig wrote <a href="http://tomocchino.com">Tom</a> an email, saying that he would be pleased if MooTools joined the other frameworks by implementing Sizzle in its codebase, replacing our own selectors engine. I don't really know how many frameworks are actually thinking of using Sizzle in place of their own selectors code, as the only source I can find for this is Ajaxian.

Their information about Dojo wasn't correct, so I'm assuming that information about other frameworks is incorrect as well. I do know that Dojo is considering including Sizzle as part of the Dojo foundation, based on an <a href="http://www.clientcide.com/best-practices/dojos-dylan-schiemann-and-jquerys-john-resig-on-my-sizzle-post/
">email Dylan Schiemann wrote to Aaron Newton</a>. As I understand it, Sizzle would become a Dojo Foundation project, with the ultimate goal of including it into Dojo Toolkit. They have this idea of having the major framework developers all contribute to a unified CSS selector engine.

Now that you know the general picture, let me explain why this is a bad idea not only for MooTools, but for any framework other than Dojo and jQuery.

<!--more-->

There are several reasons why a project like MooTools would never include a third party library like Sizzle in its codebase. First of all, we already have a very fast, very manageable and solid CSS selector engine in place. I worked on it a lot, I know how it works, and I know that if it ever needs a fix, every MooTools collaborator can just git it and fix it, right away. Every Mootools collaborator knows how MooTools works, what our code practices are, and how to submit either a patch (if they don't have Git credentials), or patching the code themselves.

With Sizzle, I would have to submit a patch to the Dojo codebase, which would have to be passed through Dojo.  This leaves the possibility that the patch could be rejected, leaving us with a part of our library that doesn't fit with our core philosophies.

It is largely a matter of code itself. MooTools has its own very strict code rules and conventions. For example, everyone working on MooTools knows that if they have to detect Explorer, they need to use Browser.Engine.trident, everywhere. If a developer doesn't do that, he would probably be yelled at by myself. By including a standalone library like Sizzle, we would be breaking our own rules. MooTools does a great deal of work by abstracting common functionality and reusing these abstraction everywhere, for both ease of update and code readability. By including a standalone library like Sizzle, we would be breaking this paradigm that has worked so well for us so far. But most of all, we would be breaking the very essence of MooTools, being one single entity, perfectly balanced and in harmony with all of its parts.

Sizzle itself is well written, don't get me wrong, but I honestly don't think it's any better that what we currently have. First, Sizzle is a very big script in size compared to our selectors engine.

Second, it (unintentionally) highlights a shortcoming in SlickSpeed by caching every expression's results. John has a <a href="http://github.com/jeresig/sizzle/tree/master/speed">speed folder</a> in his Sizzle GitHub repository, where he is comparing a selectors engine to real-world frameworks. SlickSpeed runs every expression five times, recording the median result. Since Sizzle caches the results, <strong>Sizzle results will always come out five times faster than anything else</strong>, assuming the code is as efficient as every other framework's.

Third, as some of you might already know, MooTools post-processes every node resulting from any query. This tends to make things slower. Sizzle however is a pure engine, therefore makes no post-processing at all. This results in a <strong>very unfair comparison</strong>.

In an effort to test the true efficiency of our CSS selectors engines, I have made a modification to <a href="http://code.google.com/p/slickspeed">SlickSpeed</a>, so that it runs every test only once, and a couple of modifications to the MooTools code. This special testing version of MooTools no longer "extends" the resulting nodes (I did that by simply adding a method that passes an optional parameter to the default function getElements, as I cannot pass parameters using SlickSpeed), and it uses <a href="http://webkit.org/blog/156/queryselector-and-queryselectorall/">querySelectorAll</a> where available, just like Sizzle does. This way we can have a <strong>true comparison between engines</strong>, instead of <strong>frameworks and engines</strong>.

<a href="http://mootools.net/mootools_vs_sizzle">Feel free to test my results</a> in every browser available to you. As you can see, <strong>the Sizzle engine is slower in many browsers</strong>.

Even assuming Sizzle were faster than MooTools in every test, it would be unwise to adopt it.

The Dojo Foundation and jQuery have it easy. The Dojo people can just work on their own code repositories, where everyone knows what to do and how to contribute. It's basically the same thing for jQuery: Sizzle is copyrighted by John Resig.  He will always have a way to add/remove/modify whatever he pleases. Us outsiders, however, won't have it as pretty. We would have to gain the approval of the Sizzle project before making changes, limiting the power we have over our own codebase. As with any project, there is always a chance that a patch that we submit won't be accepted. In that case, we're stuck with code we don't like.

This centralization of code would create a dangerous precedent, eliminating competition in the marketplace and choices for developers who rely on frameworks. Quoting <a href="http://en.wikipedia.org/wiki/Monopoly">Wikipedia</a>:

<blockquote>

<p>[A] monopoly exists when a specific individual or enterprise has sufficient control over a particular product or service to determine significantly the terms on which other individuals shall have access to it.</p>

<p>It is often argued that monopolies tend to become less efficient and innovative over time, becoming "complacent giants", because they do not have to be efficient or innovative to compete in the marketplace. Sometimes this very loss of psychology efficiency can raise a potential competitor's value enough to overcome market entry barriers, or provide incentive for research and investment into new alternatives.</p>
</blockquote>

I'm not saying that John Resig seeks a monopoly over CSS selector engines, but that's sure what it looks like. Competition and innovation will stop if everyone uses the same piece of code. Yes, competition <strong>and</strong> innovation.

Sooner or later, it will become too cumbersome trying to make Sizzle, or any other "shared component" fit our selfish, OCD-driven developer needs. No sane contributor will be eager to take the extra steps to contribute to different parts of our libraries, and in the end we'll have contributors completely ignoring the selector side of it. Personally, I would never ever take my developers through the process of learning two different sets of project guidelines just because they want to contribute to the selector engine and make modifications.

As I've said, MooTools developers know MooTools stuff.  That's what MooTools is all about: MooTools stuff. This is the way it should be for every other framework, otherwise, it's kinda pointless having your own. Unifying portions of frameworks would be the end of independent innovation, and we would become reliant on John and Dojo to make it better.

Or we could fork it, which would negate any proposed benefits, like having all developers of all frameworks work on a common piece of code.

If MooTools were allowed to submit any code which we wanted, we would have to assume that the same would be true of all other framework projects adopting Sizzle.  Without any serious form of control, it would soon become a monster script that fits nobody's needs.

Citing a bold sentence in <a href="http://ajaxian.com/archives/a-great-example-of-sharing-sizzle-engine-in-dojo-foundation">this Ajaxian article</a>:

<blockquote>It's very likely that Sizzle will eventually expand into other areas of JavaScript libraries (such as DOM manipulation and event binding).</blockquote>

Let's face it: every selector engine, every part of our libraries has benefited from the others.  Where they diverge is not an indicator of which framework is superior to another.  Rather, they are differences in philosophy.  If everyone were to use the same, shared codebase, these awesome open source contributions and general advancements will stop, and users wouldn't be able to choose the approach which works best for them. I don't want to see that happening.

The very reason we have many JavaScript frameworks is because we want to do the same things, differently. Each one has its own way to code, its own way of solving problems. By including something that's not MooTools in MooTools, we would make MooTools be less MooTools (and more jQuery, in this case).

So, if using one shared selector engine is ok, where do we draw the line? Is it ok to use a shared DOM manipulation library, or a shared event library? What makes our framework <i>ours</i>? If we start replacing core parts by outsourcing them to Dojo, our frameworks will just be a dull layer for code we didn't even write, and we will lose credibility.

Why use a layer when I can just use the real deal? Why would I use MooTools, if it's just a layer for Dojo or jQuery code? Don't even try and justify that it's not, because the code would be on Dojo servers, administered by Dojo foundation rules. Its Dojo's. We at MooTools prefer MooTools code, by MooTools coding standards and rules. And I'd be surprised if many frameworks are willing to give this all away for nothing.