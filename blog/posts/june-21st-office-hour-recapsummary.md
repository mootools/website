---
title: "June 21st Office Hour Recap/Summary"
date: "Mon, 27 Jun 2011 12:46:11 +0000"
author: "Olmo Maldonado"
tags: "events"
permalink: "2011/06/27/june-21st-office-hour-recapsummary/"

---
As [suggested by our community](/blog/2011/06/20/reminder-next-office-hour-is-tomorrow-june-21st/#comment-2020), we’re going to release a recap, or summary, of the IRC Office Hour after every session. We want to encourage you to join us on Tuesday’s at 11am EST in the [#mootools IRC channel](irc://irc.freenode.net/mootools), but if need be let this be your medium to discuss your perspective and your own ideas (you can also discuss in the [Google Group](https://groups.google.com/forum/#!forum/mootools-users)).
### Topics Covered

* MooTools 2.0 Community “Wish List”
* MooTools Documentation
* Flex Box Model
* Require.JS and Namespacing
* MooTools Roadmap
* MooTools Feature: Accessors
* Model Change Events
* MooTools 2.0 Site
* MooTools UI and Mobile
* Event Delegation in Core
* Github Issues

<!--more-->

#### MooTools 2.0 Community “Wish List”

We created a document and shared with the IRC channel a “wish list” to add requests of what MooTools 2.0 should include. You can find the [wish list here](https://docs.google.com/document/d/1tnT5nrPSaNL2GfaaXlN0Q61NjqQoOJddjgsIjqwmhGo/edit?hl=en_US). Please add your own requests. Periodically we’ll check the list and approve items for 2.0.
#### MooTools Documentation

We talked about our efforts to improve the documentation. We were suggested in the channel to improve the argument list in the docs and include inherited properties and methods (plus link to the parent class). 

We also want to make the experience more viral and social and we’d like to include social plugins (Facebook and Twitter). A comments section akin to PHP’s plus heavy moderation to have quality comments and shared experiences.

Analytics will also play a major role as we’d like to improve feedback. We’d like to know which methods and classes are most viewed, liked, and commented. Likewise, we want to make it easier for you to find what you’re looking for. Better SEO as well as navigation and search inside of the docs.

While you are in the documentation, we are also adding inlined [jsfiddle](http://jsfiddle.net/) so that you can run the examples/demos and modify them on the fly. This also means that you can contribute your own examples/demos. 

Of course, the above is a lot of work and we welcome your participation. [Darren Waddell](/developers) has stepped up and already started working on this. Take a look at his repository ([fakedarren/mootools-docs](https://github.com/fakedarren/mootools-docs)) and **please fork**. User, kpobococ, is already working with Darren thanks to the office hour.
#### Flex box module

A user had a question about the “wrapping” of the UI so that it extends to the complete window. It’s not built-in to MooTools, but we gave him a few suggestions on how to accomplish this. Ryan Florence mentioned his [mootools-wallpaper](https://github.com/rpflorence/mootools-wallpaper) and a [jsfiddle example](http://jsfiddle.net/rpflorence/A7VNN/embedded/result,resources,js,html,css/).
#### AMD, requirejs, namespacing

First, some context. [require.js](http://requirejs.org/) is a “file and module loader” which implements the [Asynchronous Module Definition](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) (AMD) CommonJS specification. This means that you can `define` modules and `require` (load) them only if they’re necessary. The philosophy is aligned to ours. We’ve never wanted our users to download the complete repository and load it _blindly_ into a page. We’ve supported modularity, and speed, since day 1. Rest assured that MooTools 2.0 will be require.js ready out of the box. 

Namespacing, is a loaded term. It may mean to “sandbox” MooTools so that it doesn’t mess with prototypes. Namespacing may also mean that you can apply, or install, methods into any given object. We’ll make a separate blog post about this, but it’s time to let the cat out of the bag. 

We would like for MooTools 2.0 to play nice with **everyone**. This is a huge departure from 1.x days, but we’d like to position MooTools 2.0 so that you can drop it in **any** environment (that JavaScript can be run) and it will **Just Work™**. 

Valerio Proietti has started to work on this in his own [define-2](https://github.com/kamicane/mootools-core/tree/define-2) branch and we’re looking to you for feedback and opinions. Please fork and send feedback. Now is the time to make your voice heard. Once we release 2.0, there’s no going back. 
#### MooTools Roadmap

And this brings us to the roadmap. Again, well deserving of its own blog post. Here’s the official word from Valerio, himself. **We’re going straight to 2.0.** There’s no date, yet, on when this will happen but a lot of [work and time](https://github.com/kamicane/mootools-core/commits/define-2) is being put to get it out the door. 

This would be the time, for you to volunteer your time.

Oh and don’t run around frantically. 1.3.x will continued being developed but released as bug fixes and any improvements provided by the community or downgraded from 2.0.
#### MooTools 2.0 Feature: Accessor

Still in its infancy this pattern is very powerful. It’s deserving of its own blog post, but here’s the summary: with this pattern you can define and lookup functions and properties that are usually Objects now, like Class.Mutators or Element.Properties. Besides simple lookup, it can also do a match so a 'protected' Class Mutator can be defined so a Class method can be defined as `’protected foo’: function(){` so that the method cannot be run outside of the class. Have a look at the [source](https://github.com/kamicane/mootools-core/blob/define-2/Source/Data/Accessor.js).
#### Model Change Events

Someone had asked to support events for when properties change in the form of `change:foo`. It’s doubtful we’ll have this, but developer, verylastminute, has already worked on something that might serve in the mean time: [ElementSpy](http://jsfiddle.net/sixtyseconds/eRqxF/).
#### MooTools 2.0 Site

As you might have expected, there will be a new site for the launch of 2.0. We’re not yet in implementation stage, but we have [screenshot of what it might look like](http://mootools.fakedarren.com/moo2.png). If you’d like to get involved in the design (for some street cred) join us in the IRC channel to get in touch with Nathan Querido, from [QueridoDesign](http://www.queridodesign.net/), since he’s leading that project.
### MooTools UI and Mobile

There’s a strong request for an official UI and Mobile projects. Although we are not promising that we will get around to the UI and Mobile prior to 2.0 release, we do agree on having them. For now we’re supporting projects that fill this need.

For the mobile, we’re interested in [jpdery/moobile-core](https://github.com/jpdery/moobile-core) and [cpojer/mootools-mobile](https://github.com/cpojer/mootools-mobile). Add your projects in the comment section.

For UI we have our own [ART project](https://github.com/kamicane/art) which is almost ready to be released. Missing documentation and testing. There’s also projects we’re interested in: [inviz/lsd](https://github.com/Inviz/lsd), [anutron/behavior](https://github.com/anutron/behavior), [JxLib](http://jxlib.org/), and [sixtyseconds/mootools-interface](https://github.com/sixtyseconds/mootools-interface). Add your projects in the comment section.
#### Event Delegation in Core

We’re also promising that Event Delegation will be in Core before 2.0 is out the door. Still unknown if the API will change between 1.3.x and 2.0, but let’s revel in the news!
#### Github Issues

Again one of those, “deserving of its own blog post” we’re moving from Lighthouse Tickets to Github Issues. This means that we will accept any new issues in [Github](https://github.com/mootools/mootools-core/issues) and discourage the use of Lighthouse. We will disable Lighthouse after we’ve migrated.
### Next Office Hour

As you’re now aware, the MooTools Office Hours are very fun and informative. Remember that we’re having another this:

#### Tuesday, June 28th at

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

[Add it to your Google Calendar](http://www.google.com/calendar/event?action=TEMPLATE&text=MooTools%20IRC%20Office%20Hours&dates=20110628T150000Z/20110628T160000Z&details=Join%20us%20and%20ask%20away%20technical%20questions%2C%20open%20(what's%20new%2C%20what's%20coming)%20questions%2C%20or%20just%20participate%20in%20the%20party.%20MooTools%20developers%20will%20be%20in%20the%20%23mootools%20channel%20ready%20to%20answer%20and%20get%20to%20meet%20you.&location=%23motools%20on%20irc.freenode.net&trp=true&sprop=http%3A%2F%2Fmootools.net%2F&sprop=name:MooTools).

We'll be in the [#mootools](irc://irc.freenode.net/mootools) freenode.net channel.

### Guidelines 
We did very well last week in following the guidelines. I’ve included them in this post as a reminder.

1. **Please use [jsfiddle.net](http://jsfiddle.net)** and keep your code with minimal boilerplate -- get to the essence of your question
2. **Stay on topic.** Let's keep the chat around MooTools and how it interacts with your code and the rest of the JavaScript ecosystem.
3. **Be courteous and helpful with others.** We are not guaranteeing that all of us will give you our undivided attention during the hour (we are also working!). If you can answer a question (as best as you can) it will really be helpful.
4. Sharing is caring. Share the room, but also share the event. Post to twitter, Facebook, your blog, and tell your parents. We want to foster growth in our community. This is the chance to participate and to help.

### Tips
Use this button to add the open office hour to your Google Calendar. **You’ll need to setup the event so that it repeats weekly.**  
<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=MooTools%20IRC%20Office%20Hours&dates=20110628T150000Z/20110628T160000Z&details=Join%20us%20and%20ask%20away%20technical%20questions%2C%20open%20(what's%20new%2C%20what's%20coming)%20questions%2C%20or%20just%20participate%20in%20the%20party.%20MooTools%20developers%20will%20be%20in%20the%20%23mootools%20channel%20ready%20to%20answer%20and%20get%20to%20meet%20you.&location=%23motools%20on%20irc.freenode.net&trp=true&sprop=http%3A%2F%2Fmootools.net%2F&sprop=name:MooTools" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" border=0></a>
<br style="clear: both" />
If you don’t have an IRC client you can use [http://webchat.freenode.net/](http://webchat.freenode.net/). 
