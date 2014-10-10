---
title: "A Better Way to use Elements"
date: "Fri, 19 Mar 2010 22:41:41 +0000"
author: "Sean McArthur"
tags: "all"
permalink: "2010/03/19/a-better-way-to-use-elements/"

---
Javascript development in the browser is all about the Elements. Manipulating the DOM happens every few lines of code. It’s important enough that some libraries provide little more than DOM enhancements. Not to worry though, MooTools provides greatly in this area as well.

### $ and $$

Most of you probably know the two document methods `getElementById` and  `querySelectorAll`; because if you do, you understand how we select elements with MooTools methods. For those of you that don’t, you provide an ID string of an element in to `getElementById`, and a CSS selector string to `querySelectorAll`.  The functions `$` (which is an alias to  `document.id`, see this post on [Dollar Safe Mode](http://mootools.net/blog/2009/06/22/the-dollar-safe-mode/) for details) and `$$` are basically equivalent to `getElementById` and `querySelectorAll`, respectively. Of course, since it’s MooTools,  *they’re more than that*. 

The dollar function, if given a string, will basically call `getElementById` on the document. If passed an element, it will just return the element, and  if you pass an object with a toElement method, it will try to convert it to an  element (we’ll explore that more a couple sections down). A key difference you’ll find between MooTools’ dollar function and jQuery’s is this: MooTools’ `$()`  will only ever return 1 Element, and it will return `null` if no matching element is found.  This means unless you’re absolutely 110% certain the element will exist,  **you’ll need to check the returned value before starting to call Element methods on it**.

        var loginEl = $('Login');
        if (loginEl) {
                loginEl.fade('in');
        }  

The MooTools Team prefers two separate methods for the selecting elements; to  remove any doubt about what a certain function call may be returning, we have one method for individual elements and another for multiple elements. In this case, *it’s preferable to be explicit, instead of relying to ambiguous auto-magic*. When we see `$`, we expect an element if it exists. When we see  `$$`, we expect an array of elements (which, as you know, an array can always be  empty). The double dollar function has some neat tricks that are explained in  its own section below.

All this talk about Elements, but only about how to select them. MooTools  also provides an excellent Element construction API.

### new Element()

With vanilla JS (mmm, vanilla…), you’d use `document.createElement` whenever you wanted to create and add a new element to the DOM. MooTools tries to make the JavaScript API more pleasant to use; part of that is a more consistent and easy to use syntax and part of it is using more Object-Oriented programming practices. It feels a lot more OO when creating objects using  the `new` keyword, whereas the standard way is more procedural. 

It turns out that every element you could create inherits from the `Element` prototype. Specifically, the elements you create through `document.createElement` would be `HTMLDivElement`, or `HTMLParagraphElement`, or whichever element you create. Like I said, they all inherit from the base Element prototype, and then HTMLElement, and so on. MooTools extends the base Element class, so that all elements receive some MooTools love.

MooTools augments the Element [native](http://keetology.com/blog/2009/07/20/up-the-herd-ii-native-flora-and-fauna), providing a super-duper sweet constructor. You can provide the tag name, and then an  object of properties to set on the new element. The returned object is of the  same type as the $ method mentioned above. The properties you can set are fairly  extensive, so [check out the documentation](http://mootools.net/docs/core/Element/Element#Element:constructor)  to learn more about them, but here’s a demonstration.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/9rxKg/embedded/"></iframe>

### toElement

The dollar method provides another function: converting the instance of class into an element(-al?) form. This is similar to a `toString` function, which  converts objects into strings when needed. You can define a method  in a class called `toElement`, and return an element to “represent” the instance. Let’s take a look at a snippet from a Person Class:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/uUxDm/embedded/"></iframe>

Several extensions in MooTools More take advantage of this, like  Form.Request, Form.Validator, HtmlTable, and others. And many plugins in the Forge use this approach as well. This means that after creating an instance of  one of these classes, you can just hold on to the instance in your code.  Whenever you want to affect the element that the instance is controlling, you  just use `$(instance)` to retrieve it.

Aaron even cooked up a ToElement mixin, and [wrote a bit more about this over here](http://www.clientcide.com/best-practices/5-advanced-techniques-for-mootools-development/).

### Elements
I pointed out earlier that `$$` returns an array-like object containing Elements. It actually returns an object called exactly that: `Elements`. Behind  the scenes, MooTools gets an array of all the elements that meet the selector (so it's still an array), and then extends the array with all the Elements  methods. Why would we want that?

All the methods that MooTools adds to the Element native are added to the Elements class as well. You can do some pretty nifty chaining because of this. First of all, you don’t have to check that it didn’t return `null`. This is because any method you call on Elements, will loop through the array and try to call the method on each individual element. Even with an empty array, the loop won’t cause an error. And any method you call that would normally return a value,  will return an array of the values from each element. An example should make this clearer:

        //assigns a click event to all A tags
        $$('a').addEvent('click',  function(e) {
                e.preventDefault();
                alert(this.href);
        });  
        
        //gets all divs with an id set, and then returns
        //an array of the IDs  sorted alphabetically
        var ids = $$('div[id]').get('id').sort();  
        
        //gets all divs with a UL immediately inside
        //and assigns a class name to  the divs
        $$('div &gt; ul').getParent().addClass('has-list');

While you could put together long chains acting on all the elements you’ve selected, I’d advise against this. It certainly looks cool, and will work fine one or 2 methods out on the chain. **But every method call will cause another loop  through all the elements**. If you’re doing a lot of things to every element, you might as well do it all in a single pass. I’ll show you what I mean.

        //this would loop through each time at addEvent, addClass, and fade
        $$('li  a').addEvent('click', function(e) {}).addClass('alertable').fade('in');  
        
        //whereas this will only cause 1 loop
        $$('li a').each(function(link)  {
                link.addEvent('click', function(e) {
                         alert(this.title);
                });
                link.addClass('alertable');
                link.fade('in');
        }); 

Still, when doing something simple, you can skip the each call, since Elements will handle that for you.

### Concluding

MooTools provides a lot of expressive power when working with the DOM. It's consistent API makes it a snap to add events, change styles, create elements and more. The object oriented nature of its implementation makes it so that you can extend Elements for your own purposes. Look forward to my next post where I'll talk about extending Elements in various ways and cover best practices for when you decide to bend Elements to your own will.

*Sean McArthur is a software developer at Blazonco.com who is madly in love with MooTools. Most of his contributions involve sharing tips and information about MooTools (and programming in general) at his [blog](http://mcarthurgfx.com) and on [Twitter](http://twitter.com/seanmonstar).*