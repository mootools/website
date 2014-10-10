---
title: "Get friendly with the Natives"
date: "Wed, 24 Mar 2010 02:48:56 +0000"
author: "Ryan Florence"
tags: "all,tips"
permalink: "2010/03/23/get-friendly-with-the-natives/"

---
Have you extended a Native lately? It's an incredibly helpful thing. Often people write ugly functions that take a string or whatever as an argument and return some manipulation of the string. Extending natives is a great way to do the same thing, but it is much prettier (aka: explicit, readable, easier-to-debug.)

### The Difference:

I've seen stuff like this:

    fn1(fn2(10, fn3('house')));

Hard to figure out what's happening.  Instead you can write code like:

    fn3('house').fn2(10).fn1();    

### A Useful, Real Example, zeroPad

I've used this in a couple scripts, it takes a number and returns a string with zeros padded in front: 123 becomes '000123'.  Really handy for filenames and the like.  Here's the ugly version:

### Functionally Based Example

    function zeroPad(num, zeros){
      zeros = zeros || 3;
      var str = '' + num;
      zeros.times(function(){ str = '0'+str; });
      return str;
    };
    
    // usage
    doSomething(zeroPad(document.getElementById('myInput').value, 3));
    

### Native Extentions Based Example

    Number.implement({
      zeroPad: function(zeros){
        var str = '' + this;
        zeros.times(function(){ str = '0'+str; });
        return str;
      }
    });
    
    // so that it works on both numbers and strings
    String.implement({
      zeroPad: function(zeros){
      	return this.toInt().zeroPad(zeros);
      }
    });
    
    // usage
    $('myInput').get('value').zeroPad(3).doSomething();

### Side by Side:    

    doSomething(zeroPad(document.getElementById('myInput').value, 3));
    // vs
    $('myInput').get('value').zeroPad(3).doSomething();

Awesome? Yes. You can do the same thing to:

* [Array](http://mootools.net/docs/core/Native/Array)
* [Function](http://mootools.net/docs/core/Native/Function)
* [Number](http://mootools.net/docs/core/Native/Number)
* [String](http://mootools.net/docs/core/Native/String)
* [Hash](http://mootools.net/docs/core/Native/Hash)

Some say extending natives is a bad idea.  Personally, I think it's awesome--but this topic is a sore spot for some.  Extending natives is a feature of javascript itself that any general application framework like MooTools is entitled to use.  There could be an entire article dedicated to this topic but this article isn't it.  This article is simply here to show how to use this handy feature.

### Flippin' Sweet Array methods

Arian Stolwijk created this amazing gem: [Array.Math](http://mootools.net/forge/p/array_math).  Code samples often tell the story faster:

    [2,5,1,6].sum(); // 14
    [2,5,6,2].product(3); // [6,15,18,6]
    [9,12,15].quotient(3) // [3,4,5]

This is all made possible by extending the `Array` native, see?

		Array.implement({
	
			sum: function(start,length){
				var sum = 0, 
					start = start ? start : 0,
					length = length ? length : this.count()-start;
				length = start ? length + 2 : length;
				for(var i=start;i&lt;length;i++) sum += this[i];
				return sum;
			},
	
			product: function(p){
				var arr = $type(p) == 'array';
				return this.map(function(entity,i){
					return arr ? (entity * p[i]) : (entity * p);
				});
			},
	
			quotient: function(q){
				var arr = $type(q) == 'array';
				return this.map(function(entity,i){
					return arr ? (entity / q[i]) : (entity / q);
				});
			},
			
			// and a whole lot more awesome ...
			
		});

### Quick Tips

*     `this` is the number or string, or whatever, when inside the method.
*     Return something that makes sense (usually `this`).
*     You can implement several methods all in the same code block.

This is just one more great tool to help keep your code organized and readable.
