---
title: "JxLib: An Introduction"
date: "Mon, 26 Dec 2011 20:02:37 +0000"
author: "Aaron Newton"
tags: "features"
permalink: "2011/12/26/jxlib-an-introduction/"

---
<i>Jon Bomgardner is a contributor to the [jxlib.org](http://jxlib.org) project. After recently joining the MooTools Developer mailing list and sharing his experience in upgrading jxlib to MooTools 1.4.2 we asked him to share his work here on the blog.</i>

###What is JxLib
JxLib is a JavaScript UI framework built on MooTools. It allows web developers and designers to quickly build user interfaces for their applications. JxLib is based on some sweet HMTL markup and strives to be fully CSS compliant.  It is also a modular library allowing you to pick and choose from the available components as well as giving you the ability to override default behaviors and extend core classes.

<!--more-->

All of this flexibility is, in large part, due to being built on MooTools. The library is heavily object-oriented with a huge number of classes inheriting from a single base. If you know how to use the MooTools class system you will quickly get up to speed on JxLib.  In addition to being based on HTML and CSS, which provides an amazing amount of flexibility itself, the library's architecture is based on a plugin system that allows additional functionality to be added to each component at the developer's discretion.

###A couple of quick examples

So, I wanted to show a couple of easy examples of what you can do with JxLib. There's a ton of functionality built in and for more complete examples you can check out the examples page at [jxlib.org](http://jxlib.org). Here are 3 quick jsfiddles that you can play around with to get a feel of some of the functionality.

####Example 1: Drop Down Menu Toolbar

This example shows a simple menu toolbar with cascading menus

<iframe style="width: 100%; height: 200px; border: 1px solid #666;" src="http://jsfiddle.net/jonlb/N32xm/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


####Example 2 : Jx.Form and Form fields

This example shows off Jx.Form and a lot of the bundled fields you get out of the box.

<iframe style="width: 100%; height: 400px; border: 1px solid #666;" src="http://jsfiddle.net/jonlb/7SG7Q/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

####Example 3: The New Jx.Container and Jx.LayoutManager classes

This one shows off some of the new work in JxLib 3.1.1. It creates the entire layout using a single javascript object. Check out the center panel's tabs for a look at Jx.Editor and other components.

<iframe style="width: 100%; height: 600px; border: 1px solid #666;" src="http://jsfiddle.net/jonlb/dfmV7/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

###Experiences achieving compatibility with Core 1.4.2

I am happy to report that the conversion to Core 1.4.2 went relatively easily. The biggest conversion headache was when I originally worked on getting compatibility with 1.3.2 - that was a ton of work. We used many of the $ global methods ($defined, $H, $A were some of the big ones) and they were littered about the code base quite liberally. I really didn't want to use the compatibility layer that the folks here at MooTools so graciously provided everyone because the download was big enough as it was. Hunting down all of those changes took the most time. In the process of doing so however I learned a few interesting tidbits:

First, it was best to replace $defined() with a check for undefined *and* null. for example:

    if ($defined(some_variable)) {

became

    if (some_variable !== undefined && some_variable !== null) {

I realize that the conversion docs state that checking undefined should be enough but when I tried that at first I got a LOT of weird errors. This change fixed them.

The other thing I discovered is that Object.each and Object.keys weren't all that useful when the object you're using them with was actually on the prototype of the class they were in. For example, in JxLib 2.0 we had this code:

    processElements: function(template, classes) { 
        var keys = classes.getValues(); 
        elements = this.processTemplate(template, keys); 
        classes.each(function(value, key) { 
            if (key != 'elements' && elements.get(value)) { 
                this[key] = elements.get(value); 
            } 
        }, this); 
        return elements; 
    }

It seems that those two functions use hasOwnProperty() which was causing the loop above to have 0 iterations because the classes variable was actually this.classes which was found on the prototype of the class. When converting to Core 1.3.2 (and subsequently 1.4.2) we had to use this:

    processElements: function(template, classes) { 
        var keys = [], 
            values = []; 
        for (var key in classes){ 
            if (key !== undefined) { 
                values.push(classes[key]); 
                keys.push(key); 
            } 
        } 
        elements = this.processTemplate(template, values); 
        keys.each(function(key){ 
            if (key != 'elements' && elements[classes[key]] !== undefined && elements[classes[key]] !== null) { 
                this[key] =  elements[classes[key]]; 
            } 
        },this); 
        return elements; 
    }

Once those were figured out, and we had full compatibility with 1.3.2, moving up to 1.4.x was pretty painless. For more info on what I learned during the conversion (some of it not MooTools or even javascript related) check out my [blog post](http://blog.solagratiadesigns.com/lessons-learned-converting-jxlib-to-mootools-1-3-2/).

###Get More information

You can get more information on JxLib at the following places:

* [JxLib website](http://jxlib.org)
* [JxLib github repository](https://github.com/JxLib/JxLib)
* [JxLib Google Group](https://groups.google.com/forum/#!forum/jxlib)
* [JxLib on Lighthouse](http://jxlib.lighthouseapp.com/dashboard)
* [Blog post on getting started with JxLib](http://blog.solagratiadesigns.com/jxlib-a-brief-introduction-to-3-1-1/)

If you have any questions or comments feel free to leave those below or in the Google group (linked above). Also, if you like what you've seen and read here please consider pitching in and helping to make JxLib even better. We have many plans for future releases but could always use a few extra hands.
