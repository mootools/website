---
title: "MooTools 1.2.2 and the New MooTools More"
date: "Fri, 24 Apr 2009 00:53:34 +0000"
author: "Valerio Proietti"
tags: "releases"
permalink: "2009/04/23/mootools-122-and-the-new-mootools-more/"

---
Today we're releasing two goodies for you: MooTools 1.2.2 and the new MooTools More (1.2.2.1).

#### Core

MooTools 1.2.2 is a mainly a bug fix release but it also includes an almost entirely new Class.js. The reasoning behind this is that the old Class.js didn't play nicely with some advanced usages of this.parent() present in the new MooTools-More. We already had the script ready and tested in the MooTools 2.0 branch so we simply "backported" it to 1.2.2. Other than providing the parent fixes, the new Class also features a much more robust inheritance model, especially when dealing with objects.

For example, the objects you implement now in a class are merged if an object with the same name is found in the class prototype:

    var Animal = new Class({
        options: {
            color: 'brown',
            says: 'hissss'
        }
    });
    
    Animal.implement('options', {says: 'meow'});
    
    // Animal.prototype.options is now {says: 'meow', color: 'brown'};

This is especially useful when overriding default options in classes, such as Request.

Another object-oriented feature we introduced is that now sub-objects are actually inherited Parent-to-Child. If you implement a new option in <em>Animal</em>, then <em>Cat</em>, which is a subclass of <em>Animal</em>, <em></em>will get the new option as well, and so will every instance already existing. An example:

    var Cat = new Class({
        Extends: Animal
    });
    
    var kitty = new Cat();
    
    Animal.implement('options', {nu: 'one'});
    
    Cat.prototype.options.nu == 'one' //true
    kitty.options.nu == 'one' //true

This obviously also applies to methods.

Additional changes to the MooTools Core in 1.2.2 are mostly minor bug fixes.

#### More

One of the new features of MooTools-More, since the last RC, is that it is now possible access the previous state of overwritten methods of classes through Class.refractor. An example:

    var Cat = new Class({
        energy: 0,
            eat: function(){
                this.energy++;
        }
    });
    
    Cat = Class.refactor(Cat, {
        eat: function(){
            this.previous(); //energy++!
            alert("this cat has " + this.energy + " energy");
        }
    });

This functionality allows users to integrate seamlessly with existing classes, and add to existing methods without the need to subclass.

We're considering some way to make this behavior more generic for a possible inclusion in MooTools-Core 2.0.

The first RC of MooTools-More produced a lot of feedback and contributions that we've integrated as we prepared for our full release. Following this full release of the new MooTools More plugins, we'll begin adding new features quickly and regularly with what we hope will be biweekly releases.