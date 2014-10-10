---
title: "July 5th IRC Office Hour Recap/Summary"
date: "Mon, 11 Jul 2011 19:11:25 +0000"
author: "Olmo Maldonado"
tags: "all"
permalink: "2011/07/11/july-5th-irc-office-hour-recapsummary/"

---
Every week the MooTools developers have an IRC office hour meeting where they work together to listen to your feedback, answer your questions, and develop on MooTools. We do this every Tuesday at 11am EST at [#mootools Freenode IRC Channel](irc://irc.freenode.net/mootools). Everyone’s welcome so join us tomorrow.

This recap includes:

* Compare 1.3.x and Experimental 2.y.x Code Diffs
* Things to Come (Agenda’ed Office Hour, Dedicated “Hackathon” Office Hours)

<!--more-->

Last week we had a small conversation of the [experimental branch that Valerio has for MooTools 2.0](http://github.com/kamicane/mootools-core/tree/define-2). The conversation covered most of the comments in [last week’s post comments](http://mootools.net/blog/2011/07/04/june-28th-irc-office-hour-recapsummary/#comments). Instead of going over them again, please take a look at last week’s post. 

### Compare 1.3.x and Experimental 2.y.x Code Diffs

Like I had promised last week, I did want to start a repository for helping you understand what are the main differences (in code) between 1.3.x and the experimental 2.y.x. Last week the [mootools-1-vs-2 repository](https://github.com/ibolmo/mootools-1-vs-2) to do just that. You can use Github’s **awesome** Compare View to [view the differences between 1.3.x and 2.y.x](https://github.com/ibolmo/mootools-1-vs-2/compare/1.3.x...2.y.x) (Valerio’s experimental branch).

The files included in the repo are meant to compare Core code, Plugin code, and Application code:

**Core Code**

* **Request.js** is from the MooTools [Core/Request](https://github.com/mootools/mootools-core/blob/master/Source/Request/Request.js).

**Plugin Code**

* **Database.js** (by [Daniel Buchner](http://github.com/csuwldcat)). You can find the original Database.js in the repo as well as in his [csuwldcat/mootools-htmlx](https://github.com/csuwldcat/mootools-htmlx).

* **ScrollSpy.js** (by [David Walsh](https://github.com/darkwing)). You can find the original ScrollSpy.js in the [MooTools Forge](http://mootools.net/forge/p/scrollspy).

**Application Code**

* **Examples/001.js** and **Examples/002.js** are examples from the [Request.js](http://mootools.net/docs/core/Request/Request) documentation. 

#### Caveats
**The examples are not all encompassing of user behavior and usage.** I did select the scripts, but I tried to be fair. You can fork the repository and add your files to the [1.3.x branch](https://github.com/ibolmo/mootools-1-vs-2) (the base branch) and send me a [pull request](https://github.com/ibolmo/mootools-1-vs-2/pulls) and I’ll try to port your code. Please be considerate, and send me at most one file with recommended maximum of 500 lines.

**The code will change as 2.0 is further defined**. The 2.0 API is not final. Valerio is kicking butt everyday on his experimental branch. This compare 1.3.x vs. 2.y.x repo. is meant to assuage some of the concerns from the [previous blog post](http://mootools.net/blog/2011/07/04/june-28th-irc-office-hour-recapsummary/) about Valerio’s experimental 2.0 branch. 

**This repo is not a definitive guide to 2.0**. We’re still working on that definitive guide for 2.0, but since the API is not strictly defined it’s premature to give you this. For now, leave your comments or join us tomorrow with your questions. 

**The repo doesn’t show `Host.Install`**. The intention of the repo. is to show the default behavior of 2.0. I’m likely to create another branch and call it `2.y.x-installed` so that you’ll see the differences between 1.3.x and 2.0.x with native extensions installed. 


### Things to Come.
#### Agenda for the Office Hours
We were asked that Office Hours should have an agenda so that we can have a more directed conversation. I didn’t have a chance to inquire the team for items, but we should have some items for next week. 

Any suggestions? Leave a comment below.

#### Mini Hackathons or “Dedicated” Office Hours
Similar to the above, it’s been suggested by [Darren Wadell](http://github.com/fakedarren) and [Arian Stolwijk](http://github.com/arian) that we could dedicated actionable work hours. We could have demos office hour, documentation, bugfix or test office hours for example. 

What do you think? Would you participate?


### Next Office Hour

Remember that we’re having the next office hour this:

#### Tuesday, July 12th at

05:01 - **Honolulu** (Hast UTC-10)  
08:01 - **San Francisco** (PDT UTC-7)  
10:01 - **Chicago** (CDT UTC-5)  
11:01 - **New York** (EDT UTC-4)  
12:01 - **Rio de Janeiro** (BRT UTC-3)  
16:01 - **London** (BST UTC+1)  
17:01 - **Vienna** (CEST UTC+2)  
20:31 - **Mumbai** (IST UTC+5:30)  
23:01 - **Hong Kong** (HKT UTC+8)  
00:01 - **Tokyo** (JST UTC+9)  
01:01 - **Sydney** (EST UTC+10)  
03:01 - **Auckland** (NZST UTC+12)

We'll be in the [#mootools](irc://irc.freenode.net/mootools) freenode.net channel.

### Guidelines
We did very well last week in following the guidelines. I’ve included them in this post as a reminder.

1. **Please use [jsfiddle.net](http://jsfiddle.net)** and keep your code with minimal boilerplate -- get to the essence of your question
2. **Stay on topic.** Let's keep the chat around MooTools and how it interacts with your code and the rest of the JavaScript ecosystem.
3. **Be courteous and helpful with others.** We are not guaranteeing that all of us will give you our undivided attention during the hour (we are also working!). If you can answer a question (as best as you can) it will really be helpful.
4. Sharing is caring. Share the room, but also share the event. Post to twitter, Facebook, your blog, and tell your parents. We want to foster growth in our community. This is the chance to participate and to help.

### Tips
Use this button to add the open office hour to your Google Calendar. **You’ll need to setup the event so that it repeats weekly.**  
<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=MooTools%20IRC%20Office%20Hours&dates=20110712T150000Z/20110712T160000Z&details=Join%20us%20and%20ask%20away%20technical%20questions%2C%20open%20(what's%20new%2C%20what's%20coming)%20questions%2C%20or%20just%20participate%20in%20the%20party.%20MooTools%20developers%20will%20be%20in%20the%20%23mootools%20channel%20ready%20to%20answer%20and%20get%20to%20meet%20you.&location=%23motools%20on%20irc.freenode.net&trp=true&sprop=http%3A%2F%2Fmootools.net%2F&sprop=name:MooTools" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" border=0></a>
<br style="clear: both" />
If you don’t have an IRC client you can use [http://webchat.freenode.net/](http://webchat.freenode.net/).