---
title: "Setting Up Elements"
date: "Fri, 11 Jun 2010 04:16:36 +0000"
author: "Sean McArthur"
tags: "all,tips"
permalink: "2010/06/10/setting-up-elements/"

---
Once you know [how much easier it is to get elements all around][1], you should take the time to learn how MooTools has provided a simple access API around the browser quirks for Elements. And on top of it, we've extended this API to things that you don't normally find on Elements. And as cool as it is, you can easily add your own bits with ease.

### Get Who? Set What?

On Elements, theres only 3 getters/setters that you need to worry yourself with: `get`/`set`, `getStyle`/`setStyle`, and `store/retrieve` (we'll ignore `getProperty` for now).

##### Get/Set

The most commonly used are [Element#get][2] and [Element#set][3]. They will first check the `Element.Properties` object to see if a specific getter/setter exists, before defaulting to [getProperty][4] or [setProperty][5]. So for instance, you can get the `href` of a link, or you can get the `text` of an element, which will get the node value in a cross browser fashion.

	<a id="myAnchor" href="/blog">Blog</a>
	<div>All my <span>text</span></div>

	$('myAnchor').get('href'); // '/blog'
	$('myDiv').get('text'); // 'All my text'

You can do as you would expect with the setters in the same way.

	$('myAnchor').set('title', 'MooTools Blog'); //sets title attribute
	$('myDiv').set('text', 'other text'); //sets the innerHTML

For now, let's just look at the other methods, and we'll take a look at how this works later so you can add to it yourself.

##### Setting with Style

The other commonly used pair of methods are [Element#getStyle][6] and [Element#setStyle][7]. These should hopefully be self explanatory. Their benefit is that they normalize certain styles the browsers are inconsistent about, such as opacity.

### Elemental Properties

Let's take a look at an example that MooTools itself defines. The `style` property is easier to remember and read than using `cssText`, so that's what MooTools does for us.

	Element.Properties.style = {

		set: function(style){
			this.style.cssText = style;
		},

		get: function(){
			return this.style.cssText;
		}
		
	};

Seeing how the `style` object is setup, you can easily create your own. Given a `Person` class, and the given HTML, we could decide it would beneficial to be able to get the instance of a Person from an element.

	<div class="person person_3">
		Sean
	</div>
	<p>Hello</p>

Say we were to want to get a `Person` instance when we have this element. We would define the property on Element.Properties.

	Element.Properties.person = {
		
		get: function() {
			var id = this.className.match(/person_(\d+)/)[1];
			if(id) return Person.getById(id);
		},
		
		set: function(person) {
			this
				.addClass('person')
				.addClass('person_'+person.id)
				.set('html', person.name);
		}
	};

Now we can use our familiar get and set methods.

	$('TestPerson').get('person'); // returns Person instance of ID 3.
	$('OtherTest').set('person', new Person('John')); //turns the paragraph into a person
	// <p class="person person_4">John</p>

### Let's just Store that

The third pair of methods that MooTools defines for elements is [Element#store][8] and [Element#retrieve][9]. _Woah woah woah. What? You're telling me you can `get` properties, and you can `retrieve` them? What the heck guys?_

Don't worry, it's pretty easy to know and understand the difference once I explain it. `get` and `set` are the most common methods, and default to element attributes, like I said. In many other places, such as when you use `el.get('tween')`, the MooTools teams made the getter call `retrieve` for you. You've been accessing it, without knowing it.

<blockquote><p>OK, great Sean. Why should I care how you give me the values?</p></blockquote>

I hear you. You see, most of the getters/setters are used to access attributes. But what happens you want to get at or set some other kind of property. What if you want to __set an actual object, or a function to the Element__. I guess you could JSON encode and create a custom attribute, but that's not good practice. And you lose out on any class info of the object, in case it was an instance of something. 

These methods also help with an issue that arises when you try to store something like an Event object or an instance of something else that refers to the Element in question. Certain browsers don't handle the circular references that well if you were to set `el.prop = { someEl: el }`. It can leave nasty memory leaks.

If you really want to know, behind the scenes, MooTools keeps a storage object that is totally separate from any element. Every element created gets assigned a unique id, and that id is used as a key on the storage object.

Regardless, you don't have to do anything special for store/retrieve to work. Using our above example, it would work like so:

	$('TestPerson').store('person', new Person('Sean'));
	$('TestPerson').retrieve('person'); //returns the exact same Person instance

These two common pairs of methods actually have a third method that relates to each of them, which allows the destruction of each respective data location. These methods are [Element#erase][10] and [Element#eliminate][11].

### Apply this yourself

This all sounds great, I'm sure. Now when you're writing your own classes and [plugins][12], you can be sure to use the pre-packaged properties. However, it's much more powerful when you can find a useful property to __add__ that relates to your own plugins.

_Sean McArthur is a software developer at Blazonco.com who is madly in love with MooTools. Most of his contributions involve sharing tips and information about MooTools (and programming in general) at his [blog][13] and on [Twitter][14]._

[1]: /blog/2010/03/19/a-better-way-to-use-elements/
[2]: /docs/core/Element/Element#Element:get
[3]: /docs/core/Element/Element#Element:set
[4]: /docs/core/Element/Element#Element:getProperty
[5]: /docs/core/Element/Element#Element:setProperty
[6]: /docs/core/Element/Element.Style#Element:getStyle
[7]: /docs/core/Element/Element.Style#Element:setStyle
[8]: /docs/core/Element/Element#Element:store
[9]: /docs/core/Element/Element#Element:retrieve
[10]: /docs/core/Element/Element#Element:erase
[11]: /docs/core/Element/Element#Element:eliminate
[12]: /forge
[13]: http://seanmonstar.com
[14]: http://twitter.com/seanmonstar