---
title: "What's New in 1.2: Element Storage"
date: "Tue, 22 Jan 2008 17:13:04 +0000"
author: "Tom Occhino"
tags: "all,features,news"
permalink: "2008/01/22/whats-new-in-12-element-storage/"

---
Another new feature that's been built into the latest version of MooTools is the Element Storage.  This article describes the usage of this great new feature, as well as why it was developed, and how it can be used to keep your applications organized and efficient.

<!--more-->

##### What's all this storage business about?

When developing advanced JavaScript applications, it's sometimes beneficial to associate extra properties or attributes to DOM Elements.  While we have always been able to use DOM Elements as storage containers for all sorts of other data, this generic technique has a few drawbacks.  While the problems associated with this technique are almost exclusively Internet Explorer problems, they must be dealt with nonetheless.

Let's consider the following simple example:

    var element = $('myElement');
    element.effectInstance = new Fx.Tween(element, 'color');
    element.customProperty = 'someProperty';
    
    element.effectInstance; //the Fx.Tween instance
    element.customProperty; //'someProperty'

As we know, IE doesn't like when objects are stored as Element attributes in this way, and the effectInstance property will leak if it's not manually managed.  Another problem we've seen is that when accessing the innerHTML of any parent of our element, IE will return simple custom properties (like strings, numbers, etc) along with the expected properties.  This means that customProperty would be copied as well, which could pose a problem if it was some unique custom attribute.  Obviously of the two cases, memory management is our biggest concern here, but both are issues to consider.

##### What's a Moo to Do?

MooTools used to store custom events and attributes directly in custom properties of Elements called $events and $attributes.  MooTools would then manually detach these properties from Elements upon unloading of the page.

Let's take a look at our previous example again, this time storing custom items in $attributes:

    var element = $('myElement');
    element.$attributes.effectInstance = new Fx.Tween(element, 'color');
    element.$attributes.customProperty = 'someProperty';
    
    element.$attributes.effectInstance; //the Fx.Tween instance
    element.$attributes.customProperty; //'someProperty'

This example won't leak or produce the adverse effects of the first example, but man is it ugly!  Also, sometimes the browser would hang on unload, trying to clear all these things out.  This style of code didn't fit in with the rest of MooTools anyway, so we came up with a better solution.

When we access an element, we want to be able to store and retrieve custom properties for that element.  But why attach these properties directly to the Element?  If we used some form of external storage, we wouldn't need to worry about clearing values on page unload, things would be faster, and memory leaks would be a thing of the past.

##### A MooTools Worthy Solution

Element.Storage is brand new in MooTools 1.2.  It is basically an external Hash that stores all the custom properties and events for every element you interact with.

Let's take another look at our previous example, this time using the new Element.Storage API:

    var element = $('myElement');
    element.store('effectInstance', new Fx.Tween(element, 'color'));
    element.store('customProperty', 'someProperty');
    
    element.retrieve('effectInstance'); //the Fx.Tween instance
    element.retrieve('customProperty'); //'someProperty'

Note that events and actions are no longer attached directly to the Elements.  Everything is stored in the external Hash, and managed by MooTools, so as a developer, you have nothing to worry about.  Finally, an elegant and coherent API for attaching custom properties, functions, and objects to Elements.

##### How it Works (and What We're Using it For)

For those who are interested, I encourage you to take a look at the source.  Basically, every element you interact with or traverse over when working with MooTools receives a unique ID.  This id which is actually attached to the element then serves as it's key in the Element.Storage Hash.

We want MooTools to be fast as possible, so we do a whole lot of [memoization](http://en.wikipedia.org/wiki/Memoization).  Basically, don't create something until it's needed the first time, but then cache it for immediate later use.  Many of you who have already tested out the MooTools 1.2 betas have hopefully been having fun with the new Element shortcuts.  All of these shortcuts use the new Storage API to make things as smooth and efficient as possible.

##### Advanced Examples

Element:retrieve actually accepts an optional second parameter which will act as the default value to store if another value doesn't previously exist.  It will then retrieve the value as expected.

    $('myElement').retrieve('defaultValue', 'Some Default Value'); //stores and returns 'Some Default Value' if the key doesn't previously exist

Also, many users have asked about namespacing the Element Storage.  We have responded by telling them that it's already allows this since you can store Objects and Hashes. Consider the following example.

    var element = $('myElement');
    var data = element.retrieve('galleryData', {});
    data.id = 16;
    data.source = '/images/16.jpg';
    data.title = 'Some Title';
    
    //later
    $('myElement').retrieve('galleryData'); //{ id: 16, source: '/images/16.jpg', title: 'Some Title' }
    $('myElement').retrieve('galleryData').id; //16

The possibilities are endless.  We'd love to know how everyone likes this new feature, as well as how you use it in your applications.  In my next article ill talk a bit more about how MooTools uses the Element Storage internally for all the awesome new Element shortcuts like Element:highlight!

--ciao for now!