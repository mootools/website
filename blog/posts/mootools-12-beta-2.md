---
title: "MooTools 1.2 beta 2"
date: "Wed, 16 Jan 2008 19:48:08 +0000"
author: "Valerio Proietti"
tags: "all,news,releases"
permalink: "2008/01/16/mootools-12-beta-2/"

---
Its been almost 2 months since the first 1.2 beta. Bugs were fixed, features were improved, and here it comes: the second beta.

The first big feature we've been working on for 1.2 is Documentation. 

1.2 Documentation is in fact almost 5 times more detailed than it was in version 1. Every class option has now its description, every method has a complete list of arguments along with description, type, and now **every functionality comes with a code example** -- sometimes more than one. If you want to see it for yourself, here is the [temporary link for the 1.2 beta documentation](http://docs12b.mootools.net/).

A lot of the new 1.2 features have now been refined. An example that I'd like to share with you now is the Element Accessors feature. This is completely new for 1.2, aimed at making it easier working with elements and their attributes, properties or "special attributes". [Continue reading for 1.2 code examples](http://blog.mootools.net/2008/1/16/mootools-1-2-beta-2).

<!--more-->

Let's see a basic example of an accessor. I want to work with the href attribute of an element:

    $(element).set('href', 'http://mad4milk.net'); //setter
    $(element).get('href'); //getter
    
Pretty easy, and pretty basic too. Now, Let's do something slightly more complex: I want to set the default morph options for an element:

    $(element).set('morph', {duration: 100, transition: 'quart:out'});

After I set the morph "special attribute", every time I call the morph method on the element it will respect my defined options:

    $(element).morph({height: 200, width: 200});
    
In addition, the set method now accepts any Object containing any of the settable properties: lets have an example:

    $(element).set({
        href: 'http://mad4milk.net',
        text: 'mad4milk website',
        morph: {duration: 200, transition: 'quad:out'},
        events: {
            click: function(){
                document.location.href = this.href;
                return false;
            }
        }
    });
    
Pretty cool huh? We can now basically set **anything** without chaining. While choosing this style over chaining could be a matter of personal taste, this technique is preferable when using multiple Element methods on a collection of Elements: you will loop through them only once. It will definitely make the code run faster.

Take note that every default element attribute can be managed with the set and get accessors. Other than that you can work with the inner text, the inner html, events and styles, and default effects options.

Last at but not least, we have a complete and public API for those accessors: if you want, say, change a number of things of an element with a single "special attribute" you can define it, and this "special attribute" can then be used like the examples above. For more information about accessors, and more examples, you can go see [the new shiny documentation](http://docs12b.mootools.net/Element/Element#Element-Properties).


Other notable changes since 1.2 beta1 include a fully redesigned dimension system: its now much easier to get window or element dimensions, scrolling offsets, visible height or the full scroll height. Again, for more info, [documentation](http://docs12b.mootools.net/Element/Element.Dimensions).

If you're not familiar with the changes in 1.2 beta1, you can read more about it in the previous [article](http://blog.mootools.net/2007/11/14/mootools-1-2-beta-1).


I think this pretty much sums it up: have fun with the [1.2 beta 2 release](http://mootools.net/download/tags/1.2b2).

P.S. This is very likely to be the last beta for 1.2.
