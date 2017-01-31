---
title: "MooTools Behavior"
date: "Wed, 21 Dec 2011 00:51:54 +0000"
author: "Aaron Newton"
tags: "all"
permalink: "2011/12/20/mootools-behavior/"

---
Those of you who follow my work over on [Clientcide](http://clientcide.com) may already be familiar with it, but for the rest of you I wanted to write a blog posts here on MooTools.net about the work I've been doing on a library called Behavior - a throwback to the [behavior.js library](http://www.ccs.neu.edu/home/dherman/javascript/behavior/) released way back in 2005 which one might consider to be philosophically an ancestor of sorts.

### Purpose

All well-written web sites / apps that are interactive have the same basic pattern:

<!--more-->

![Web app layers](https://github.com/anutron/behavior/raw/master/layers.png)

Each page of a site or app you build is esoteric. It may have any combination of interactive elements, some of which interact with each other (for example, a form validation controller might interact with an ajax controller to prevent it sending a form that isn't valid). Typically this "glue" code exists in a DOMReady statement. It says, get *this* form and instantiate *that* class with *these* options. This code is brittle; if you change either the DOM or the code the state breaks easily. It's not reusable, it only works for a specific page state. It can easily get out of hand.

Behavior attempts to abstract that DOMReady code into something you only write once and use often. It's fast and easily customized and extended. Instead of having a DOMReady block that, say, finds all the images on a page and turns them into a gallery, and another block that searches the page for all the links on the page and turns them into tool tips, Behavior does a *single* search for all the elements you've marked. Each element is passed through the filter it names, where a filter is a function (and perhaps some configuration) that you've named. Each of these functions takes that element, reads properties defined on it in a prescribed manner and invokes the appropriate UI component.

### Why?

The nutshell is that instead of having a DOMReady function that finds the stuff in your DOM and sets up instances of classes and whatnot, you put the configuration in the HTML itself and write the code that calls `new Foo(...)` only once. Example:

<iframe style="width: 100%; height: 300px; border: 1px solid #000;" src="http://jsfiddle.net/htY37/1/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

So instead of this:

	$$('form').each(function(form){
	  new FormValidator(form, someOptions);
	  new Form.Request(form, someOptions);
	});
	new Tips($$('.tip'));
	$$('.accordion').each(function(container){
	  new Accordion(container.getElements('.toggler'), container.getElements('.section'), someOptions);
	});
	//etc

You do this:

	<form data-behavior="FormValidator FormRequest" data-formvalidator-options="{someOptions}">...</form>
	<a data-behavior="Tip" title="I'm a tip!">blah</a>
	<div data-behavior="Accordion" data-accordion-options="{someOptions}">...</div>

Think of it as delegation (as in [event delegation](/blog/2011/03/28/events-with-mootools-element-class-delegation-and-pseudos/)) for class invocation. If you use DOMReady to do your setup and you want to swap out some HTML with AJAX, you need to reapply that startup selectively to only your components that you're updating, which is often painful. Not with Behavior, you just apply the filters to the response and call it a day.

You do a lot less DOM selection; you only ever run `$$('[data-behavior]')` once (though some filters may run more selectors on themselves - like Accordion finding its togglers and sections).

DOMReady setup is always closely bound to the DOM anyway, but it's also separated from it. If you change the DOM, you might break the JS that sets it up and you always have to keep it in sync. You almost can't do that here because the DOM and its configuration is closely bound and in the same place.

Developers who maybe aren't interested in writing components don't need to wade into the JS to use it. This is a big deal if you're working with a team you must support.

Behavior is designed for apps that are constantly updating the UI with new data from the server. It's *not* an MVC replacement though. It's designed for web development that uses HTML fragments not JSON APIs (though it can play nicely with them). If you destroy a node that has a widget initialized it's easy to make sure that widget cleans itself up. The library also allows you to create enforcement to prevent misconfiguration and an API that makes it easy to read the values of the configuration. (More on that in a bit).

There are some other nifty things you get out of it; you get essentially free specs tests and benchmarks because the code to create both of them is in the Behavior filter. Here's an example of what it takes to write a spec for a widget and ALSO the benchmark for it's instantiation (this uses [Behavior.SpecsHelpers.js](https://github.com/anutron/behavior/blob/master/Tests/Specs/Behavior/Behavior.SpecsHelpers.js)).

	Behavior.addFilterTest({
	  filterName: 'OverText',
	  desc: 'Creates an instance of OverText',
	  content:  '<input data-behavior="OverText" title="test"/>',
	  returns: OverText
	});

This code above can be used to validate that the HTML fragment passed in does, in fact, create an OverText instance and it can also be used with [Benchmark.js](http://benchmarkjs.com/) to see which of your filters are the most expensive.

### Delegator

Included in the library is also a file called Delegator which is essentially the same thing except for events. For example, let's say you have a predictable UI pattern of having a link that, when clicked, it hides a parent element. Rather than writing that code each time:

	document.body.addEvent("click:a.hideParent", function(e, link){
	  e.preventDefault();
	  link.getParent().hide();
	});

You register this pattern with Delegator and now you just do:

	<a data-trigger="hideParent" data-hideparent-options ="{'target': '.someSelector'}">Hide Me!</a>

It provides essentially the same value as Behavior, but at event time. The above example is pretty straight forward so, you know, why bother, right? But consider how many of these little things you write to make a web app function. If you can create them once and configure them inline, you save yourself a lot of code.

### BehaviorAPI

This stand-alone library facilitates reading values from element `data-` properties. Examples of the HTML expressions evaluated are as follows (all of the following produce the same output):

	<tag data-behavior="Filter1 Filter2" data-filter1-options="{'opt1': 'foo', 'opt2': 'bar', 'selector': '.selector'}"> //prefered
	<tag data-behavior="Filter1 Filter2" data-filter1-options="'opt1': 'foo', 'opt2': 'bar', 'selector': '.selector'"> //no braces on JSON
	<tag data-behavior="Filter1 Filter2" data-filter1-options="{'opt1': 'foo', 'opt2': 'bar'}" data-filter1-selector=".selector">
	<tag data-behavior="Filter1 Filter2" data-filter1-opt1='foo' data-filter1-opt2='false' data-filter1-selector=".selector">

The `-options` value is parsed as JSON first (it's slightly more permissive in that you don't have to wrap it in `{}` just for convenience). Values defined here are read as defined allowing you to express arrays, numbers, booleans, etc. Functions / callbacks are generally not used by Behavior.

If you attempt to read a value that isn't defined in this options object, the property name is attempted to be read from the property directly (e.g. `data-behaviorname-prop`). This value is *always* a string unless you specify a type. If a type is specified the value is run through the JSON parser and validated against that type.

Even if you don't want to use the whole Behavior suite, this library may be of use if you like the idea of including configuration inline. There's a lot more in `BehaviorAPI` so it's worth [perusing the docs for it](https://github.com/anutron/behavior/blob/master/Docs/BehaviorAPI.md).

### Documentation

* [Behavior](https://github.com/anutron/behavior/blob/master/Docs/Behavior.md)
* [BehaviorAPI](https://github.com/anutron/behavior/blob/master/Docs/BehaviorAPI.md)
* [Element.Data](https://github.com/anutron/behavior/blob/master/Docs/Element.Data.md)

### Stock Behaviors

Check out these resources of available Behavior Filters provided by the author:

* [https://github.com/anutron/more-behaviors](https://github.com/anutron/more-behaviors)
* [https://github.com/anutron/clientcide](https://github.com/anutron/clientcide)
* [https://github.com/anutron/mootools-bootstrap](https://github.com/anutron/mootools-bootstrap)

### Demos

* [MooTools Bootstrap Demos and Docs](http://anutron.github.com/mootools-bootstrap/)
* [Clientcide](http://dev.clientcide.com) (click on "demos" and check out the delegators and behaviors at the bottom of the left nav)

## Notes

Below are some notes regarding the implementation. The documentation should probably be read first as it gives usage examples.

* Only one selector is ever run; adding 1,000 filters doesn't affect performance.
* Nodes can have numerous filters.
* Nodes can have an arbitrary number of supported options for each filter (`data-behaviorname-foo="bar"`).
* Nodes can define options as JSON (this is actually the preferred implementation - `data-behaviorname-options="<your JSON>"`).
* Elements can be retired w/ custom destruction; cleaning up an element also cleans up all the children of that element that have had behaviors applied.
* Behaviors are only ever applied once to an element; if you call `myBehavior.apply(document.body)` a dozen times, the elements with filters will only have those filters applied once (can be forced to override and re-apply).
* Filters are instances of classes that are applied to any number of elements. They are named uniquely.
* Filters can be namespaced. Declare a filter called `Foo.Bar` and reference its options as `data-foo-bar-options="..."`.
* There are "global" filters that are registered for all instances of behavior.
* Instance filters get precedence. This allows for libraries to provide filters (like [http://github.com/anutron/more-behaviors](http://github.com/anutron/more-behaviors)) but for a specific instance to overwrite it without affecting the global state. (This pattern is in MooTools' `Form.Validator` and works pretty well).

### Limitations:

* Due to the DOM-searching for both creation and destruction, you can't have behavior instances inside each other.

### Downloading

You can find Behavior [on github](https://github.com/anutron/behavior) and also [on Clientcide](http://dev.clientcide.com) where you'll also find a builder. That builder will also let you get the stock behaviors from Clientcide and the ones I've authored for MooTools More. If you want to get to the bootstrap builder, be sure to select "MooTools Bootstrap" in the top menu (or just [clicketh hereth](http://dev.clientcide.com/?version=MooTools%20Bootstrap)).