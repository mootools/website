---
title: "What's New in 1.2: The Best Fx, Now Even Better"
date: "Tue, 23 Oct 2007 18:32:01 +0000"
author: "Tom Occhino"
tags: "all,features,news"
permalink: "2007/10/23/whats-new-in-12-the-best-fx-now-even-better/"

---
MooTools has always been known for having some of the most fluid and impressive effects around.  In 1.2 we’ve introduced some exciting new enhancements that make them even more efficient, powerful, flexible, and easy to use.  Here are the changes made to the Fx Classes to take note of...

<!--more-->

#### What's in a name?

One of the most obvious changes to the MooTools Fx Library is a change in the naming of Fx.Style and Fx.Styles.  Though you can still use these class names in 1.2, they will be deprecated in future versions, so please start using the classes through their new names, Fx.Tween and Fx.Morph respectively.  The reason for the name change is two-fold.  First, we feel these names more explicitly describe the functionality of the classes, and second, the classes correspond to some awesome new Element shortcuts, which I will talk much more about in my next article!  (Expect a nice demo of all the things talked about in this article to come along with the article about Element enhancements)

If I told you Fx.Morph was just a new name for the same old Fx.Styles, I'd be lying through my teeth.  Thanks to some flexible CSS parsing code, you can now transition not only to an object full of rules, but also to any CSS rule defined in your stylesheets.  Ever wanted to make an element look like another one, or add the styles of an error class to an element smoothly?  Well now you can do it in style!  Personally, I'm really excited about the flexibility of the new Fx.Morph class, and I've started using it regularly already.  Here are some of the cool things that can be done...

    var myMorph = new Fx.Morph('myElement', { 'duration': 1000 });
    //transition myElement to have a text color of red, a width of 200px, and a line-height of 20px
    myMorph.start({ 'color': '#c03', 'width': 200, 'line-height': 20 });
    //transition myElement to the properties defined in the .warning rule in my stylesheet
    myMorph.start('.warning');
    //transition myElement to look the same as a paragraph that has the information class inside the element whose id is content
    myMorph.start('#content p.information');

#### What do you mean, 'any property'?!

The Fx.Tween and Fx.Morph classes (along with all Element style methods) allow you to transition literally any style property of an element.  We don't need special classes for colors, dimensions, borders, and clipping, no sir! If you can style it with CSS, you can transition it with the new MooTools Fx!  If the transition is something that isn't calculable like a background image or border-style, the property will be set immediately at the start of the transition.

    //transition the background position of my element to 400px 20px
    myMorph.start({ 'background-position': '400px 20px' });
    //the following is another way to achieve the same effect
    myMorph.start({ 'background-position': '400 20' });
    //here, we transition the CSS clip for this element from the start to the end value
    myMorph.start({ 'clip': ['0px 500px 500px 0px', [130, 410, 220, 130]] });
    //transition the border-width's of this element
    myMorph.start({ 'border-width': '4px 10px 16px' });
    //morph many different properties of this element at once... oh, the possibilities!
    myMorph.start({ 'border': '5px solid #f03', 'border-bottom-color': '#ccc', 'background-color': '#fee', 'color': '#f03', 'width': 200, 'height': '300px', margin:[10, 20], 'opacity': 0.6 });

A few notes about the above examples:
 * The syntax is very lenient.  You don't need to provide units, you can use hex colors, or rgb / rgba colors, and properties that take multiple values, like clip for instance, accept a space separated string, or an array of values.
 * The starting parameter is optional in most cases.  If two parameters are passed in an array to any property, the first will be the start value and the second the end value.  Otherwise, the transition will start from the element's current state.
 * If you dont want to use objects everywhere to define your transitions, simply save the properties to your CSS, and create a morph as complicated as you want just by calling start with that CSS rule's selector!
 * Lastly, as was mentioned above, any property that cannot be calculated will be set immediately upon start of a transition.

How cool is this stuff?!  Please, experiment as much as you can and show us all the cool stuff you do.

#### The new awesomazing link option!

The next enhancement to Fx has to do with the 'wait' option.  What happens if I call start on an effect while the effect is running?  Just recently Valerio and I were talking about one of the reasons MooTools was first created.  He had the idea that by reusing a single Fx instance whenever he wanted to perform a transition on an element, he could keep track of the current state of the effect.  This would allow him to prevent the annoying flickering that plagued many other JavaScript Fx libraries.  Using the wait option in MooTools 1.x, you could tell the effect to either ignore concurrent calls to start (wait: true, by default) or stop wherever it was, and start the next effect. (wait: false, very common for things like mouseover / mouseout transitions).

Well, in 1.2 wait is no more, because we found a slightly more powerful solution.  We now have the 'link' option, which describes how two concurring effects should be linked together, if at all.  There are three possible values for link, namely: 'ignore', 'cancel', and 'chain'.  Here is how each behaves.
 * link: 'ignore' - This configuration is synonymous with 'wait: true' from 1.x, and is the default behavior. Any calls made to start while the effect is running will be ignored.
 * link: 'cancel' - This configuration is synonymous with 'wait: false' from 1.x. Any calls made to start while the effect is running will take precedence over the currently running transition.  The new transition will start immediately, canceling the one that is currently running.
 * link: 'chain' - This configuration is new for MooTools 1.2.  Any calls made to start while the effect is running will be chained up, and will take place as soon as the current effect has finished, one after another.

Here are some examples of the link option in action...

    var myTween = new Fx.Tween('myElement', 'background-color', { 'link': 'chain' });
    //fade myElement to red, then to white, then to blue
    myTween.start('#c03').start('#fff').start('#369');
    
    var myMorph = new Fx.Morph('myElement', { 'link': 'cancel' });
    //transition myElement to red 16px sized text
    myMorph.start({ 'color': '#c03', 'font-size': 16 });
    //a few ms later... stop right there! make that blue 10px text with a height of 100px
    myMorph.start({ 'color': '#369', 'font-size': 10,  'height': 100  });

#### Core changes and enhancements

There are a few other minor changes to take note of.  First, two new public methods were added to the API as per request, namely Fx:pause, and Fx:resume.  They work exactly as you'd expect.  Another minor change is that duration now also accepts one of the strings 'short', 'long', and 'normal', which is the default.

    var myTween = new Fx.Tween('myElement', 'background-color', { 'duration': 'long' });
    //transition myElement's background color from white to a nice blue
    myTween.start('#fff', '#369');
    //a few ms later... hang on a sec in your whitish-bluish state, I have something to take care of!
    myTween.pause();
    //some time later... alright, I'm ready to finish up.
    myTween.resume();

Most of the other changes won't affect users too much, but there was quite a bit of restructuring done to the Fx framework.  The core is now more consistent, organized, and robust.  Plugin developers should be aware of the new structure for creating Fx extensions.

That pretty much sums up all the new stuff in Fx.  All the rest of the goodness you've come to know and love about MooTools Fx is still there, cleaner and more efficient than ever!  We encourage everyone to dive into the source and discover just how much you can do with the most compact, smooth, and robust Fx Framework on the Internet.  Let us know what you think. ;)