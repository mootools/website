---
title: "More Than Meets the Eye: Form.Request"
date: "Thu, 04 Mar 2010 22:06:11 +0000"
author: "Aaron Newton"
tags: "all"
permalink: "2010/03/04/more-than-meets-the-eye/"

---
[MooTools More](/more) features a diverse, powerful collection of Classes (60 plugins!!) and some are my favorite tools that I use over and over again. I thought I'd take some time to dig into some of the plugins in MooTools More that I think are interesting and really useful that maybe you haven't had time to really sink your teeth into (or, perhaps, you haven't found a reason to). So I'm going to take some time to talk about some of the plugins in More each month, sharing not only how they work, but how they work together and maybe even why you'd use them. Today I'm going to talk about the <code>[Form.Request](/docs/more/Forms/Form.Request)</code> plugin.

### Request and Request.HTML

MooTools Core ships with three AJAX modules, two of which include element methods (<code>Request.JSON</code>, the third module, doesn't alter the Element prototype). *[Request.js](/docs/core/Request/Request)* provides the Element prototype with a <code>[send](/docs/core/Request/Request#Element:send)</code> method that lets you post a form (as in, <code>$('myFormElement').send([request options go here])</code>), and *[Request.HTML.js](/docs/core/Request/Request.HTML)* provides the Element prototype with a <code>[load](/docs/core/Request/Request.HTML#Element:load)</code> method that lets you replace the contents of any DOM element with text returned from a server request (as in <code>$('myElement').load([request options go here])</code>). I use these fairly often, though I probably use the <code>Request</code> and <code>Request.HTML</code> constructors just as much if not more. But in my own work I found myself needing the combination of these two things; I want to submit the form *and* load the response into a DOM element. Turns out, I do this all the time.

Part of writing idiomatic MooTools code is encapsulating functionality into Classes. As I've [posted](http://www.clientcide.com/best-practices/jquery-and-the-ajax-experience-programming-to-the-pattern-and-what-really-makes-one-framework-different-from-another/) [before](http://clientcide.com/best-practices/thoughts-on-coding-and-new-classes-as-a-result/), I do this with almost all the code that I write. The only code that I author that isn't a class (or a static object) is a DomReady statement that instantiates classes. So when I have a pattern as clear as this - submitting a form and updating the DOM with the response - it's time to write a class.

### Form.Request

<code>Form.Request</code>, unlike <code>Request.HTML</code>, is not an extension of the <code>Request</code> class (that's why it's not <code>Request.Form</code>). Because it is not a <code>Request.HTML</code> instance, it has a reference to an instance of <code>Request</code> in it. <code>Form.Request</code>'s options include a <code>requestOptions</code> object that gets passed along to this instance so you can configure it however you like. By default, <code>Form.Request</code> derives as much as it can from the form element itself. It gets its URL from the action property and the method from the method property. The user submits the form and it cancels the submit event. <code>Form.Request</code> inspects that event to see if the user clicked a button and, if so, sends the name/value of that button along with the data like a regular form submission. Finally, it provides an <code>extraData</code> option so you an send along key/values with the form in addition to those in the inputs that the user fills out.

When the form returns a response, it handles it pretty much how <code>Request.HTML</code> handles any other response. It injects the HTML and evaluates any scripts in the response (this is an option, too).

And what about what we set out to do? To provide a method for Element that is the combo of <code>load</code> and <code>send</code>? The plugin provides the Element prototype with a <code>formUpdate</code> method that works just like those two methods combined (as in <code>$('myForm').formUpdate({ update: $('myTarget') })</code>, which sends the form and updates <code>$('myTarget')</code>).

### Demo Time!

Here's a simple demo to play with. Note how our html is plain old vanilla web 1.0 form stuff. Nothing fancy. And our JavaScript is dead simple (to get the default behavior).

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/F3t8G/embedded/"></iframe>

### Getting Fancy

Hmmm. Well, our behavior here leaves a little to be desired. The main thing that seems to be missing is any indication that something is changing - that the form has been submitted and we're waiting for a response from the server (MooShell provides a 2 second delay on the response to simulate normal web latency). We could add an event to our instance to tell the user that something is going on, like so:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/QVpGD/embedded/"></iframe>

### Getting Fancier

Here's where the fact that this plugin is part of MooTools More comes into play. MooTools More includes a plugin called <code>[Spinner](/docs/more/Interface/Spinner)</code>. I'll talk about it in depth some other time, but in a nutshell, it puts an Ajax indicator over an element that's being updated. It integrates with <code>Request.HTML</code> and <code>Form.Request</code> configures it for us. This happens automatically (unless you disable it in the options) and all we have to do is skin it. In this example, I've moved our message (that we're sending the submission) into the <code>Spinner</code> options.


<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/mTnnV/embedded/"></iframe>

This magic happens without much effort for us so long as we have *Spinner.js* in our page. This is the default behavior. We don't even have to specify the message text if we're content with just the spinner image.

### Even More Integration

One other thing <code>Form.Request</code> integrates with (also in the MooTools More library, naturally) is <code>[Form.Validator](/docs/more/Forms/Form.Validator)</code>. That's another plugin I'm not going to spend a ton of time describing in today's post - we'll save it for a later post as it has lots of nifty things in it. But, basically, <code>Form.Validator</code> (and its subclasses) provide instructions for users who are filling out a form on the fly. <code>Form.Request</code> integrates with it so that you don't have to do anything to make them play nice together. Both intercept the submit event and both prevent its default behavior (i.e. sending the form), except that the <code>Form.Validator</code> class only stops it if the form is invalid. If <code>Form.Request</code> didn't respect this privilege, it would send our form even if the <code>Form.Validator</code> stopped the default submission event. To get them to cooperate, all you have to do is create an instance of <code>Form.Validator</code> on the form. Example:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/9YRZV/embedded/"></iframe>

In this example, we set a minLength value for our form (50 characters). The default html in the textarea is only about 45 characters, so if you just hit submit you'll see a red error message show up. Add some more text to our example, hit submit, and the error winks out and our form sends just as before.

### Appending Results

One last trick up our sleeves here; you can append results instead of overwriting the contents of our target. Think of a to-do list kind of interface, where adding a value adds a new item to a list. To get this behavior, we just substitute <code>[Form.Request.Append](/docs/more/Forms/Form.Request.Append)</code> into our example. There are some additional options; by default it uses another MooTools More plugin, <code>[Fx.Reveal](/docs/more/Fx/Fx.Reveal)</code>, to smoothly transition elements into view. You can also specify if the item is appended to the top or the bottom of the container. Example:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/9YRZV/1/embedded/"></iframe>

### THEND

So that pretty much covers <code>Form.Request</code>. I hope you find it as useful as I do. If you find it useful and fun, post a link in the comments showing off what you've done with it. In my next post I'll pick another plugin (or plugins) to dig into and show off their capabilities. If there's one you'd like to learn more about, post a suggestion for my next post in the comments.

*Aaron Newton is a contributor to MooTools and the principal developer of MooTools More. He is the author of the book __MooTools Essentials__ as well as the [Mootorial](http://mootorial.com) online MooTools tutorial. He posts (rarely these days) at his blog [Clientcide.com](http://clientcide.com) and (much more often) on Twitter as [anutron](http://twitter.com/anutron).*