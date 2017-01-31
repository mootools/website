---
title: "July 12th Dev Hour Recap/Summary"
date: "Tue, 19 Jul 2011 14:28:47 +0000"
author: "Olmo Maldonado"
tags: "all"
permalink: "2011/07/19/july-12th-dev-hour-recapsummary/"

---
Every week the MooTools developers host an IRC <del>Office</del>Developer Hour where they work together to listen to your feedback, answer your questions, and develop MooTools. We do this every Tuesday at 11am EST at [#mootools Freenode IRC Channel](irc://irc.freenode.net/mootools). Everyone’s welcomed to join us.

This recap includes:

* Mentions
* Answers to: Where do you guys think MooTools can improve?
* Sneak Peak to Improved Docs
* Agenda for July 19th Dev Hour

<!--more-->

### Mentions
[Sean McArthur (seanmonstar)](http://seanmonstar.com/) is working on a MooTools-based MVC Framework called [Shipyard](https://github.com/seanmonstar/Shipyard). The framework is made for working on the browser, but it can run on [Node.JS](http://nodejs.org). He’s been testing Shipyard and we mentioned that he should try the [mootools-runner](https://github.com/mootools/mootools-runner) which runs the specs for Core and More. The Runner can be run via the browser, node.js, or CLI (via [JsTestDriver](http://code.google.com/p/js-test-driver/)). It’s lightning fast and easy to contribute to. All specs are written in [Jasmine](http://github.com/pivotal/jasmine) and mocked by [Sinon.JS](https://github.com/cjohansen/Sinon.JS).

Another user talked to us that he’s in high school in Colorado, and that he’s trying to convert his church to use MooTools instead of jQuery. We recommended that he should try to ween the church off of jQuery by using Ryan Florence’s [moo4q](https://github.com/rpflorence/moo4q), a helper to bring Object Oriented programming to jQuery. 

Another user had asked if anyone had worked on HTML5’s pushState, and we’ve pointed him to MooTools’ own Christoph Pojer’s [PowerTools](http://cpojer.net/PowerTools/#!). In particular, if you’re looking for a history plugin I highly recommend [mootools-history](https://github.com/cpojer/mootools-history).

### Questionaire
Last week we asked the channel: **Where do you guys think MooTools can improve?** We’re always glad to hear from our users and here are a few notable mentions from last week’s questionaire.

**Lighter weight**: `alpha123` had mentioned that there are some utility methods that he never uses and could go. Likewise, `xandros` pointed out that between 1.2 and 1.3 the same build with specific dependencies had grown in size. I couldn’t agree more. We’ve always been careful with the size of your builds by giving you the power to build the smallest build possible with the [online web builder](/core/) or with [Packager](https://github.com/kamicane/packager). Undoubtedly the 1.y.x branch has grown in size due to maturity and contributions from the team and our users. I’d like to personally try to arrange a “Dependency Cops” team that tries to monitor and reduce the baggage in some of the dependencies. We’d like for you to help us, though. In spare time (if any) read the source code and try to find sections of code that can be moved or refactored into its own file. This way we can reduce the bytes in the dependency chain. Send us a pull request.

**Marketing and Evangelism**: `jazzman` had mentioned that MooTools marketing and evangelism could definitely improve. Historically, MooTools core developers have shied away from marketing MooTools as a product. We’ve done this to reduce distractions and instead we’d focus strictly on the code. (If you build it, they will come.) I think that as a team we’re shifting our beliefs towards being more vocal and open about our philosophies and code. We love MooTools and think that others would be surprised with MooTools and how easy our principles help to code better. Not just for MooTools, but JavaScript. And so, we are warming up to the idea to be proactive with spreading the Moo. And so should you. Just be courteous and qualitative. MooTools is not infallible and it’s not always the best **tool** for the job. We need responsible and honest people whose interests lies in improving code, coming to a solution, and moving forward. 

**More UI Goodness**: UI components have been around since the beginning of MooTools (see: Accordion madness). We understand that many of you are looking for the team to build a UI framework, and we’d like to serve your needs. At the moment, however, we have bigger fish to fry (MooTools 2.0). Instead, please see this blog post for some mentions of [UI libraries](/blog/2011/06/27/june-21st-office-hour-recapsummary/) that are built on top of MooTools, or to use other libraries/frameworks (we’re all friends here). If you’re interested in championing this cause, then the best way to get an official (sanctioned) MooTools repo is to: do it™ and to keep us in the loop (ask us to review your commits). 

**More sourced content**: We’d like to work on more screencasts, slideshows, presentations, demonstrations and other content that would help you understand MooTools as well as show it off to your friends, nemesis, or colleagues. We understand that it’s hard to convince your team members or employer to adopt MooTools. We are working to improve this area, but we need your help. Leave us a comment on how we can help you understand or overcome hurdles when speaking with people. I’ve had a few ideas: providing you with introduction presentations that you can give to your peers, for example.

Any other areas that you think we need to improve?

### Sneak Peak to Improved Docs
[Darren Waddell](/developers) has been working on your suggestions from past [Office (Dev) Hours](/blog/2011/06/27/june-21st-office-hour-recapsummary/). In this sneak preview: each method has its own page and its own comment section (ala PHP). We’ve only shared this sneak peak with a few people and we’re already [seeing contribution](/docs/core/Element/Element/Element:constructor#comment-253004492). To see the improved docs you’ll have to create a new cookie `newdocs`. Confused? Here’s the instructions on how to use the new docs:

1. Go to the <a href=”/docs/core” target=”_new”>Core Docs</a>.
2. Copy and paste this: `javascript:Cookie.write('newdocs', true, {path: '/'})` into your address bar (or into a console).
3. Refresh the page.

If you did the above correctly, you should see that the [Element](/docs/core/Element/Element) Docs have been split into individual pages. 

Darren has done a great job so far. If you’d like to help please leave your suggestions or **fork** the [mootools-docs](https://github.com/fakedarren/mootools-docs) repository. 

### Agenda for July 19th Dev Hour

* **Features and Roadmap of 1.4.0**. Believe it or not, we’re still working on the release of 1.4.x. Word has it that **Delegation** will finally move to Core. Plus a bunch of bug fixes.
* **Improved Docs Feedback and Work**.  We’d like for you to join us to talk about the improvements that we’re making on the documentation.
* **Bug Hunting in [Lighthouse Tickets](https://mootools.lighthouseapp.com/dashboard) and [Github Issues](https://github.com/mootools/mootools-core/issues)**. To release 1.4 we’re going to need to fix a lot of bugs and to have our users report any issues. Please report your issues to Github, as Lighthouse is now deprecated (blog post coming soon).
* **Open Forum**. As always, we’d love to meet you and talk about all things Moo. 

### Next Office Hour

Remember that we’re having the next office hour this:

#### Tuesday, July 19th at

05:01 - **Honolulu** (Hast UTC-10)  
08:01 - **San Francisco** (PDT UTC-7)  
10:01 - **Chicago** (CDT UTC-5)  
11:01 - **New York** (EDT UTC-4)  
12:01 - **Rio de Janeiro** (BRT UTC-3)  
16:01 - **London** (BST UTC+1)  
17:01 - **Vienna** (CEST UTC+2)  
18:01 - **Kyiv** (EEST UTC+3)  
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
<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=MooTools%20IRC%20Office%20Hours&dates=20110719T150000Z/20110719T160000Z&details=Join%20us%20and%20ask%20away%20technical%20questions%2C%20open%20(what's%20new%2C%20what's%20coming)%20questions%2C%20or%20just%20participate%20in%20the%20party.%20MooTools%20developers%20will%20be%20in%20the%20%23mootools%20channel%20ready%20to%20answer%20and%20get%20to%20meet%20you.&location=%23motools%20on%20irc.freenode.net&trp=true&sprop=http%3A%2F%2Fmootools.net%2F&sprop=name:MooTools" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" border=0></a>
<br style="clear: both" />
If you don’t have an IRC client you can use [http://webchat.freenode.net/](http://webchat.freenode.net/).