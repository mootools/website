---
title: "What's New in 1.2: The Hash"
date: "Mon, 08 Oct 2007 01:22:21 +0000"
author: "Tom Occhino"
tags: "all,features,news"
permalink: "2007/10/08/whats-new-in-12-the-hash/"

---
In recent development of MooTools, we've incorporated into the core a plugin that was once pushed under the table and neglected.  The Hash is a powerful new way to extend objects just like you've always wanted...

<!--more-->

#####Alright, what the heck is all this Hash business?

The current 1.2 development version of MooTools saw a promotion of the Hash Class up from a plugin to a Native type.  A Hash is basically a wrapper for native JavaScript Objects.  The reason it was created was because as we all know, the Object prototype is off limits!  (for a brief explanation... see [rule #2](http://dean.edwards.name/weblog/2007/03/rules/#rule2)).  So what can i do with this crazy new thing?

    var hash = new Hash({ 'a': 'one', 'b': 'two', 'c': 'three', 'd': 'four'});
    hash.get('a'); //"one"
    hash.set('e', 'five'); //hash.e is now 'five'
    hash.set('c', 'new value'); //hash.c is now 'new value'
    hash.f = 'another value here'; //this is perfectly acceptable also, get / set are just shortcuts to filter out prototypes
    hash.has('b') //true
    hash.each(function(value, key){ alert(key + ':' + value); }); //alerts a:one, b:two, etc.
    hash.get('each'); //null

Now i know what you're thinking, "Alright, so what... i could do all that stuff before with Objects, even the each with a simple for in loop."  Well, no. The Hash Native also supports just about every Array method including 'map', 'every', 'some', and 'filter', as well as a few other really handy shortcuts.  We now use Hash as the all-purpose data type throughout the MooTools Framework.  Once you start using it, you'll know why. ;)  (Also a note to anyone who has ever used Abstract in MooTools... The Hash is a replacement for Abstract and is much, much more powerful.  Anywhere you used to have Abstract in your 1.1+ MooTools code, just replace with Hash and you should be all good)

#####Generics are so cool...

Just like all other MooTools Natives, Hash has full generics support.  This means that any function you can call on a hash, you can also call by passing the hash as the first argument to the genericized function.  Also, any generic you can use on a hash can also be used on a native JavaScript Object.

    var obj = { 'a': 'one', 'b': 'two', 'c': 'three', 'd': 'four'};
    Hash.each(obj, function(value, key){ alert(key + ':' + value); }); //alerts a:one, b:two, etc.
    Hash.filter(obj, function(value, key){ return key.test(/a|c/); }); //returns a hash containing { 'a': 'one', 'c': 'three' }
    Hash.getKeys(obj); //returns ['a', 'b', 'c', 'd']

#####What other stuff can i do?

Well perhaps the most powerful aspect of Hashes is as i mentioned before, all the Array functions you've come to know and love can now be used on Hashes. Check out the source for many more implemented methods.  Hash really is a awesome tool, so wonderful in fact that it's been included in the Core of the framework.  In my next article, I'll talk about some exciting changes to Fx in MooTools, as well as some awesome new Element shortcuts.

--ciao for now!