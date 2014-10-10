---
title: "MooTools Classes: How to use them"
date: "Tue, 05 Feb 2008 17:26:44 +0000"
author: "Valerio Proietti"
tags: "all,tips"
permalink: "2008/02/05/mootools-classes-how-to-use-them/"

---
A very entry-level article: if you think you can beat MooTools Hero in expert mode, feel free to totally skip this.

<!--more-->

#### Cars

So, what is a Class? A Class is a car factory. A factory that throws out an infinite number of cars.

If you need to make a trip, then another one, then another one, you will probably use the same car over and over. Only if you decide to change something about your car, like the engine, or the color, or the materials for the seats, then you'll need another one.

Let's make a totally facetious example out of it, and buy a Car from the Car store! Say I want to buy a Smart Car:

    var mySmartCar = new Car({model: 'smart'});
    
Now that I have my car, it's parked in my virtual garage. Let's make a virtual trip!

    mySmartCar.goTo('Washington DC');
    
That was nice! Let's go to NYC:

    mySmartCar.goTo('New York');
    
As you can see, I'm using the same car to go to Washington DC and New York City. They're geographically close, so my smart car will suffice. What happens if I need to cross the cold Russia? Then I'm gonna need another car. A bigger, more powerful car. That's exactly when I must use `new` again.

    var myBigCar = new Car({model: 'Jeep'});
    
Let's use it now:

    myBigCar.goTo('Russia').goTo('China');
    
I wish going to China was this easy. :P

#### Classes

In MooTools, we have classes to perform different types of actions. We have Classes that deal with data (Request) or classes that display visual effects (Fx) and many more that I'm not talking about here today.

Fx.Morph, for example, is your factory. It makes Fx.Morph cars. Let's buy a car now: I want it to have a duration of 1000 ms, and I want it to be linked to this certain HTML element called "element":

    var myMorph = new Fx.Morph(element, {duration: 1000});
    
I have a car now, that we call Instance. Let's use it to change the height and width for the element previously specified to 200:

    myMorph.start({height: 200, width: 200});

Nothing easier.

These days, I see the same mistake being made over and over again: People buy a Car, and they make only one trip with it:

    new Fx.Morph(element, {duration: 1000}).start({height: 200, width: 200});
    
This is usually attached to a click event, which makes things even worse:

    element.addEvent('click', function(){
        new Fx.Morph(this, {duration: 1000}).start({height: 200, width: 200});
    });
    
Well, this is not how <del>life</del> MooTools works! Just like in real life, there is no need to buy a car each trip you make, unless you want to significantly change the properties of this car. This use and discard approach is wrong in so many ways.

First of all, it's memory inefficient, as a new Class instance is created every time you click the button. Second, it's also speed inefficient, as the class constructor is called every time you click the button. Third, using this approach will make it impossible to take advantage of the Instance properties.

In the Fx Class Instances there are a number of properties and checks being made to see if the effect is in execution, and a number of options you can define to determine the behaviour of subsequent start calls if a previous one is still running.

This is how you write the previous example correctly:

    var myMorph = new Fx.Morph(element, {duration: 1000});

    element.addEvent('click', function(){
        myMorph.start({height: 200, width: 200});
    });
    
This way, I create the Instance only once, and reuse it every time the user clicks the button! It won't screw up the effect for multiple clicks, and our OCD will have a rest for a change.

Same goes for the Request classes. What happens if I send the same request multiple times? Should I cancel the last one? Should I send both? Should I queue them?

If you do not properly use instances, a new request will be made each time. Same goes for Fx: a new fx on the same element will start at the same time, basically screwing up the whole animation.

#### MooTools is not Script.aculo.us

This approach of "use and discard" was used (and its still used afaik) in Script.aculo.us.

As an early Script.aculo.us user, I always struggled with the "multiple start calls" problem, and more often than I should, I took advantage the onComplete (afterFinish, in Script.aculo.us) option to set flags, and checked them in my click events, to avoid multiple executions at the same time.

That's exactly why I decided to write my own effects library, called moo.fx (which evolved into MooTools), so I could use classes--and their instances, as reusable objects.

This is not to criticize the Script.aculo.us approach. Since the library is designed to work that way, that's exactly how you should use it.  MooTools however, is not designed to work this way, and using it the same way as Script.aculo.us is a mistake.