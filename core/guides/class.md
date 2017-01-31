---
title: The MooTools Class
date: 2014-10-08
author: Aaron Newton
---


Here is [the documentation page for Class.js](/docs/core/Class/Class).
MooTools contains a robust Class creation and inheritance system. Creating a new class is actually pretty easy.

## Classes vs Functions 


Classes let you:

  * reuse and modify code without breaking things that depend on it
  * create a stateful object that can store information in its own scope
  * create more robust applications by developing small, reusable and extendable classes.

Stand alone functions let you:

  * create collections of executions that should happen together
  * create shortcuts for other functions that have a lengthy syntax
  * actually execute something

Functions are used sparingly with MooTools because Classes are so much more powerful. If you start off with a *Class* and try and keep things generic, and think of what you write as being reusable, you'll find that later you'll extend something you've already written and save yourself a lot of time and create a more robust solution for your problems. Others can make use of this as well.

MooTools itself is a great example of how using classes lets you create complex applications with less code. At the foundation of MooTools is the *Class* object. Almost every other piece of javascript in the library extends this object to create more complex functionality.

### Functions in Classes 


Classes can contain functions within them in the same way that they can contain variables (like "this.options"). Example:

```js
var Animal = new Class({
	initialize: function(options){
		this.options = options; // save our options.
		// if the options specify that the animal
		// is asleep when we create it, call sleep()
		if (this.options.sleepOnStart) this.sleep();
		// else it's awake
		else this.awake();
	},
	sleep: function(){
		this.isAsleep = true;
	},
	awake: function(){
		this.isAsleep = false;
	}
});
```



Now we can instantiate our animal and have it go to sleep or wake up when we want:

```js
var Cat = new Animal({
	color: "black",
	sleepOnStart: true
});
// kitty is asleep, let's wake her up
Cat.awake();
alert(Cat.isAsleep);
// -> alerts "false"
```







### Extending Classes 


Classes can be extended to create more complex functionality. In previous examples we've created an object (*Animal*) and an instance of that object (*Cat*), but by extending the base class we can create more complex functionality while reusing our code. Example:

```js
var Animal = new Class({
	initialize: function(options){
		this.options = options;
		this.isAlive = true;
	}
});

var Mammal = new Class({
	Extends: Animal,
	initialize: function(options){
		// this executes the initialize() function in the Animal Class
		// let's also pass the options to the parent's initialize function 
		this.parent(options);

		this.isWarmBlooded = true;
		this.hasFur = true;
		this.producesMilk = true;
	},
	sleep: function(){
		this.isAsleep = true;
	},
	awake: function(){
		this.isAsleep = false;
	}
});

var Mouse = new Class({
	Extends: Mammal
});

var Cat = new Class({
	Extends: Mammal,
	initialize: function(options){
		// call initialize of Mammal
		// pass along any options for
		// the Mammal and Animal classes
		this.parent(options)
		this.hasClaws = true;
		this.hasTail = true;
		this.isCarnivorous = true;
	},
	catchMouse: function(mouse){
		mouse.isAlive = false;
		return mouse;
	}
});
```


Ok, so now we have an *Animal* class, a *Mammal* class (that extends *Animal*), and *Cat* and *Mouse* classes (that extend *Mammal*). The code above creates the classes but doesn't actually execute anything. So let's put this code to use:

```js
var Kitty = new Cat({
	color: "black"
});

var Mickey = new Mouse({
	color: "black",
	pants: true,
	shoes: true
});

Kitty.catchMouse(Mickey);

alert(Mickey.isAlive);
// ->false
```



By breaking things up into classes this way, at any point in the future we can implement more types of *Animals*, *Mammals*, or even different types of *Cats* and *Mice*. It also means that if we find a bug in, say, the *Mammal* class, fixing it in that one place means we don't have to fix it in all the instances of *Mammal*.

Note that in using *Extends* you extend the parent class into the child. It is possible to do this to the class itself. For example:

```js
// from the example above...
var Cat = new Class({
	Extends: Mammal,
	initialize: function(options){
		// call initialize of Mammal
		// pass along any options for
		// the Mammal and Animal classes
		this.parent(options)
		this.hasClaws = true;
		this.hasTail = true;
		this.isCarnivorous = true;
	},
	catchMouse: function(mouse){
		mouse.isAlive = false;
		return mouse;
	}
});

// ... then later

Cat = new Class({
	Extends: Cat,
	initialize: function(options){
		this.parent(options);
		this.energy = 0;
	},
	catchMouse: function(mouse){
		this.parent(mouse);
		this.energy++;
	}
});
```



Here we had a class for *Cat*, but later we wanted to add a bit of functionality to it. Rather than duplicating our code, and rather than creating another namespace ("BetterCat" or something), we just implement new code into the class (using *.extend*) and call *this.parent* to execute the functionality already in the class.

### Implementing Classes 


Extending classes allows you to take a base class (like *Animal* above) and create a new class with that one as a template (as in our *Mammal* class above). This doesn't alter the *Animal* class in any way.

This isn't always what we're after though. Sometimes you want to alter the parent class in a given context. Let's say, for example, that you're using the *Animal* class above, but you want to add a function to it for your environment. Extending the *Animal* class to create something like *AnimalExtended* doesn't work for you because you're still going to use *Cat* and *Mouse* and *Mammal* and you don't want to rewrite those.

Here's where *.implement* comes in handy. This allows you to add functionality into a class, altering the class itself. You can't use the "this.parent()" function like you can with extend because you aren't creating a child - you're modifying the class. Additionally, if you use the same namespace as one that's already there, you'll overwrite it. Example:

```js
// this is the same Animal class as above
var Animal = new Class({
	initialize: function(options){
		this.options = options;
		this.isAlive = true;
	}
});

// let's change it to include some additional functionality:
Animal.implement({
	eat: function(){
		if (typeof this.energy == "undefined") this.energy = 0;
		this.energy++;
	}
});
```



Now *Animal* has a function called *eat()* that increments its energy value. 	

Let's say that later we want to add the ability to pass in a starting value in the options and we want to implement that in to the class as well. Using *.implement*, if we want to alter the *.eat* function, we'll have to write it all over again:

```js
// let's let you pass in a starting value
Animal.implement({
			eat: function(){
				if (typeof this.energy == "undefined"){
					if (typeof this.options.startingEnergy != "undefined") this.energy = this.options.startingEnergy;
					else this.energy = 0;
					this.energy++;
				}
			});
```



Implement is used in MooTools mostly to extend classes that are in the "Native" group - specifically the String, Array, Function, and Element prototype. This means that if you have this code:

```js
String.implement({
	alert: function(){
		alert(this);
	}
});
```



Then any string would inherit that function:

```js
"hey howdy!".alert();
```



In this way, MooTools gives you a lot of shortcuts for things you often do to things like Strings, Arrays, etc.

There's one other way to use implement that's pretty handy. You can create a class and then implement it into another, like so:

```js
// this is the same Mammal and Cat class as above
var Carnivore = new Class({
	isCarnivore: true,
	energy: 0,
	eat: function(){
		this.energy++;
	}
});

var Cat = new Class({
	Extends: Mammal,
	Implements: Carnivore,
	initialize: function(){
		this.parent() // call initialize of Mammal
		this.hasClaws = true;
		this.hasTail = true;
		this.isCarnivorous = true;
	},
	function: catchMouse(mouse){
		mouse.isAlive = false;
		return mouse;
	}
});
```



Now all the *Cats* that you create will have the functionality defined in *Carnivore*. This allows you to create
more bite-sized (to play the pun) code that can be added and implemented where it's needed.




### Implement vs. Extend 

The main difference between *Extends* and *Implements* is that *Implement* changes the class's prototype, while *Extend* creates a copy. This means that if you implement a change into a class all instances of that class will inherit that change instantly, while if you use *Extend* then all existing instances will remain the same.

This is why we use *Implement* when we implement classes into each other. Here's a simple illustration:

```js
var Thingy = new Class({
	go: function(){
		alert('hi');
	}
});

var myClass = new Thingy();
myClass.go(); /* alerts 'hi' */

Thingy.implement({
	go: function(){
		alert('implemented');
	}
});
myClass.go(); /* alerts 'implemented' */
Thingy = Thingy.extend({
	go: function(){
		alert('extended');
	}
});
myClass.go();
/* alerts 'implemented'
because extend only affects
new instances. */
```
