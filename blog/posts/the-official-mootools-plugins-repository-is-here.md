---
title: "The Official MooTools Plugins Repository Is Here!"
date: "Thu, 10 Dec 2009 11:33:01 +0000"
author: "Guillermo Rauch"
tags: "news"
permalink: "2009/12/10/the-official-mootools-plugins-repository-is-here/"

---
If I was to highlight the single most important thing for MooTools in 2009, I would say without a doubt it's been its *community*. This year has seen the involvement of many individuals from all over the world that have contributed their time, expertise, talent and charm. Our San Francisco & <a href="/blog/2009/11/30/london-hackathon-2009/">London</a> hackathons are clear confirmation of this.

Today we're introducing a tool that has been in the works for the past few months that we believe will change how our community collaborates forever. Meet <a href="/forge">the MooTools Forge</a>.

<h3>The Problem</h3>

As a framework, you probably expect MooTools to be compact and provide you with the tools that solve most of your JavaScript problems easily and elegantly and that's been our goal all along. But for all the other specific needs that your projects have, no matter what framework, you've probably found yourself googling for plugins or snippets before. No one wants to reinvent the wheel.

That Google search will probably return thousands and thousands of results. Many people have even approached the same problem in many different ways (try <a href="http://www.google.com/search?q=mootools+slideshow+plugin">searching for a mootools slideshow plugin</a>!). This distributed model, although relatively effective, represents problems for both users and developers.

For the users, it becomes hard to establish comparisons between the plugins as every developer will represent them differently on their websites. Sometimes it's hard to find a demo, sometimes you just don't know how to use the thing. Other times the website will be offline for a couple hours, or maybe you don't know on what other components the plugin might depends to function.

But can we blame developers? Creating a plugin that you can distribute to people takes work. And for some of us, experience shows that writing documentation, uploading it to our cumbersome blog systems, preparing screenshots (and then upgrading them upon a new release!) can sometimes be even more difficult than writing the plugin itself. Still, there are <a href="http://www.clientcide.com/tools/why-you-should-consider-releasing-code/">some good reasons to consider releasing your code</a>.

<h3>The Solution: for users</h3>

For people trying to find plugins, we wanted a simple interface with *visual* focus on what's available. Going through lists of plugins whose names are not always that intuitive or descriptive is both boring and inefficient. You might find yourself opening dozens of tabs just to see what the plugin can potentially offer. We want to try and put all the information you need to make a choice right in one place.

<p style="text-align:center"><a href="http://cld.ly/4eqbg" target="_blank"><img src="http://cld.ly/2aqbx" alt="Browse plugins" style="float: none"/></a></p>

While each plugin can have tags that you can browse, we also came up with a concise list of categories that group the most recurrent functions: Effects, Forms, Interface, Media, Native, Realtime, Request, Utilities, Widgets. 

For plugins themselves, we wanted to make three basic tasks easy: seeing a demo, downloading, learning how to use. This is the result:

<p style="text-align:center"><a href="http://cld.ly/10qbp" target="_blank"><img src="http://cld.ly/bbqby" alt="Browse plugins"  style="float: none" /></a></p>

We believe it's important as well to know who is behind the scenes. To see who is that guy or girl that spent the time to create that amazing piece of functionality that impressed your clients or boosted your website usability. As such, the MooTools Plugins repository comes with simple to tools support to allow you to stay in touch.

<p style="text-align:center"><img src="http://cld.ly/15qbz" alt="Browse plugins"  style="float: none"/></p>

<h3>The solution: for developers</h3>

We're very proud of how straightforward and efficient we've made it for developers to add plugins that:

<ul>
	<li>look great</li>
	<li>specify dependencies</li>
	<li>have descriptions with syntax highlighting</li>
	<li><strong>are easy to maintain</strong></li>
</ul>

We decided to integrate with <a href="http://github.com">GitHub</a>, the social coding website, to enable developers to focus on the code and nothing else. By following a few simple guidelines, you'll be able to deploy code to the source control repository (git), and then only click one button in our website: either the one to add it, or the one to update it.

In the following video, I'll show you how I create an account, upload my plugin, and then update it in 30 seconds.

<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,115,0' width='560' height='345'><param name='movie' value='http://screenr.com/Content/assets/screenr_1116090935.swf' /><param name='flashvars' value='i=32643' /><param name='allowFullScreen' value='true' /><embed src='http://screenr.com/Content/assets/screenr_1116090935.swf' flashvars='i=32643' allowFullScreen='true' width='560' height='345' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed></object>

<h3>Conclusion</h3>

We hope you like this new website feature as much as we do, and we look forward to your involvement and contributions.

As an user of the system, if you see something off or have a suggestion, please <a href="http://mooforge.uservoice.com/">drop us a note</a>.

As the developer and maintainer of the project, I want to give my special thanks to <a href="http://cpojer.net/">Chris</a> (for his help with Markdown parsing), <a href="http://nouincolor.com/">Oskar</a> (for his design help) and the <a href="http://www.symfony-project.org/">Symfony</a> project, for providing us with a great framework to build on, as well as the entire MooTools development team who helped find bugs and provided countless suggestions on how to make it better before we launched it.

But the plugin repository itself wouldn't be anything without *you* - the MooTools Community. As much as the plugins catalog is *for* you, it must by definition be *by* you, too. As excited as we are to have this finally online, it doesn't compare to our excitement to see what our awesome community comes up with every day.

On another note, the technology that empowers the Forge has been <a href="http://github.com/Guille/PluginsKit">opensourced</a>, for the use of any other open source project.

Happy hacking!