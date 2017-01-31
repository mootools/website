---
title: "A Magical Journey into the Base Fx Class "
date: "Tue, 18 May 2010 16:46:10 +0000"
author: "Ryan Florence"
tags: "all"
permalink: "2010/05/18/a-magical-journey-into-the-base-fx-class/"

---
### Fx is not just for animating elements

In a [recent project](http://www.capitaloneventure.com) I worked on with Thomas Aylott the page did some calculations and displayed the result after the user pulled some sliders around.  Rather than just change the text from one number to another, the element would increment the number before the user's very eyes.  With a fun interface like that, they had no choice but to apply for a new credit card right then.

Admittedly, I may not have thought to extend Fx to do something like that.  After all, the first line of the docs for Fx is: "This Class will rarely be used on its own, ..."  My first thought would be to use a periodical with a counter and then set the text until the counter was done.  But Thomas extended Fx instead.  Though it's the base class for all animations (tween, morph, scroller, etc.) its methods can be used for all sorts of abstract "animations."

For this article I've just come up with a few potentially useful extensions of Fx to get the idea across that you can use it for more than just element animations.

### How Fx Works

Essentially Fx just calculates a sequence of values between two numbers.  The options kick in to make those values more interesting.  This class, Fx.Log, simply updates the text of an element every step of the effect.  Notice that this class is essentially the base Fx class except for the tiny set method.

<iframe style="width: 100%; height: 340px" src="http://jsfiddle.net/rpflorence/xkBSW/embedded/"></iframe>

Here's another demo that visualizes all the visible options of Fx.  After you draw the effect, hover the dots to see the exact value calculated (or view source and see them all together.)  Playing around with this demo might tell you more about how Fx works than anything else out there.

<iframe style="width: 100%; height: 550px" src="http://jsfiddle.net/rpflorence/xjJu8/3/embedded/"></iframe>

### Fx.Diff

By default, Fx uses 50 fps.  So every second it'll kick out 50 different values and fire the set method 50 different times.  For the next few demos I only wanted to do something if the rounded value is different than the last rounded value, so I came up with `Fx.Diff`.  If the value is different, it'll call the render method.

    Fx.Diff = new Class({
      
    	Extends: Fx,
    	count: 0,
    	render: $empty,
    	
    	set: function(now){
    		now = now.round();
    		var diff = now - this.count;
    		if (diff) {
    			this.render(diff, now);
    			this.count += diff;
    		}
    		return this;
    	}
    	
    });

### Fx.Count

Since this appears to be no different than the very first demo, we'll just look at the code.  Note, the difference is that the first counting demo would change the text in the element every single frame (50 times a second), but this code would only change it if the new rounded value is different from the last.

    Fx.Count = new Class({
	
    	Extends: Fx.Diff,
    	
    	initialize: function(element, options){
    		this.element = document.id(element);
    		this.parent(options);
    	},
	
    	render: function(){
    		this.element.set('text', this.count);
    		return this;
    	}
    	
    });

### Fx.Typewriter

I can actually see myself using this one somewhere:

<iframe style="width: 100%; height: 500px" src="http://jsfiddle.net/rpflorence/2xcUu/1/embedded/"></iframe>

Notice that Fx.Typewriter overwrites the `start` method of Fx.  The Fx start method takes two arguments, `from` and `to`.  The usage for Fx.Typewriter is to simply pass in a string of text like so: `myFx.start('A whole bunch of text')`.  This new method knows the `from` argument is always 0, splits up the text into an array (one item per character) and then uses that length as the `to` argument.  After that logic is done, it simply calls the parent start method.  Then  the `render` method takes over by figuring out how many characters to display, filtering out the tail end of the array, joining what matters, and finally setting the text of our element.

### Fx.Text

There's a very creative effect called [Fx.Text on the forge](/forge/p/fx_text).  It's an animated text replacement effect.  I think it's really cool and does a great job of extending Fx.

### Fx.Cornify

This next script is far too magical to simply show you the code.  You'll need to view the source for this beauty.

<form id="cornifyOptions">
	<p>
		How many? (caution, start with low numbers) <input id="amount" type="text" value="10">
	</p>
	<p>
		Duration: <input type="text" id="duration" value="10000">
	</p>
	<p>
	<input type="submit" value="Cornify!"> <span id="bePatient"></span>
	</p>
</form>


<script type="text/javascript"><!--
Fx.Diff = new Class({
	
	Extends: Fx,
	
	count: 0,
	render: $empty,
	
	set: function(now){
		now = now.round();
		var diff = now - this.count;
		if (diff) {
			this.render(diff, now);
			this.count += diff;
		}
		return this;
	}

});

Fx.Cornify = new Class({
	
	Extends: Fx.Diff,

	initialize: function(options){
		this.loaded = false;
		new Element('script', { 
			src: 'http://www.cornify.com/js/cornify.js'
		}).inject($(document.body));

		this.addEvent('start',function(){
			if (!this.iFrame) {
				this.iFrame = new Element('iframe', {
					src: 'http://www.soundclick.com/player/single_player.cfm?songid=721192&cache=3&q=hi&shuffle=false',
					width: 1,
					height: 1,
					frameborder: 0,
					styles: {
						width: 0,
						height: 0
					}
				}).inject($(document.body))	
			}
		}.bind(this));

		this.parent(options);
	},
	
	start: function(amount){
		this.parent(0, amount);
		return this;
	},
	
	render: function(){
		cornify_add();
	}

});

var myCornify;
window.addEvent('domready',function(){
	
	myCornify = new Fx.Cornify();

	$('cornifyOptions').addEvent('submit', function(event){
		event.stop();
		window.scrollTo(0,0);
		myCornify.options.duration = $('duration').value.toInt();
		myCornify.start($('amount').value.toInt());
		$('bePatient').set('text', 'Be patient!');
	});

});
// --></script>

*Ryan Florence is a MooTools enthusiast and contributor.  He maintains his JavaScript focused [blog](http://ryanflorence.com), [MooDocs.net](http://moodocs.net), and [moo4q](http://moo4q.com).  Follow him on [twitter](http://twitter.com/ryanflorence) or checkout his plugins on the [Forge](/forge/profile/rpflo).*