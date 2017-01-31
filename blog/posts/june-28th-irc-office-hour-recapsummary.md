---
title: "June 28th IRC Office Hour Recap/Summary"
date: "Tue, 05 Jul 2011 01:37:34 +0000"
author: "Olmo Maldonado"
tags: "all,events"
permalink: "2011/07/04/june-28th-irc-office-hour-recapsummary/"

---
Every week the MooTools developers have an IRC office hour meeting where they work together to listen to your feedback, answer your questions, and develop on MooTools. We do this every Tuesday at 11am EST at [#mootools Freenode IRC Channel](irc://irc.freenode.net/mootools). Everyone’s welcome so join us tomorrow.
### Recap
<!--more-->
Last week’s office hour was dominated by the experimental [define-2](http://github.com/kamicane/mootools-core/tree/define-2) branch by [Valerio](/developers). This branch has the experimental support of [Asynchronous Module Definition (AMD)](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) and also has the proposed direction of MooTools 2.0 as mentioned in the [previous blog post](/blog/2011/06/27/june-21st-office-hour-recapsummary/). 

From the discussion in last week’s office hour, it seemed that there was confusion on the implications of adopting Valerio’s 2.0 branch. In particular there were concerns for: compatibility, native extensions (and minimum ES5 polyfills), chainability, and style. 

At first, 2.0 will likely not be compatible with 1.3 without a builder and an upgrade script. Since we’ve yet to cross this road, please be vigilant of the changes and discussion that are underway. As always, rest assured that we would like to make your transition into 2.0 as easy and immediate as possible.

Without a dedicated blog post, I’d like to recap that there is a divide between the community and even the MooTools developers about the possible decision to **not** extend native objects (e.g. Array, Number, String, …) by default. One side of the argument is that this is a 180 degree shift in MooTools style and philosophy and that it ruins competitive differentiation (a [marketing term](http://www.gobignetwork.com/information/go-big-dictionary/competitive-differentiation-definition)). On the other side of the argument is that this is necessary to stay **relevant** in the discussion, that we’ve cornered ourselves between a rock and a hard place and that we just need to be better. Valerio had even quoted [Steve Jobs as a perfect explanation](http://www.youtube.com/watch?v=3LEXae1j6EY#t=09m20s) on his position.

Instead of going further and making points for either argument, it’d be more appropriate if we make a definitive post on the matter. 

### Next Office Hour

The discussion is still not done. If you’d like to give us your $0.02 on the matter, we welcome your thoughts and concerns. If you’d like to contribute to the [2.0 Wish List](https://docs.google.com/document/d/1tnT5nrPSaNL2GfaaXlN0Q61NjqQoOJddjgsIjqwmhGo/edit?hl=en_US), add your suggestion or talk to us on IRC. Remember that we’re having the next office hour this:

#### Tuesday, July 5th at

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

[Add it to your Google Calendar](http://www.google.com/calendar/event?action=TEMPLATE&text=MooTools%20IRC%20Office%20Hours&dates=20110705T150000Z/20110705T160000Z&details=Join%20us%20and%20ask%20away%20technical%20questions%2C%20open%20(what's%20new%2C%20what's%20coming)%20questions%2C%20or%20just%20participate%20in%20the%20party.%20MooTools%20developers%20will%20be%20in%20the%20%23mootools%20channel%20ready%20to%20answer%20and%20get%20to%20meet%20you.&location=%23motools%20on%20irc.freenode.net&trp=true&sprop=http%3A%2F%2Fmootools.net%2F&sprop=name:MooTools).

We'll be in the [#mootools](irc://irc.freenode.net/mootools) freenode.net channel.

### Guidelines
We did very well last week in following the guidelines. I’ve included them in this post as a reminder.

1. **Please use [jsfiddle.net](http://jsfiddle.net)** and keep your code with minimal boilerplate -- get to the essence of your question
2. **Stay on topic.** Let's keep the chat around MooTools and how it interacts with your code and the rest of the JavaScript ecosystem.
3. **Be courteous and helpful with others.** We are not guaranteeing that all of us will give you our undivided attention during the hour (we are also working!). If you can answer a question (as best as you can) it will really be helpful.
4. Sharing is caring. Share the room, but also share the event. Post to twitter, Facebook, your blog, and tell your parents. We want to foster growth in our community. This is the chance to participate and to help.

### Tips
Use this button to add the open office hour to your Google Calendar. **You’ll need to setup the event so that it repeats weekly.**  
<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=MooTools%20IRC%20Office%20Hours&dates=20110705T150000Z/20110705T160000Z&details=Join%20us%20and%20ask%20away%20technical%20questions%2C%20open%20(what's%20new%2C%20what's%20coming)%20questions%2C%20or%20just%20participate%20in%20the%20party.%20MooTools%20developers%20will%20be%20in%20the%20%23mootools%20channel%20ready%20to%20answer%20and%20get%20to%20meet%20you.&location=%23motools%20on%20irc.freenode.net&trp=true&sprop=http%3A%2F%2Fmootools.net%2F&sprop=name:MooTools" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" border=0></a>
<br style="clear: both" />
If you don’t have an IRC client you can use [http://webchat.freenode.net/](http://webchat.freenode.net/).