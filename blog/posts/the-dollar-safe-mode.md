---
title: "The Dollar Safe Mode"
date: "Mon, 22 Jun 2009 15:39:51 +0000"
author: "Valerio Proietti"
tags: "all,tips"
permalink: "2009/06/22/the-dollar-safe-mode/"

---
Since the dawn of time, MooTools used a method named `$` to get an HTML element by it's id or direct reference. This method name, being the coolest and shortest you can find in JavaScript, is also used by a number of other javascript frameworks and libraries for similar functionality. Now, we do not think including 2 libraries or frameworks is OK. It's not. *Never*. It's an overhead of duplication you do not want to have. However, you might not have the full control of the page in some circumstances, and we recognize that. That's why we implemented this: **Dollar Safe Mode**™. It's nothing special really, but it should help in those situations where including multiple libraries is not your choice (because if it is, quite frankly, you're doing everything wrong. Pick one, will you? And make sure it's MooTools :-)).

MooTools 1.2.3 *DOM* stuff doesn't depend on the presence of `$` anymore. The method that used to be `$` is now called `document.id` (short for identify). The method `$` is still assigned when not already present in the page, and aliased to `document.id`.

But let me show you how it works:

Let's say you have mootools.js and a fictional JS library called jLib.js. Both use a method called `$`.

#### This is what it used to happen:

##### Scenario 1: Include mootools first:

	<script type="text/javascript" src="mootools.js" />
	<script type="text/javascript" src="jLib.js" />

jLib would "steal" the `$` method from MooTools. MooTools doesn't work unless jLib has some sort of no-conflict mode of its own that will allow you to prevent it from "stealing" `$` from MooTools.

##### Scenario 2: Include jLib first:

	<script type="text/javascript" src="jLib.js" />
	<script type="text/javascript" src="mootools.js" />

MooTools would "steal" the `$` method from jLib, which may or may not work without it.

#### What happens now:

Scenario 1: Include MooTools first:

	<script type="text/javascript" src="mootools.js" />
	<script type="text/javascript" src="jLib.js" />

MooTools checks if a method called `$` exists; if not, it defines it. In this scenario, MooTools defines it as it doesn't find anything named `$`, being included first.
jLib "steals" the `$` method from MooTools.
MooTools doesn't care. MooTools now doesnt need `$` to properly function. You can regain control of `$` simply by reassigning it to its alias (`$ = document.id`).

Scenario 2: Include jLib first:

	<script type="text/javascript" src="jLib.js" />
	<script type="text/javascript" src="mootools.js" />

MooTools checks if a method called `$` exists. It does find it, being included last, therefore it doesn't define it. You can directly use `document.id()` or assign your own var to it, or manually assign `$` to `document.id`, if you would like MooTools to have control of it.

As you can see, it's pretty straightforward. In short, MooTools doesn't need `$` to function anymore, and doesn't steal it from other frameworks when included after them.

#### Plugins

The above applies for MooTools-Core and MooTools-More. However, MooTools plugins use the `$` method, therefore, while not breaking MooTools by including jLib, you will break the MooTools plugins. If you desperately need plugins to be multiple-framework compatible, and you the other frameworks to have control of `$`, there are a few things you can do.

The first, most obvious and recommended option is to replace every call to `$()` with `document.id()` by hand. It doesn't take more than 10 seconds with a simple find and replace. This is probably what plugin authors should do, if they wish their plugin to be dollar-safe.

Another option is to encapsulate the plugin using a closure. This might come handy if you are processing a plugin that isn't yours:

	var X = new Class({
		initialize: function(element){
			this.element = $(element);
		}
	});
	
it should become:

	(function(){
	
		var $ = document.id;

		this.X = new Class({
			initialize: function(element){
				this.element = $(element);
			}
		});
	
	})();

As you can see, we've simply assigned `$` as a local variable, using a closure. Everything in that closure will use `document.id` as its `$` method. Remember to export the global variables though, as vars defined in the closure will stay private. I like to export globals using `this.`, but you can use `window.` as well.

Please note that MooTools will probably remain incompatible with other frameworks that modify native prototypes, as there will probably be more name clashes. This isn't a cross-framework compatible MooTools version by any means, nor does it want to be. The whole point is not to "steal" the dollar function from other libraries.

And that's pretty much it about the **Dollar Safe Mode**™ in MooTools 1.2.3.