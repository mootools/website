---
title: "What's New in 1.2: Swiff"
date: "Tue, 12 Feb 2008 14:17:09 +0000"
author: "Michelle Steigerwalt"
tags: "all,features,news"
permalink: "2008/02/12/whats-new-in-12-swiff/"

---
Today we're going to talk about Swiff, which lets you combine Flash and JavaScript to do things MooTools can't do on its own.

<!--more-->

#### What's Swiff ?

Though an earlier version of Swiff has been packaged with Harald's [FancyUpload](http://digitarald.de/project/fancyupload/), it's officially new the MooTools 1.2 distribution.  Swiff allows for communication between Flash movie (.swf) files and the page's JavaScript, opening up possibilities not available with JavaScript alone.

#### The Best of Both Worlds

Unless you're a diehard fan of the embedded Quicktime movie, you might see the benefit in a Flash video player to provide smooth playback of videos to your users, while still yearning for full control over the action using JavaScript and MooTools.

It's not even necessary for the Swiff object to be visible in order to benefit from its use.  Using Swiff, you can utilize all of Flash's functionality, including its video, sound, file streaming, and clipboard accessing features, and lots more.

You get all the flashiness of Flash, while still being able to manipulate and display your content using the DOM and MooTools.

#### Talking to Flash

The first thing you'll want to do when creating a Swiff script is to create the Flash file.  In most cases, the "stage" of the Flash file will be empty, the only content being within the action box.  You'll have to write ActionScript that's able to interface with Swiff.

A basic ActionScript file might look something like this:

    //(ActionScript)
    import flash.external.*;
    
    function echoText(text) {
        ExternalInterface.call('alert', "This message is from Flash: "+text);   
    }
    
    //Fires the 'onLoad' event within the Swiff object.
    ExternalInterface.call(onLoad);
   
Once you finish writing the ActionScript, you'll have to publish your .fla file into a .swf file.  Now we're ready to load the SWF file with Swiff:
 
    //(JavaScript)
    var obj = new Swiff('mySwf.swf', {
        width:  1, 
        height: 1, 
        container: $('swiffContainer'),
        events: {
            onLoad: function() {
                alert("Flash is loaded!")
            }
        }
    });

In this example, when the SWF file is done being loaded, the window will alert "Flash is loaded!".

Notice that, although the Swiff object in this example doesn't need to be visible, its dimensions are set to 1x1 pixels.  If the object is not visible in the browser (ie, if the dimensions are 0x0), problems may occur.

#### Calling Flash Functions From JavaScript

The main reason to load a SWF file is to call the ActionScript functions within it.  To do this, we can use the `Swiff.remote` method, like so:

    Swiff.remote(obj, 'echoText', 'Hello Flash, meet Swiff.');

However, if we run this immediately after our call to `new Swiff`, this line will most likely fail, because we first have to wait until the SWF is loaded (just like how we have to wait to make sure the DOM is loaded when we want to access its elements).

Our onLoad event does for Flash what the DomReady event does for pages.  It lets us know when the SWF file is ready to be accessed by the JavaScript.

So, in order to call methods within the SWF file, we'll have to put the code that calls them inside our flashIsLoaded function, like so:

    //(JavaScript)
    var obj = new Swiff('mySwf.swf', {
        //[...]
        events: {
            onLoad: function() {
                Swiff.remote(obj, 'echoText', 'Hello Flash, meet Swiff.');
            }
        }
    });

#### Letting Flash Know To Expect Us

If you're following along at home and not set up with any sort of special Flash development tools, you might notice that your browser crashes when this code is executed (hopefully you're just reading and not following along).

This is because we forgot to tell Flash to **expect** our JavaScript to talk to it.  We can do this easily with a call to ExternalInterface:

    //(ActionScript)
    ExternalInterface.addCallback("echoText", this, echoText);

Now, we can try our call to Swiff.remote again and, instead of a crashed browser, we should be rewarded with a fancy new alert message.  It should say, "This message is from Flash: Hello Flash, meet JavaScript."

#### Passing Variables to the SWF File

What would happen if you decided to pass options or other variables to the ActionScript?  Manually going back into the Flash file, changing the call, and then republishing the SWF file seems horribly inefficient, and it wouldn't work if we want to change them dynamically.

Luckily, passing variables to the SWF is very easy.  All we have to do is add a 'vars' property to our new Swiff, containing an object that lists all of the variables we want to pass.

    //(JavaScript)
    var obj = new Swiff('mySwf.swf', {
        //[...]
        vars: {luckyColor: 'blue'}
    });

Let's add a getLuckyColor event to our ActionScript:

    //(ActionScript)
    function getLuckyColor() {
           return luckyColor;
    }
    ExternalInterface.addCallback("getLuckyColor", this, getLuckyColor);

Now, let's change our onLoad event to get it to tell us our lucky color:

    var obj = new Swiff('mySwf.swf', {
        //[...]
        events: {
            onLoad: function() {
                alert("Your lucky color is "+this.getLuckyColor());
            }
        }
    });

Notice that we used `this.getLuckyColor` instead of `Swiff.remote(obj, 'getLuckyColor')`?  We're using an alternate syntax to call Flash methods.

#### The Swiff.Remote Alternative

Swiff.Remote isn't the only way to access functions within the SWF file.  You can also call methods on the Swiff object directly, like so:

    obj.echoText("Hello, Flash.  We skipped a call to Swiff.remote!");
    
Both ways will work, so it's up to you to choose which one is best for your needs.  As in our use of `this.getLuckyColor()` within our `onLoad` event, the second syntax often makes a lot more sense.

In this way, we can think of our Swiff objects as wrappers around the functions inside our ActionScript, and can use them like we would use any normal MooTools Class.

#### Go Have Fun!

This article, of course, has only covered the basics, which means there's still a lot for you to learn.  The best way to master Swiff is to go get yourself the latest copy of the [1.2 beta](/download/tags/1-2b2) and have yourself a Swiff party.  

Good luck, and have fun reading the ActionScript documentation!