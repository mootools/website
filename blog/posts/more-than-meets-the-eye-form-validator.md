---
title: "More than Meets the Eye: Form Validator"
date: "Fri, 30 Apr 2010 20:09:03 +0000"
author: "Aaron Newton"
tags: "features,tips"
permalink: "2010/04/30/more-than-meets-the-eye-form-validator/"

---
Continuing with my "More than Meets the Eye" series, today I want to talk to you about the [MooTools More `Form.Validator`](/docs/more/Forms/Form.Validator). There was a comment left on my [last post in this series (about `Form.Request`)](/blog/2010/03/04/more-than-meets-the-eye/) specifically requesting that I cover this relatively complex plugin that's useful for telling users about the validity of data they enter into forms before they send them.

### Getting Started with Validators

The main class you need to concern yourself with is the `Form.Valdiator` class itself which provides methods that apply specific rules to inputs to see if they are valid. You can then choose how you want to inform your users that they need to address these problems, but that's not the job to `Form.Validator` (though it is the job of `Form.Validator.Inline`, which we'll cover in a bit).

Let's talk little bit about the rules that are applied. Form.Validator allows you to define rules that test the state of an input and return `true` or `false` - `true` if the input passes the validation rule, and `false` if it doesn't. Here's a simple example:

	Form.Validator.add('doesNotContainTheLetterQ', {
			errorMsg: 'This field cannot contain the letter Q!',
			test: function(field){
					return !field.get('value').test(/q/,'i');
			}
	});

The above code adds a global validator that allows you to assert that the input doesn't use the letter Q. The arguments are the validators' key and then an object that contains an error message to show the user should they encounter the error, and a function that is passed the input as an argument. This function inspects the value or, really, anything you like, and then returns `true` or `false`.

The key you give your validator is important. At any time you can validate a field against any validator by using this key as a reference by doing:

	myFormValidator.test(key, input[, warnOnly]);

The first two arguments are the important ones here; the key of your validator and the input to test. Where things get interesting are when `Form.Validator` does this for you. By giving your input that key as a css class name, you tell `Form.Validator` to validate that field with this validator. In this manner you can quickly and unobtrusively decorate your inputs with the requirements and validate the form. If something goes wrong with your JavaScript, your form will submit as normal. Here's a really simple example:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/6RUpY/embedded/"></iframe>

The alerts aren't pretty, but you can see how our validator is now applied when you submit the form.

Form.Validator ships with [several validators listed in the documentation](/docs/more/Forms/Form.Validator#Validators). These include simple stuff like `required` that just validates that the user put something - anything - in the input. But there are also validators for email addresses, only letters, dates, urls, etc. The key is you can write your own - you don't need to wait for us to release something for you to make use of it. There are an extended list of validators in [`Form.Validator.Extras`](/docs/more/Forms/Form.Validator.Extras) that include some edge cases. Things like validating that two inputs have the same value (like an email verification for example). 

### Using Validators with Arguments

It's also possible to configure validators with data unique to the input. For example, let's say you want to have an input with a minimum length validator - the user must type in at least 5 characters. You could write a validator called `minimum5` or whatever, but then you'd have to duplicate it for any other character length. For this purpose, Form.Validator allows you to assign values to the input, like so:

	<input type="text" name="username" class="minLength:10" id="username"/>

These values - the 10 and 100 values in the example above - get passed along as JSON decoded values to the validator. Here's what that looks like:

	Form.Validator.add('minLength', {
		errorMsg: function(element, props){
			return 'Please enter at least {minLength} characters (you entered {length} characters).'.substitute({minLength:props.minLength,length:element.get('value').length });
		},
		test: function(element, props){
			if (props.minLength != null) return (element.get('value').length >= props.minLength;
			else return true;
		}
	});

As you can see, the error message (which in our previous validator was just a string - the message) can also be a function which is passed the input and then any properties defined in the HTML. The fact that the message can be a function allows you to include information not only about how the validator is configured but also other information, like some aspect of the value the user actually entered. The test is also passed along these p roperties of course which allows you to make the properties a condition of the test. We could, in theory, rewrite our `doesNotContainTheLetterQ` validator to accept an argument about the character (or, better yet, characters) that we want to disallow:

	Form.Validator.add('doesNotContain', {
		errorMsg: function(field, props){
			return 'The value you input cannot contain any of the following letters: ' + props.doesNotContain;
		},
		test: function(field, props){
			if (props.doesNotContain)
				return !field.get('value').match(new RegExp('[' + props.doesNotContain + ']', 'i'));
			else return true;
		}
	});

Note that the properties defined have to be JSON decodable, so you can't have your input like this:

	<input type="text" class="doesNotContain:qz"/>

Instead you'd have to quote the string:

	<input type="text" class="doesNotContain:'qz'"/>

Here's our example:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/8DCK8/embedded/"></iframe>

The base `Form.Validator` class comes with a plethora of options and events. You can configure it to validate inputs whenever they change (on blur), or to only show one error at a time (serial). You can tell it to ignore hidden fields (those that are not visible, there's no point in validating inputs with type="hidden") and disabled inputs. There are numerous useful methods that let you run the entire validation routine on the form (`.validate()`), reset all the errors (`.reset()`) or validate / reset a specific field (`.validateField()` and `.resetField()`). You can pause the validator and resume it (`.stop()` and `.start()`) as well as ignore / un-ignore a specific field (`.ignoreField()` and `.enforceField()`) and more. There's even an element method that lets you validate a form (`Element.prototype.validate`).

### Form.Validator.Inline - the "Pretty" One

Now that we've covered the basics of how `Form.Validator` works, let's consider the fact that our examples so far have been rather ugly (who wants alert messages?). MooTools More ships with a default implementation that smoothly displays messages inline, right after the input: [`Form.Validator.Inline`](/docs/more/Forms/Form.Validator.Inline). This class is the "pretty" version of `Form.Validator` but don't think of it as the only game in town. You can easily implement your own "pretty" version without a lot of effort. If you want to put errors in a popup or fade them in over the entire screen or play a sound it doesn't matter. The base `Form.Validator` class is there for you.

Looking at the `Form.Validator.Inline` implementation, you'll find all the same options and methods from `Form.Validator` along with a few extras that control how your messages appear. For instance, by default, the validation rules show up immediately after the input. This requires a bit of forethought in how you structure your HTML. If your input is inline with something else (like a submit button), validation errors are going to change that when they appear (because they are divs, which by default are block level elements).

The only real option that `Form.Validator.Inline` has to offer is whether or not to scroll to errors (useful if your form is long and will likely cause the user to scroll to the submit button). Here's a simple example, building on our previous one:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/LGqut/embedded/"></iframe>

As you can see, the error message slides in, but it breaks our layout a bit. Let's do some CSS work to make this look a little nicer.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/CT6A7/embedded/"></iframe>

It's not The Sistine Chapel but it does look nicer. Our error doesn't appear to break our layout anymore either.

As a final example, I'll show you a version that extends `Form.Validator.Inline` to put the validation messages in tips that popup pointing at the input. Here's a demo:

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/w00fz/6E2Lg/embedded/"></iframe>

If you want you can [check out the source on github](http://github.com/anutron/clientcide/blob/master/Source/Forms/Form.Validator.Tips.js) and [download it with its dependencies on Clientcide](http://clientcide.com/js).

### Go Forth and Validate

Overall the purpose of `Form.Validator` is not to be the only solution for displaying validation messages to your users, but rather a flexible solution for client side form validation on which to build. You can extend it and manipulate it to display messages in any way you choose - and you should!. The default "pretty" implementation - `Form.Validator.Inline` - is just one way to use the class. In my opinion `Form.Validator` is one of the classes in MooTools More that shows off the power of MooTools' object oriented design, allowing for a great deal of flexibility and reuse.

Thanks to [Lloyd for suggesting this edition's topic](/blog/2010/03/04/more-than-meets-the-eye/#comment-908). If there's a plugin in MooTools More you'd like me to focus on next time, by all means, make a suggestion in the comments.

*Aaron Newton is a contributor to MooTools and the principal developer of MooTools More. He is the author of the book __MooTools Essentials__ as well as the [Mootorial](http://mootorial.com) online MooTools tutorial. He posts (rarely these days) at his blog [Clientcide.com](http://clientcide.com) and (much more often) on Twitter as [anutron](http://twitter.com/anutron). He works for [Cloudera](http://www.cloudera.com), (which is hiring, by the way).*