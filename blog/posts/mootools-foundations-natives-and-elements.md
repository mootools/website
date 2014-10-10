---
title: "MooTools Foundations: Natives and Elements"
date: "Wed, 31 Oct 2007 07:00:20 +0000"
author: "Tom Occhino"
tags: "all,features,tips"
permalink: "2007/10/31/mootools-foundations-natives-and-elements/"

---
We haven't had this blog for very long, and talking to many users recently, I became aware of the fact that many people just don't understand how powerful MooTools actually is.  The purpose of this series of articles is to shed a little light on some of the functionality provided by MooTools that many users might be missing.  I think maybe it's time we got everyone caught up to speed.  First topic... Natives and Elements!

<!--more-->

### A quick note about this article

So I know I said my next article would be about the new Element shortcuts added in 1.2, but there are so many other things we should probably talk about first!  All the code examples featured in this article are intended for MooTools 1.2.  Although almost all of it either works with 1.x or has a 1.x equivalent, the purpose of this article is not to teach MooTools syntax, but rather to help users understand the concepts that drive the development of MooTools.

#### A MooTools Native, not just a person born in the country of MooTools...

First thing I'd like to talk about is the Native in MooTools.  JavaScript provides us with many native Classes like Arrays, Functions, Numbers, Strings, etc.  While they are all very powerful, we'd obviously like to make them much more flexible.  We can call functions on our Arrays and Strings like:

    [1,2,3].join('-');
    //'1-2-3'
    'this is my string'.split(' ');
    //['this', 'is', 'my', 'string']

But there's absolutely no way native JavaScript could possibly provide us with all the functionality we want, right?  Well not exactly.  JavaScript lets us extend these native types by adding functions to their prototypes.  Many of our JavaScript veterans are all too familiar with this topic.  Here is an example:

    //the following line will throw an error because there is no alert method for Strings
    'this is my string'.alert();
    //but by adding this small bit of code
    String.prototype.alert = function(){ alert(this); };
    //now the following line will work as intended
    'this is my string'.alert();

MooTools has something called a Native which makes this process a bit more straightforward.  When we make a new Native out of a JavaScript type, it gets all sorts of magical new properties.  For example, with MooTools, here's how we can add methods to Strings:

    String.implement('alert', function(){ alert(this); });
 
Right, it's the same amount of code, that's not impressive.  But what about when I want to add more than one function?

    String.implement({
        'method1': function(){ ... },
        'method2': function(){ ... },
        'method3': function(){ ... },
        'method4': function(){ ... },
        ...
    });

Now all my strings will have all these functions right in their prototypes.

#### Is this available in a generic version?

Another big thing about implementing new methods into your Natives is that full generics support is automatically added.  While this may not make much sense for a function like String:alert, it is extremely useful for things like using Array generics on HTMLCollections or Hash generics on Objects.

    Hash.each({'one': 'item 1', 'two': 'item 2', 'three': 'item 3'}, function(){ ... });
    Array.filter(document.getElementsByTagName('div'), function(){ ... });
    Element.addClass(document.getElementById('myElement'), 'className');
    Array.each(arguments, function(){ ... });

Generics are even provided for native functions...

    Array.join([1,2,3], '-');
    //'1-2-3'
    String.split('this is my string', ' ');
    //['this', 'is', 'my', 'string']

Declaring a new Native also lets us do the following (among other) things....

    String.type('mystring'); //true
    String.type([1,2,3]); //false
    $type('myString'); //'string'
    $type([1,2,3]); //'array'
    $type(function(){}); //'function'

Since Functions, Strings, Arrays, and the rest of the Natives all know their type, we don't need to do any kind of convoluted test to determine it.  The $type function can immediately access and return the type of any Native instance.  This makes things clean and fast throughout the framework.

#### Awesome, now I know what a Native is... so what?

Well now we know how to extend the native JavaScript types... we're done, right?  Mmm, not even close.  Why don't we define some of our own Native types!?  Awesome idea, let's do it.  Let's add the following to the list of Native types [String, Function, Number, Array] at our disposal, all created by MooTools:

* Hash - Object implementation which allows us to extend JavaScript Objects.
* Event - Event wrapper which allows us to fix cross-browser quirks and enhance the information provided by native Events.
* Element - A Wrapper which allows us to do what was once thought to be impossible, extend the functionality of native HTMLElements.
* Elements - A powerful collection of MooTools extended Elements which combines all the functionality of an Array with all the functionality of an Element.
* TextNode - A simple native used when injecting text into Elements.
* IFrame - An awesome Element wrapper (the first of its kind) that allows you to use all the functionality of your parent document inside children documents (iframes).
* Color - A useful native which allows you to mix, match, and modify colors.
* Date - Extends the native Date type so you can add functionality and test for type on variables.

I already talked a bit about the newest Native, [the Hash](http://blog.mootools.net/2007/10/8/what-s-new-in-1-2-the-hash) in a previous article.  In a future article we will talk about the awesomazing IFrame (it really is so cool), but for now, there are quite a few things I'd like to tell you about Element(s).

#### Wait, you mean Elements are more than just little boxes on the periodic table?

Alright, by now hopefully you know what an Element is.  Whenever you use the $ function in MooTools to select an element by id, or extend an existing element, it becomes a MooTools Element.  This means you can do all sorts of stuff with it, no matter what browser you're in.  Here's a few simple examples...

    var element = $('myElement'); //select the element with id 'myElement'
    //add the className 'active' to myElement
    element.addClass('active');
    //get myElement's title
    element.getProperty('title');
    //get myElement's color, width, and height properties
    element.getStyles('color', 'width', 'height');
    //set the border style of myElement
    element.setStyle('border', '1px solid #f00');
    //add a click event to myElement
    element.addEvent('click', myClickFunction);
    //...and do all this stuff
    element.getNext('div').addClass('active').getParent().adopt(new Element('input', {type:'text'}));

Elements actually have so much functionality, there's no way I could show you it all (as this article is already getting pretty long).  Now on to the part that many of you may not know about.  The Elements Class in MooTools is a special type of Array that contains MooTools Elements.  An Element gets returned from any call to $, and Elements get returned from any call to $$.  Don't let the 's' at the end confuse you, here is a breakdown.

* $: takes an id or an element, returns Element - a single MooTools Element.
* $$: takes one or many CSS Selectors or elements, returns Elements - many MooTools Elements in an Array.

Here's the amazing part... Anything you can do to an Element, you can do to a collection of Elements.  If you call an Element method on Elements that returns something, (for instance, an an accessor like getStyle or getCoordinates), you will receive back an Array.  This resulting Array will be the same as if you manually iterated through all the Elements by hand, calling the function on each one, and pushing the result to an Array... it's just a lot less code. :P

    //add the className 'active' to myElement
    $('myElement').addClass('active');
    //add the className 'active' to all the li's inside a ul that are children of a div
    $$('div > ul li').addClass('active');
    //add the className 'odd' to every other row in a table of data
    $$('table tr:odd').addClass('odd');

    //make myElement red
    $('myElement').setStyle('color', '#f00');
    //make all the divs with className 'info' red
    $$('div.info').setStyle('color', '#f00');

    //get the color of myElement
    $('myElement').getStyle('color'); //returns '#f00'
    //get the colors of all the divs with the className 'account'
    $$('div.account').getStyle('color'); //returns ['#ff0000', '#00ff00', '#0000ff'], etc.

These are just very simple examples to demonstrate this concept, but the implementation is flexible and powerful.  Similar functionality is provided by other frameworks, but in slightly different ways.  In Prototype there is the Enumerable function invoke which will execute a function on every element in an Array.  This is convenient, but a bit more code, and a bit less straightforward.  In jQuery you always act on collections.  While this is convenient most of the time, it may not be the most efficient way to manipulate single elements.  With MooTools, whether you are dealing with a single Element or a collection of Elements, all the Element methods work.  Methods are easy to use, easy to expand, consistent, and less ambiguous.

As the first article in this series, I hope this sheds a little light on some of the Core building blocks of MooTools.  More articles will follow in this series describing other components of the Framework in better detail.

--ciao for now!