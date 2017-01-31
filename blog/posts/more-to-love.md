---
title: "More To Love"
date: "Mon, 09 Mar 2009 22:28:03 +0000"
author: "Aaron Newton"
tags: "releases"
permalink: "2009/03/09/more-to-love/"

---
I know, sometimes when you look at the source code of MooTools you ask yourself, "How could this possibly be any better? Because it's so <em>awesome</em>." I am by and large always stumped by this question, as the code is so meticulously maintained by its authors.

Today, I have an answer. The only way to give you a better MooTools is to give you <em>more of it</em>. It's that awesome. Today, we're making MooTools awesomer.

We give you the new and improved MooTools More - the official plugin collection for MooTools. The plugins we are releasing today take the fifteen files previously in MooTools More and triple them. That's three times the awesome!

<!--more-->

What's in it you ask? Well, let me tell you. The new and improved -more <em>currently</em> includes:
<ul>
    <li>Class extensions including a Binds mutator, easier refactoring, chain pausing and more.</li>
    <li>New Native extensions including more love for String and Array, plus a fully featured Date Native and a URI extension to make managing links downright fun.</li>
    <li>More Element love with help for managing text selection and relative positioning (put this box's lower right corner next to the upper right corner of that other box...)</li>
    <li>Form love including a robust and extensible form validator and a class for displaying hint text over an input.</li>
    <li>Extended Request functionality including JSONP support and Queuing.</li>
    <li>Support for language localization for classes that output text (days of the month, months of the year, form validation errors, etc)</li>
</ul>
Oh, and we've already translated the text content in these new plugins (Date and FormValidator specifically) into half a dozen languages thanks to all the helpful folks in the MooTools-Lang user group (do you know a language other than English? <a href="http://groups.google.com/group/mootools-lang">Want to help? Here ya go</a>).

I know, you can barely contain your excitement. Us too! Surely, you ask, there must be a catch to all this awesomeness. Does it cost four easy installments of $19.99? Shipping and handling? Must you sign an oath? Nay! It's free for the taking.
<h3>But there are a Few Catches</h3>
First, today's release is just the beta - the first release candidate (RC1). This means that you will certainly encounter problems, which would imply that it's not 100% awesome (you are wrong! It <em>is</em> 100% awesome - when the beta is finished and we officially release it it will be 125% awesome).

But yes, you may encounter bugs. In this case, you will need to file it in the shiny <a href="http://mootools.lighthouseapp.com/projects/24057-mootoolsmore/tickets">new MooTools-More dedicated Lighthouse</a>. Industrious types are encouraged to <a href="http://github.com/mootools/mootools-more/tree/master">pull the repository from github and try and fix things themselves</a> - helping hands are always appreciated.

In addition to this, the docs for the beta are in a different location (links at the bottom). The search in these docs still points to the google search for the current docs, so the new stuff won't be returned if you use the search.

Also note that there is not a compatibility layer yet written for this release. There are only a handful of items from the previous files that were in MooTools More. For those of you using <a href="http://www.clientcide.com/js">the Clientcide libraries</a>, you'll see a lot of familiar scripts on the list, and there are numerous changes between the versions on Clientcide and the versions here. You can <a href="http://github.com/mootools/mootools-more/tree/master#readme">see the list of breaking changes in the readme</a>.
<h3>Enough! Give It To Me!!!</h3>
Ok, ok, you want links? Here you are:
<ul>
    <li><a href="/docs_rc1/">The Docs for MooTools More RC1</a></li>
    <li><a href="/more_rc1">Download MooTools More RC1</a></li>
</ul>
<h3>How You Can Help</h3>
There are several things you can do to pitch in. First, you can run the tests in all the browsers you have access to. There are two types of tests:
<ul>
    <li><a href="/libs/mootools/more/Specs/">The Specs Tests</a></li>
    <li><a href="/libs/mootools/more/Tests/">The User Tests</a></li>
</ul>
Running through these in your browsers and reporting anything that seems wonky will help us tremendously. If you know a language that hasn't yet had the translation written for Date or FormValidator, you can, as mentioned previously, <a href="http://groups.google.com/group/mootools-lang">jump into the MooTools-Lang group and help out with that</a>.
<h3>More to Come</h3>
MooTools More is now it's own official project which means its release schedule is no longer tied to MooTools Core. Once this release candidate is fully released (hopefully in the next week or so) expect to see new plugins arrive every week or two. Our objective is to quickly grow the plugins available here as well as address bugs in MooTools More constantly. We have a long list of functionality already lined up for future releases. This is only the beginning! If you want to get involved, read more on <a href="http://wiki.github.com/mootools/mootools-more">the MooTools More wiki</a>.
<h3>Thanks</h3>
Special thanks go to the MooTools More team <a href="http://og5.net/christoph">zilenCe</a> (<a href="http://twitter.com/cpojer">Christoph Pojer</a>), <a href="http://devthought.com">devthought</a> (<a href="http://twitter.com/rauchg">Guillermo Rauch</a>), <a href="http://davidwalsh.name">David Walsh</a> (er, <a href="http://twitter.com/davidwalshblog">David Walsh</a>), and the numerous others who helped in the development of this release. Seriously, <a href="http://github.com/mootools/mootools-more/network">there were a lot of people who chipped in</a>. You can too, if you like.