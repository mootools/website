---
title: Drag.Move
date: 2014-10-08
author: Aaron Newton
---

*Drag.Move* extends *Drag* to support moving an element around the page. 

The usage is pretty straight forward:

```js
new Drag.Move($('fxTarget'));
```

It takes all the options that *Drag* takes and adds two new ones:


### Element.makeDraggable() 

*Element* has a shortcut that's really about the same number of characters (actually, it's one more), so it's not much of a shortcut. Still, it's easy enough to use:


```js
$('fxTarget').makeDraggable();
```


That's it. You're done. 

Now, if you want to do things like capture the location of the object when the user drops it (and then maybe send that info back to the server via ajax so you can remember its location for another visit), you can specify a bunch of additional options.

```js
$('fxTarget').makeDraggable({
	onStart: function(){
		console.log("start left: %s, top: %s", this.getLeft(), this.getTop());
	}.bind($('fxTarget')),
	onDrag: function(){
		console.log("drag start left: %s, top: %s", this.getLeft(), this.getTop());
	}.bind($('fxTarget'))
});
```

There's more stuff you can add here like snapping, and container so that you can drag an element only within the confines of another. Snap let's you require the user to drag the element a certain distance before it starts to follow the mouse (the default is 6px).


```js
$('dragExample').makeDraggable({
	snap: 25,
	container: 'snapContainer'
});
```


If you want to keep a handle on the instance of the *Drag.Move* class so you can interact with it (for instance, to disable dragging at a later point), you can do so with either syntax:


```js
var myDraggable = new Drag.Move($(element), {
	options...
});
var myDraggable = $(element).makeDraggable({
	options...
});
```

Here is the [documentation for Drag.Move.js](/docs/more/Drag/Drag.Move).
