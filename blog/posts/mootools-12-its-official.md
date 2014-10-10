---
title: "MooTools 1.2: It's Official!"
date: "Thu, 12 Jun 2008 17:35:51 +0000"
author: "Michelle Steigerwalt"
tags: "all,news,releases"
permalink: "2008/06/12/mootools-12-its-official/"

---
I speak for everyone the MooTools team when I tell you that we are extremely happy to announce the *official* release of MooTools 1.2.  After a year of development and six months in beta, you might call us perfectionists.  But now we're finally ready to call the 1.2 release complete and stable.  For those of you who have been waiting to make the switch, now would be the perfect time.

Not only has the API been completely revamped, but there have been several significant changes to the site and the way the MooTools community interacts.

<!--more-->

#### Why the Rush?

You may have noticed that the 1.2 release has come, quite literally, overnight.  Over the past few months, we've come to realize that the 1.2 beta is even *more* stable than the "stable" 1.11 release.  In fact, many developers (including some of us on the Moo team) have been using 1.2 in critical applications for some time now.

Users coming into [#mootools](irc://irc.freenode.org/#mootools) asking for support have been unofficially told to by us to upgrade to 1.2 for months.  Reluctant as we were to let ourselves call our work on 1.2 "complete", the reality finally hit us that it was time to officially offer our release to the entire development community.  We therefor decided to "just do it", flipping the final switch and changing to the new version of the site before this blog post and some areas of the site were completely functional.

#### Where Have the 1.11 Docs and Demos Gone?

The 1.11 docs have been moved to http://docs111.mootools.net.  Conversely, the 1.2 docs have been moved from http://docs12b.mootools.net to the main docs subdomain (http://docs.mootools.net).  The same is true for demos.

* [1.11 Documentation](http://docs111.mootools.net)
* [1.11 Demos](http://demos111.mootools.net)
* [1.2 Documentation](http://docs.mootools.net)
* [1.2 Demos](http://demos.mootools.net)


#### 1.2 is Totally New

Don't let the version number fool you.  1.2 is not merely a minor revision of 1.11.  As those of you who have been reading the blog will be aware, 1.2 has a completely updated API and is not compatible with 1.11 code.  You can, however, utilize the compatibility layer that has been built to make the transition to 1.2 easier.

* [Core Compatibility File](http://mootools.net/js/mootools-compat-core.js)
* [Plugin Compatibility File](http://mootools.net/js/mootools-compat-more.js)

Since most of the changes between 1.2 and 1.11 have been documented in [earlier posts](http://blog.mootools.net/2007/11/14/mootools-1-2-beta-1) to this blog, I won't go into the details here.

#### Offsite Hosting of Version Management, Tickets, and Discussions

Because of the increasing popularity of this project of ours, we have been under an increasing amount of stress to keep the various parts of this site running in good order.  You may have experienced downtime relative to MooTools recently.  We understand that many developers utilize MooTools in critical components of their projects, and such downtime is completely unacceptable.

To solve these issues for the 1.2 release, we have moved our critical components offsite to the best provider of each component, granting MooTools users with the highest possible uptime of all areas of the site.  A major benefit of this move is being able to completely reinvent the way we interact with our community of users (aka you guys!).

#### Git

Along with the 1.2 release comes our shift from Subversion to Git.  Git is a huge step forward to our development
model, allowing everyone who wants to contribute to MooTools the ability to create their very own fork.  Each fork can then be merged
into the main core as seen fit or used on its own as an alternate version of MooTools.  This allows us to release faster, iterate to
better versions and better handle the contributions of the community.

This allows would-be contributors to play in their own sandbox without worrying about whether or not their suggestions are appropriate.  So get forking!

**Please note that the Subversion repository will no longer keep up with changes to MooTools.**  You will have to check out the Git
repository for that.

To keep the core lean and mean, we have created a separate repository for plugins, called "More".  Plugins are defined as specialty components which aren't crucial to the core functionality of MooTools.  This includes modules which have been part of the core distribution until now.

You'll also notice that the download page has been split into two pages, one for Core and one for More.  (Further repositories may be coming in the future if we can think of more rhyming names.)

#### GitHub

We're using GitHub to host our new Git repositories.  We now have one [respository for Core](http://github.com/mootools/mootools-core) and [another for More](http://github.com/mootools/mootools-more).  The folks over there have given us an [extremely warm reception](http://github.com/blog/83-moohub), and we are likewise very happy to have such a great service at our disposal.

#### Bug Tracking by Lighthouse

We have abandoned our Trac, which has been giving us problems over the past weeks, for Lighthouse.  Lighthouse allows us to integrate our ticketing system with our new Github account and should provide everyone with a comparable experience to our previous system.

You can visit the [new Lighthouse account here](http://mootools.lighthouseapp.com/).

#### New MooTools User Group

As part of our offsite initiative, we have moved the community forum to Google, where it hopefully will not crash and die.  The forums will be back shortly, but only as a read-only archive.

#### Join Us on IRC

While we've been partying in the IRC room for quite some time, the IRC link to #mootools on Freenode has been added to the main page of MooTools.net.  If you have not visited us there before, please feel free to stop by to ask your questions or just hang out.  We love chatting with new users.

#### New Faces

One last note is that we've added two new members to the MooTools production team, Jan Kassens and Thomas Aylott.  Both of them have been working extremely hard for quite some time now to bring you a better framework, and we're very happy to give them formal recognition.

#### Links In Case You Missed Them

##### Docs and Demos

* [1.11 Documentation](http://docs111.mootools.net)
* [1.11 Demos](http://demos111.mootools.net)
* [1.2 Documentation](http://docs.mootools.net)
* [1.2 Demos](http://demos.mootools.net) 

##### Compatibility

* [Core Compatibility File](http://mootools.net/js/mootools-compat-core.js)
* [Plugin Compatibility File](http://mootools.net/js/mootools-compat-more.js)

##### Git Repositories

* [Core Repository](http://github.com/mootools/mootools-core)
* [Plugin Repository](http://github.com/mootools/mootools-more)

 **THE SUBVERSION REPOSITORY WILL NO LONGER BE UPDATED.**

##### Bug Tracking / Tickets

* [MooTools at Lighthouse](http://mootools.lighthouseapp.com/)

##### Community Discussion

* [MooTools Users at Google Groups](http://groups.google.com/group/mootools-users/)
* [#mootools on Freenode](irc://irc.freenode.org/#mootools)