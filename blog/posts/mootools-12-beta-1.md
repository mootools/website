---
title: "MooTools 1.2 beta 1"
date: "Wed, 14 Nov 2007 01:13:12 +0000"
author: "Tom Occhino"
tags: "all,news,releases"
permalink: "2007/11/14/mootools-12-beta-1/"

---
The first beta for MooTools 1.2 is finally here!

After **months** in the making, we can confidently say that MooTools 1.2 is now feature complete.  However, there are still some bugs left to squash.

Head over to [MooTools download page](http://mootools.net/download/tags/1-2b1) to start playing with it right away.

<!--more-->

#### A Note About Compatibility

Some parts of MooTools 1.2 aren't immediately compatible with those found in MooTools 1.1. In the downloads page, you'll find a box that says: "include compatibility with previous version". Clicking that box will add the missing pieces and will make MooTools 1.2 play nice with code written for MooTools 1.1.

#### New stuff that we already covered:

[The amazing Hash](http://blog.mootools.net/2007/10/8/what-s-new-in-1-2-the-hash)

[Specs!](http://blog.mootools.net/2007/10/20/what-s-new-in-1-2-spec-runner)

[Effects Enhancements](http://blog.mootools.net/2007/10/23/The_Best_Javascript_Effects_Now_Even_Better)

#### Important stuff thats not yet covered in a blog article:

Full IFrames support with the Native IFrame Class.

Swiff: Flash content injection Class. Include Flash files, the easy way!

#### A Little Help, Please!

We are currently looking for bug reports and incompatibilities with previous plugins. If you want to help out, [open a ticket](http://dev.mootools.net/newticket) in the Trac, and we will make sure that the problem is fixed for the final release.

Read more for a (not so) brief "what's new" list.

(P.S. This list is not exhaustive, it's just the stuff we could remember.)

##### Core

* Every native method is now backed up by generics. `Array.flatten(arguments)`
* New Function $lambda, that makes any value into a function. `$lambda(1)();` or `$lambda(function(){return 1;})();`
* New Function $arguments, returns the specified arguments index of the passed in function. `var x = $arguments(1); x(1, 2);`
* Hash is now a Native, too. This is especially useful for Generics on objects. Defined in the core along with its .each method. `{a:1,b:2}.each(function(value, key){console.log(value, key);});`
* The Array .each method is now defined in the core. `[1,2,3].each(function(item){console.log(item);});`
* $type now returns the relative type for each defined Native (including window, document, and others). `$type(window);`
* New Function $exec, which is now the standard function to evaluate code in the global scope. `$exec('var x = 10;'); window.x;`

##### Browser

* Window and Document are now Natives. `new Window(iframe.contentWindow)`
* New Browser object, that holds useful information on the browser being used. This informations used to be stored in the window object. `Browser.Engine.webkit;`
* `.head`, `.html` and `.window` are now automatically created shortcuts on document instantiation.

##### Array

* New Array method `.flatten`. Flattens a multidimensional array in a single, 2d array. Especially useful with arguments.
* New Array method `.link`. Links the contents of an array with an hash based on names/functions. If the functions successfully runs on an array item, the item will be linked to that name.

##### Hash

* Hash is now a Native. It sports almost the same methods as Array (`.map`, `.every`, `.some`, `.each`) plus others from the original Hash class.

##### Number

* Now the Number Native also includes all the methods from the Math object, to allow for a more OOP experience. `(10).sin(); (10).cos(); (10).pow(2);`.

##### String

* New String method `.stripScripts`, to strip and optionally evaluate script tags from a string.

##### Class

* Class method .extend has been deprecated. Now every class accepts Extends and Implements properties. `new Class({Extends: OtherClass, Implements: [Events, Options]})`

##### Element

* New `TextNode` Native, to allow easy creation and manipulation of text nodes. `new TextNode('ciao').inject(document.body);`
* New `IFrame` Native, to allow for easy IFrames creation / augmentation. `new IFrame('/index.html').inject(document.body);`
* `.inject`, `.grab`, `.append` methods now supports instantiated text nodes. `element.grab(new TextNode('ciao'))`
* Element Storage, to store information linked to the DOM elements, but in the storage.
* `.store` and `.retrieve` Element methods, to work with the Element Storage. `element.store('property', 100); element.retrieve('property');`
* New Element `.set`, `.get` and `.erase` methods. Can be used as set/get/removeProperty shortcuts, and they also support defining new "getters" and "setters".
* Element `.match` method, to match an element against a selector. `element.match('div.someClass[name=stupid]');`
* New Element `.wraps` method, to wrap an element with another one.
* New Element `.replaces` method, to replace an element with another one. This replaces the `.replaceWith` method.
* Element `.remove` is now `.dispose` to resolve a naming conflict in internet explorer.
* Element methods `.getFirst`, `.getLast`, `.getPrevious`, `.getNext` now support a selector to match the result to. `inputElement.getParent('form');`
* Added methods `.getAllNext`, `.getAllPrevious`, `.getParents`. They also support matching against selectors, but they return elements collections.
* Element method `.setHTML` deprecated in favor of `.set('html', value)`. Also added the `.get('html')` counterpart.
* Element method `.setText` deprecated in favor of `.set('text', value)`. Also added the `.get('text')` counterpart.
* Element method `.getValue` deprecated in favor of `.get('value')`.
* Element method `.getTag` deprecated in favor of `.get('tag')`.
* Element Custom Events creation API is changed, and its now 100% more intuitive.
* Element Events section overhauled. When adding a new Listener with `.addEvent` the window event will be automatically instantiated, removing the cruft.
* Element Styles section overhauled. Styles are more solid than ever, and you can even write your own style rules.

##### Selectors

* Support for pseudo selectors (CSS3) has been added. You can now even define your own custom pseudo selectors.
* The performance of the CSS selectors has been vastly improved.
* Selectors now include support for matching a selector against an element.

##### Element/Document Dimensions

* Dimensions is a new component to handle the size and position in space of elements and the document.
* Methods are not attached to the window object anymore, but rather on document.
* Method `.getSize` is now deprecated, as well as `.getHeight` and `.getWidth`. The official method to get the offset size of either the document or an element is now `.getOffsetSize`, which returns an object containing x and y keys.
* Methods `.getScrollHeight` and `.getScrollWidth` are now deprecated. The official method to get the scroll size of either the document or an element is now `.getScrollSize`, returning an object containing x and y keys.
* Methods `.getScrollTop` and `.getScrollLeft` are now deprecated. The official method to get the scroll of either the document or an element is now `.getScroll`, returning an object containing x and y keys.
* New Method `.getRelativePosition`, gets the position relative to an element's offset parent. This returns the values that you would need to set via CSS to make it appear where it is on the page. Returns an object containing x and y keys.
* Method `.getPosition` has been enhanced to work in every situation, without the need to manually include scrolled parent nodes. It also accepts an additional argument, relative, to automatically calculate the difference of positions of these two elements (this and relative). Returns an object containing x and y keys.
* New Element method `.position`, to position an element with x and y coordinates. Note: this is relative to the element's offset parent, so its best used along with `.getRelativePosition`.
* New Element method `.positioned`, to check if an element is positioned with absolute, relative or fixed style.
* New Element method `.getOffsetParent`, to get the real offset parent of an element. This is to circumvent a bug with Internet Explorer not returning the real `offsetParent`.

##### Sortables

* Support for sortable floated lists has been added.
* Support for sorting between many lists has been added.
* You can now add and remove items from sortable lists on the fly.
* Positioning logic has been hugely improved and everything now works independent of CSS configurations.
* Serializing is now much more robust and allows for the use of a custom callback.

##### Drag

* Drag.Base is now simply named Drag.
* The onSnap event has been deprecated.
* The onStart event is now fired after the element has been dragged farther than the distance defined in the snap option.
* The onCancel event is now fired correctly when the user begins a drag but lets up the mouse button before moving a distance greater than the distance defined by the snap option.
* The onComplete event will no longer be fired if the user simple clicks on the draggable element without actually dragging.
* The mousedown event is no longer prevented from propagating, so textareas are focusable and links are clickable inside of draggable elements without defined handles.

##### Drag.Move

* When making an element draggable, the element will now stay in the same place on the page without manually setting its position after the call to makeDraggable.

##### Fx

* Fx.Base is now simply named Fx.
* The base class for all the Fx has been completely rewritten for optimization and a cleaner API.
* Fx:pause and Fx:resume methods have been added.
* The Fx constructors now accept durations as one of the three strings 'short', 'normal', and 'long' corresponding to values of 250, 500, and 1000 milliseconds.
* A new 'link' option is provided to control what happens when calls are made to start while an effect is currently running
    * link: 'cancel' - like wait:false from previous releases, will cancel the currently running effect to start the new one.
    * link: 'ignore' - like wait:true from previous releases, will ignore any calls made to start while a transition is in progress.
    * link: 'chain' - will chain all calls made to start so that they run one at a time in succession.

##### Fx.Tween

* Fx.Style is now named Fx.Tween to more accurately reflect the behavior and to be consistent with the new Element:tween.
* Element:tween has been added which will use the Element's internal Fx.Tween instance to transition any property in a single function call.
* Element:highlight has been added which will fade an Element's background color from the specified value down to its current color. Default color is '#ff8'.
* Element:fade has been added which will fade an Element to the specified state or opacity in a single function call. Possible values are:
    * 'in', 'out', 'toggle' - fade the element in, out, or to the opposite of its current state (respectively).
    * 'show', 'hide' - set the elements opacity immediately to 1 or 0 respectively, without a transition.
    * numeric value between 0 and 1 - fade the element to the specified opacity.

##### Fx.Morph

* Fx.Styles is now named Fx.Morph to more accurately reflect the behavior and to be consistent with the new Element:morph.
* Element:morph has been added which will use the Element's internal Fx.Morph instance to transition any number of properties in a single function call.
* CSS Selectors may now also be used as the argument to grab the transition styles from so properties can be stored in the Stylesheets.

##### Fx.Slide

* Element:slide has been added which will use the Element's internal Fx.Slide instance to slide the element in and out in a single function call. Possible values are:
    * 'in', 'out', 'toggle' - slide the element in, out, or to the opposite of its current state (respectively).
    * 'show', 'hide' - set the slide state of the element immediately to in or out respectively, without a transition.

##### Fx.Transitions

* When Fx.Transitions is included, the transition may now be passed to the Fx option as a colon separated string (type:how). Examples include:
    * 'linear', 'sine:in', 'expo:out', 'quad:in', 'bounce:out', 'elastic:out', 'quint:in:out', etc.

##### Request

* New Request class replaces XHR and Ajax as the MooTools XMLHttpRequest wrapper.
* The Request constructor takes in only options, one of which is the URL, which used to be passed as the first argument.
* Request:send now takes an options object, or a String or Element to be used as data as the only argument.
    * Any options passed to send are used in place of the defaults that were provided (if they were provided) when creating the instance.
* New Request methods for handling specific types of requests more easily.
    * Request:get, Request:post - Strings passed to these functions will be used as the url, an object passed will be the data, and the method will be get and post respectively.
    * GET, POST, PUT, and DELETE methods have also been added to make RPC with MooTools easier. All behave the same way as get and post.
* Element:send no longer takes options as an argument, but rather, takes the url to send the request to.  In order to use special options for the internal Request instance, you must use Element:set.

##### Request.HTML

* Request.HTML adds some extra functionality for automatically processing HTML responses to the Request Class.
* After a successful Request, the response's HTML is processed, scripts can be evaluated, and several arguments are passed to the onSuccess callback.
    * tree - the original tree of the HTML snippet that was returned from the Request.
    * elements - a flattened array of all the Elements that were returned from the Request.
    * html - the raw HTML string that was returned from the Response.
* Element:load has been added which allows you to update the HTML content of an element from the response of a Request called using the Element's internal Request.HTML instance.

##### Request.JSON

* Request.JSON now replaces JSON.Remote and adds some extra functionality for automatically processing JSON responses to the Request Class.
* After a successful Request, the response's JSON is processed and passed directly to the onSuccess callback.

##### A Final Note

Thanks for reading this far! We promise you won't be disappointed with 1.2.