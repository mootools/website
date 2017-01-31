---
title: "MooTools Depender - A Build Tool for MooTools JavaScript Libraries"
date: "Mon, 09 Nov 2009 19:10:13 +0000"
author: "Aaron Newton"
tags: "releases"
permalink: "2009/11/09/mootools-depender-a-build-tool-for-mootools-javascript-libraries/"

---
As [mentioned in the new features in MooTools More in 1.2.4.1](/blog/2009/10/19/mootools-1-2-4/), there's a new plugin called [Depender](/docs/more/Core/Depender) which uses MooTools dependency mappings to allow you to lazy load additional scripts on the fly based on what you need. Rather than list every single file you depend on, you just list the _features_ you want to use and it computes all the specific files needed and each of the files that they need (and so on), excludes the files you already have, and then injects the remaining scripts into the document, providing a callback.

Unfortunately this method is rather slow. The JavaScript plugin must inject each individual script in the dependency list and all these requests can only go as fast as your browser can make them. As a companion to this plugin, we have also authored a stand alone server side application.

### New Server-Side Depender

The new server-side depender companion app ships in two forms: a PHP version and a Django version. They each have their own positives and negatives. The PHP version ships with a web-based interface — a builder you can use to check off the things you want in your download (similar to what you see on MooTools.net). On the other hand, the Django version is faster. The Django app caches everything to memory but the PHP version caches results to disk.

Depending on your needs, you can also use these server-side applications to lazy load chunks of functionality on the fly. This obviously requires your application to talk directly to the server when it needs more code. These apps aren't designed for enterprise scale.

The server side applications are [available on github](http://github.com/anutron/mootools-depender/). We still consider the state of this project to be *beta*, but we want to get the tools into your hands now. If you have any feedback or find any bugs, we want to hear about it. Check out [the documentation](http://github.com/anutron/mootools-depender#readme) to see how it all works, including the Depender Client([docs](http://github.com/anutron/mootools-depender/blob/master/client/Docs/Depender.Client.md#readme)), which gives you this nifty interface:

        Depender.require({
                scripts: ['DatePicker', 'Logger'], //array or single string for one item
                callback: function() {
                        //your code that needs DatePicker and Logger
                }
        });
        //later, you need to load more dependencies...
        Depender.require({
                scripts: 'Fx.Reveal', //array or single string for one item
                callback: function(){
                        //if, for some reason, Fx.Reveal is available already,
                        //then this function will execute immediately, otherwise it will
                        //wait for the requirements to load
                        $('someElement').reveal();
                }
        });

Libraries that you download with Depender will all have a standard header that looks something like this:

        //MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools. Copyright (c) 2006-2009 Valerio Proietti, <https://github.com/kamicane>, MIT Style License.
        //MooTools More, </more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <https://github.com/kamicane> & the MooTools team </developers>, MIT Style License.
        //Contents: Core, Browser, Array, Function, Number, String, Hash, Event, Class, Class.Extras, Element, Element.Event, Element.Style, Element.Dimensions, Selectors, DomReady, JSON, Cookie, Swiff, Fx, Fx.CSS, Fx.Tween, Fx.Morph, Fx.Transitions, Request, Request.HTML, Request.JSON, More, Element.Shortcuts, Element.Measure, Fx.Reveal
        //This lib: http://clientcide.com/js/build.php?requireLibs=mootools-core&require=Fx.Reveal&compression=none

This header includes, among other things, a manifest of the contents of the file and a url that can be used to retrieve it again. This is especially useful if you want to come and download the file again for the latest version.

The builder on MooTools.net does not use Depender yet but we will deploy it there soon. You can see it live on the [Clientcide builder](http://clientcide.com/js).
