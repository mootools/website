---
title: "Selectors on fire: a tale of pseudoselectors"
date: "Mon, 11 Jun 2007 19:02:38 +0000"
author: "Valerio Proietti"
tags: "all"
permalink: "2007/06/11/selectors-on-fire-a-tale-of-pseudoselectors/"

---
![slickspeed](http://blog.mootools.net/assets/2007/6/11/slickspeed.png)
During the last few days, we've added some nifty CSS3 selectors to the trunk. Continue reading to know what this is all about, or try [SlickSpeed](http://mootools.net/slickspeed) now!

UPDATE: SlickSpeed can now be [downloaded from googlecode](http://code.google.com/p/slickspeed/source).

<!--more-->

####The Beginning of a New Era

Ok, so the last couple of days were very productive ones.

I started adding the CSS3 adjacency selectors, like ~, &gt; and +.  It was quite an easy task which didn't require much logic changing, and I was able to implement and get it running across all browsers in (a little more than) a few hours.

This allows us to select direct children, following siblings and the direct following sibling.
So let's add these to the supported selectors:

//all spans immediately preceded by a div
$$('div + span');

//all the following sibling of divs, that also happens to be spans
$$('div ~ span');

//all the direct children of all divs with tag == span
$$('div &gt; span');

And the easy part was done. Now the hard part was left, which is what this article is all about: the famous pseudo selectors.

####Zebra Tables For the Winners

Pseudo selectors are little known in the world of CSS because of the lack of browser support. From what I understand, Opera is the only browser supporting pseudo selectors at all, and even its support is limited.

So I started by implement :nth-child, rigorously following the [W3C specs](http://www.w3.org/TR/css3-selectors/), so we could compete in the [zebra table showdown](http://jquery.com/blog/2006/10/18/zebra-table-showdown/).

The tricky part was mostly 2n+1, because I had to understand what the heck it was all about. Lucky for me, I had all the supporting devs in the channel who are apparently better with specs (and math) than myself.

Hours later, I had the first working version of nth-child, along with the very similar :odd, :even, :last-child and :first-child, that luckily shared the same logic.

So we can also add these to the supported css selectors:

////every odd (1st 3rd 5th 7th ... 13th) li inside an ul
$$('ul li:nth-child(2n+1)'); //same as
$$('ul li:nth-child(odd)'); //same as
$$('ul li:odd');

//every even (2nd 4th 6th ... 12th ...) li inside an ul, starting from the second
$$('ul li:nth-child(2n)'); //same as
$$('ul li:nth-child(even)'); //same as
$$('ul li:even');

//every li which is the second child of an ul.
$$('ul li:nth-child(2)');

Obviously, other numbers are also supported in this format: "int"n+"int" or "int" or "int"n or "int"n-"int". Pretty sleek if you ask me.

Now that the big part of the work was done, I needed to get the rest of the CSS3 selectors in there.

####Getting the Rest of Them

Ok, this part was quite easy.  Since [Harald](http://digitarald.de) already coded a bunch of them in his branch a long time ago, it was just a matter of cleaning them up and testing across browsers.

And so I added :disabled, :enabled, :contains, :checked and :empty

The one that gave me nightmares was contains: it kept returning more results than the expected ones. I admit I also checked other libraries like Prototype or jQuery. Prototype doesn't support :contains, and jQuery returned the same wrong results as mine.

Something must have been wrong, very wrong.

With the help of the funny boys in the IRC channel, we defeated the enemy once again.  Without going into all the glorious details, an element contains some text only if it contains a textnode with that text; not if a child element contains the text. I tell you, this stuff challenges a man's patience.

Ok, so lets add these too to the list of the supported selectors:

//every div that contains a direct textnode with the text "ROSALIND"
$$('div:contains(ROSALIND)');

//every radio input that is checked.
$$('input[type=radio]:checked'); //same concept for disabled and enabled.

And I was done!! Or so I thought...

####Pseudos on Fire

Thats when I started noticing a bit of redundancy in the code. My inner perfectionism wouldn't let me go on knowing of this redundancy so I had to straighten things out.

I noticed redundancies especially in places like :disabled and :checked. Thats when I had this idea: lets make pseudo selectors default to attributes, so stuff like :checked and :disabled didn't have to be explicitly coded.

Now, any pseudo selector defaults to an attribute, if no pseudo selector is predefined. Lets make an example:

//every link with a title attribute
$$('a:title'); //the pseudo is not predefined, so it defaults to:
$$('a[title]');

//same concept here, but with a value too:
$$('a:title(mootools)'); //the pseudo is not predefined, so it defaults to:
$$('a[title=mootools]');

This obviously gives us some nice freedom of movement inside the huge reign of the DOM.

At this point, you're probably dying to know what in the world that header image is. NOT YET! Keep reading dude.

####Getting Control of the Pseudos

That's the point when most of you might think, "Ok, we have enough pseudoselectors!  We don't need any more!"  But, wouldn't it be nice if we gave users the ability to create their own, matching their own custom rules?

Time for a complete refactor on how the pseudoselectors are parsed!

Five hours later, all the pseudoselectors were written as custom pseudoselectors, all lined up in nice form inside a separate, optional file.

Now, everyone can write custom pseudoselectors for themselves!

Lets make a quick, stupid example:

Selectors.Pseudo.blue = {
xpath: function(){
return '[@class=blue]';
},
filter: function(el){
return (el.className == 'blue');
}
};

//usage
$$('div:blue'); //all the divs with className == blue!

So, as you can see its pretty straightforward. We write a rule for xpath browsers, and a filter for non-xpath browsers and voila', our new, shiny, breathing, custom pseudoselector is born.

There is obviously much more you can do with custom pseudoselectors, but lets keep it simple for today.

####OK, can you tell me about the header now?

The header is a screenshot of a selector testing suite we're going to release as opensource.
With all these many new selectors, a test suite was the easiest way to test the selectors in every browser, whether or not the browser included xpath.
The test suite is written in simple PHP and plain JavaScript. No framework is used in the suite JavaScript file, as the point of it is to test frameworks against each other.  This avoids favoritism. Also, each framework runs in its own iframe, so no prototyping conflicts can happen.

The html template for all frameworks is the same Andrew Dupont used in his DOM Selector speed tests.
His test was flawed though, as every framework was just included in the same page. This created prototypes conflict, so speed results were unreliable.

In the demo I tried to include the latest development version of the frameworks where possible.
Currently in the demo: [mootools](http://mootools.net), [prototype](http://prototypejs.org), [jquery](http://jquery.com), [ext](http://extjs.com/), [cssQuery](http://dean.edwards.name/my/cssQuery/) and [dojo](http://dojotoolkit.org/).

So welcome to the battle of the frameworks, and may the best win. Meet [SlickSpeed](http://mootools.net/slickspeed).

<del>P.S. We're gonna release SlickSpeed next week, as we need to add a few features.</del>
SlickSpeed can now be [downloaded from googlecode](http://code.google.com/p/slickspeed/source).

And thats all.