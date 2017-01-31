---
title: "Events with MooTools - Element, Class, Delegation and Pseudos"
date: "Mon, 28 Mar 2011 19:18:10 +0000"
author: "Arian Stolwijk"
tags: "all,tips"
permalink: "2011/03/28/events-with-mootools-element-class-delegation-and-pseudos/"

---
One of the most useful and common part of MooTools is its Events Type. There are two Event usages:  Element and Class. Element.Events is probably the most known because that's probably one of the first things you've used when you started using MooTools. Furthermore, MooTools More 1.3 Events.Pseudos has been introduced to give even more power and control over Events and with Event Delegation can give your page a massive performance boost. This blog post will give you a deeper insight into all components.

<!--more-->

### Element.Events

Element.Events represents DOM node event abstraction.  The most simple example is, of course, adding a click event to a DOM Element:

<iframe style="width: 100%; height: 200px" src="http://jsfiddle.net/arian/PS5kP/2/embedded/"></iframe>

For the sake of completeness I'll explain this code step by step. First we grab the `a` element with the [document.id][] method. Then we call the [Element:addEvent][] method. The `addEvent` accepts two arguments: the event name, which is a string without the 'on' part (click, keydown, mouseover) and the callback, which is a function. This function will be called when the user clicks the element.

There are two interesting things you see there: first, the `event` argument of the callback function. This is an instance of the [Event][] Type. This is a wrapper of the native event object so we do not have to worry about browser inconsistencies. In this case the `stop` method is called to stop all default behaviors, like following the link.
The second interesting thing is that we can use the `this` variable in the event callback which refers to the `clickme` element.

#### Removing Events

Once you've added events to an Element, you might want to remove them some time later. Removing events is pretty straightforward. We have to store a reference to the function if we only want to remove this single event.

	// store a reference to the callback
	var myCallback = function(event){
		alert('hi');
	};

	// add the event
	myElement.addEvent('click', myCallback);

	// remove the event
	myElement.removeEvent('click', myCallback);

You can remove all the click events when calling the `removeEvents` method.

	myElement.removeEvents('click');

This is an interesting example what you can do when you only want to click an element twice:

<iframe style="width: 100%; height: 200px" src="http://jsfiddle.net/arian/cezxh/embedded/"></iframe>

#### Firing Events manually

It is possible to fire events manually with the `fireEvent` method. This is not a very common method but can be useful.

The following example is how you can call events you've added to an element manually:

<iframe style="width: 100%; height: 200px" src="http://jsfiddle.net/arian/s6y7E/embedded/"></iframe>

It is important to note that the event callback of the `clickme` event checks if the `event.stop` method exists. When using `fireEvent` you're not calling the callback through the DOM but directly with pure JavaScript. You can pass additional arguments as a second argument of the `fireEvent`, e.g:

	clickme.fireEvent('click', [{stop: function(){}}, 'MooTools'], 500);

What am I doing here? The second argument of the `fireEvent` accepts a single argument or an array of arguments. In this case, I pass an array of arguments, which contains an Object as the first item in the array. The Object helps get rid of the `if (event && event.stop)` condition in the former example because it mimics the Event object. In the forge there is a more sophisticated [Event.Mock](/forge/p/event_mock).

Additionally, I've passed a third argument to `fireEvent`, `500`. This third argument is used to delay the execution of the event callback.

You don't necessarily have to use existing events like `click` or `mouseenter`. You can fire an event like `grow` as well. If you add an event `grow` to the element it will work fine:

	clickme.addEvent('grow', function(height){
		this.tween('height', this.getStyle('height').toInt() + height);
	});
	clickme.fireEvent('grow', 30);

#### Clone Events

An even lesser known method is the `cloneEvents` method. This method can be used to clone the events from the first element into the other, for example, after using the `clone` method.

#### How Events Work Internally

The methods in Element.Events: addEvent, addEvents, removeEvent, removeEvents, fireEvent and cloneEvents, which are described above, are actually wrappers to native browser methods. Unfortunately those native methods are inconsistent across browsers. Most browsers use the W3C specification `addEventListener` except IE 8 and lower which uses the `attachEvent` method. A MooTools wrapper for the `addEventListener` is called `addListener`. This is a private method that will give us a cross-browser implementation for `addEvent`.

Another reason why we use our own methods is garbage collection. This happens when adding events to elements and the elements are removed from the DOM later. The events are still there, but the element is not; this might cause to memory leaks. Fortunately MooTools handles this problem and you don't need to manually fix this issue.

Finally MooTools stores all the event callbacks using the `store` and `retrieve` methods. You could retrieve the object with all event callbacks using `myElement.retrieve('events')`. This is private and not recommended because it could break your code sooner or later. The reason why MooTools stores all the callbacks is so you can easily remove, fire, or clone them without passing a reference to the callbacks each time.

#### Event Bubbling

An interesting thing about the DOM is that elements can be nested. So what will happen if you add events to an element and to the element's child element? What will happen is called 'Event Bubbling'.

This is a quick example:
<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/arian/4K3ad/embedded/"></iframe>

In this example there are two different elements, where the `a` element is nested into the `div` element. Each element has its own click event. Now when you click the `a` element, both events are fired, first the event of the `a` element, then the event of the `div` element. Also note that we cannot use the `Event:stop` or `Event:stopPropagation` methods anymore because this will block bubbling, we should use `Event.preventDefault` in this case. 

This is actually nothing special of MooTools, but this is how it's specified by the W3C. The W3C specification has a capture phase too, that will go the other way around. Unfortunately MooTools cannot support this because IE 8 and lower doesn't support it. The three phases are clearly explained in [this diagram](http://www.w3.org/TR/DOM-Level-3-Events/#dom-event-architecture)

#### Event Delegation

Event Delegation is a technique that uses event bubbling and the `event.target` property. The target property is always the element which is clicked (or hovered when using mouse* events). What you can do is add an event to one of the parent elements, which will fire too because of the bubbling, and check of the target property satisfies your constrains, for example if it matches a CSS selector.

A very basic example of event delegation is:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/arian/2CKEL/embedded/"></iframe>

This example is very simple, but it can get more difficult with more complex delegates. That's why MooTools More has the [Element.Delegation][] component. This component makes it easy to use delegation.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/arian/Qd7fb/embedded/"></iframe>

This example uses Delegation. You can see that instead of using just `click`, `click:relay(tr td.click)` is used. With the Event Pseudo (will be explained later) `relay` we tell MooTools to check if the target or one of its parents matches the passed selector `tr td.click`. If the element is matched the callback gets fired.

Event Delegation has some important advantages. It especially improves performance. Imagine a page with hundreds of links or table rows. Instead of adding an event to every element, you can delegate the parent element by adding only one event. 
Secondly Event Delegation is useful when working with dynamic pages. In case you have the same large table which will update regularly by XHR Requests, you don't have to add new events to the rows because the rows are added into the table which has the event. The click event will bubble up to the table element and when the new row is matched against the given selector the callback function is fired. This can save you a serious amount of code and logic.

### Class Events

Now we have seen how Element Events work, we'll explore the Class Events. Class Events brings similar methods like addEvent, addEvents, removeEvent, removeEvents and fireEvent to MooTools Class. 

First an example from the docs to illustrate how it works:

    var Widget = new Class({
        Implements: Events,
        initialize: function(element){
            // …
        },
        complete: function(){
            this.fireEvent('complete');
        }
    });
 
    var myWidget = new Widget();
    myWidget.addEvent('complete', myFunction);

So what does this do? First it implements the [Events][] mixin. The Implements mutator will copy the methods of the Events mixin into the Widget Class.
In the complete method  it uses the `fireEvent` to fire all the added 'complete' events. Once the Widget class is instantiated the example uses the `addEvent` method to add an event 'complete' with the callback `myFunction`.

When you want to pass arguments to the callback function, you can use the second argument of the `fireEvent` method, which accepts any value for a single argument or an array for multiple arguments, just like `Element:fireEvent`.

#### addEvent Internal argument

This is a fairly unknown but useful feature. The third argument of the `addEvent` method is called the `internal` argument. This argument can be set to `true` when you do not want that the event can be removed.

Imagine you're building a datepicker class. You split it up in two classes, a Picker class and a DatePicker class. The Picker Class is a generic picker which could be used for a ColorPicker or whatever picker too. It has an `open` method which opens the picker and fires the 'open' event. Now the DatePicker has to do some extra things on open. Now it could overwrite the 'open' method, but it can add an 'open' event too. Though you do not want that the user can remove the event when using `myDatePicker.removeEvents('open')`. In this case you set the `internal` argument to `true`.

#### Adding Events with Class Options

If you've used [Fx][] or [Request][] you definitely have used this: events as options when instantiating a Class. This are functions which have property names like `onEventname` where `Eventname` (the first character should be uppercase) is the actual eventname and is prefixed by `on`.

	new Fx({
		onComplete: function(){
			// Will get fired when the Fx is complete
		},
		onPause: function(){
			// The Fx is paused
		}
	});

The `setOptions` method of the [Options][] mixin will automatically detect this and use the `addEvent` method.

	var myWidget = new Class({
		Implements: Options,
		options: { // Default options and events
			onComplete: function(){
				// Will get fired when the class is complete
			},
			onPause: function(){
				// The class is paused
			}
		},
		initialize: function(options){
			// use the setOption method 
			this.setOptions(options);
		}
	});


### Events Pseudos

We've seen already a glimpse of [Events Pseudos][Events.Pseudos] when using Event Delegation. This is a new component in MooTools More 1.3. It allows you to use event names as CSS Pseudo Selectors, thus `event:pseudo(value)`. 

A quick example how to use the `:once` pseudo:

<iframe style="width: 100%; height: 200px" src="http://jsfiddle.net/arian/wXFvj/embedded/"></iframe>

#### Behind the scenes

Because the Element and Class methods are so similar, Events Pseudos is actually implemented once for both. It is totally abstracted to a single (private) function `Events.Pseudos`. It returns an object with modified `addEvent` and `removeEvent` methods. These methods are implemented into [Events][Events.Pseudos] and [Element][Element.Event.Pseudos], so it monkey patches the old ones.

When using one of the methods it will detect if the eventname is a pseudo eventname, if that's the case the eventname is parsed by `Slick.Parse` to an object. Finally it will add an event to the Class or Element with a custom callback. That callback fires the corresponding pseudo function. That pseudo function is actually a function in between that can do some extra stuff. 

#### Event Pseudo Functions

The 'function in between that can do some stuff' is actually the power of Events Pseudos. Like the `:once` pseudo function it will fire the passed callback function and remove itself, so the callback function can only be fired once. Another existing pseudo function for elements is [:keys][] which waits till all passed keys are pressed until firing the callback. These psuedo functions can be defined by `Events.definePseudo` or `Event.definePseudo`. In MooTools More 1.3.1.1 the `:pause` and `:throttle` events were added.

At this point we come back at Event Delegation, because the `:relay(selector)` is a Pseudo Function too! That pseudo function basically uses `Slick.match` to check if the element matches the selector and should fire the callback function.

#### Creating your own Pseudo Functions

You can define your own pseudo functions. This can be done with the `Events.definePseudo` or `Event.definePseudo` functions. The first one for Class Events, the second one for Element Events.

This is an example how to create a pseudo event which only allows you to click an element with the right mousebutton based on the mousedown event:

<iframe style="width: 100%; height: 200px" src="http://jsfiddle.net/arian/BAKHU/embedded/"></iframe>

This is a fairly simple example, but it is clear that you can do a lot of things with it while keeping your code clean and simple to read.

Another example that counts the number of clicks:

<iframe style="width: 100%; height: 350px" src="http://jsfiddle.net/arian/v7W4M/embedded/"></iframe>

You can see that `var event = args[0];` is used. The `args` argument is the argument that keeps the usual arguments passed into a normal event callback. Since we're working with Element Events it has only one, so `args[0]` is the [Event][] instance. Of course this argument can be different when working with Class events or when using the `fireEvent` method with multiple arguments.

The `split` argument contains an object with the parsed event name: `event:pseudo(value)`. You can use the `split.value` property for example if you use the `(` and `)` for passing an extra value (like `:relay(selector)` for Event Delegation). The `split.original` property contains the whole string, so `event:pseudo(value)` which can be used to remove the event in the pseudo function, which is actually what the `:once` pseudo function does.

Finally we use `fn.apply(this, args)` to call the callback function (which highligts the `a` element). We use apply to be sure that `this` refers to the element and it is called with the same arguments as usually. You can do something else of course, but in most cases you want to use `fn.apply(this, args)`.


### Conclusion

Events are very powerful and you almost cannot write MooTools code without using Events. For the DOM, MooTools saves you a lot of pain and brings you the easy cross-browser API. Because of the nature of the DOM, it brings Event Bubbling which can be used for Event Delegation which can bring you several advantages. A unique part of MooTools is its Class, which brings the same API of DOM Events to Class. To give you even more power to Events, Events Pseudos can be used.

#### Quick tip

Also have a look at [Company](http://code.keetology.com/company/) by Keeto or the PubSub pattern with the [MooTools-Channels](https://github.com/rpflorence/mootools-channels) as MooTools implementation.



[document.id]: /docs/core/Element/Element#Window:document-id
[Element:addEvent]: /docs/core/Element/Element.Event#Element:addEvent
[Event]: /docs/core/Types/Event
[Element.Delegation]: /docs/more/Element/Element.Delegation
[Events]: /docs/core/Class/Class.Extras#Events
[Fx]: /docs/core/Fx/Fx
[Request]: /docs/core/Request/Request
[Options]: /docs/core/Class/Class.Extras#Options
[Events.Pseudos]: /docs/more/Class/Events.Pseudos
[Element.Event.Pseudos]: /docs/more/Element/Element.Event.Pseudos
[:keys]: /docs/more/Element/Element.Event.Pseudos.Keys
