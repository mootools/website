---
title: "Optimizing MooTools builds sans Internet Explorer"
date: "Mon, 13 Aug 2012 18:32:08 +0000"
author: "Arian Stolwijk"
tags: "all"
permalink: "2012/08/13/optimizing-mootools-builds-sans-internet-explorer/"

---
Since the very beginning of MooTools you can only pick the right components that you need with the MooTools [Download](http://mootools.net/core/) Builder, to ensure there are no useless bytes going through the wires. But this means you still download browser-specific code. What if you could optimize the code further by removing unnecessary browser-specific code?

The good news is, you can optimize MooTools builds to remove specific (IE) code! [Packager](http://github.com/kamicane/packager) has been used to concatenate builds since MooTools 1.3. Removing certain code blocks, like MooTools 1.2. compatibility or specific IE code is one of the features of Packager. Lets see how it works. We begin with downloading Packager.

<!--more-->

**Note**: the commands are tested on Ubuntu, and probably work fine on a Mac too. However some details might be different on a Windows machine.

### Getting Packager

Packager is available on [GitHub](http://github.com/kamicane/packager), and can be pulled with git:

    ~/$ git clone https://github.com/kamicane/packager.git

or downloaded [directly](https://github.com/kamicane/packager/zipball/master).

To test if Packager is set up correctly, open a terminal window, cd to the packager folder and type ./packager --help. If this doesn't work you might need to install PHP first because Packager is written in PHP.

    ~/$ cd packager
    ~/packager$ ./packager --help

It's a good idea to add an alias in your ~/.bashrc file or create a symbolic link to /usr/local/bin so you can just type:

    $ packager --help

### Getting MooTools Core

The second thing we have to do is to get the source code of MooTools Core. It doesn't need to be placed in the same folder as Packager. MooTools Core can be pulled with git:

    ~/$ git clone https://github.com/mootools/mootools-core.git

Unless you like to use the cutting edge, you probably should checkout the latest tag, at the moment of writing 1.4.5 to use a stable release:

    ~/$ cd mootools-core
    ~/mootools-core$ git checkout 1.4.5   

or you can download the latest version from [the GitHub download page](https://github.com/mootools/mootools-core/tags).

### Registering MooTools

Once we have pulled the MooTools code, we need to register it. Registering a package is done with the packager register command:

    ~/mootools-core$ packager register .

If everything is correct, the terminal should output some text saying something like *the package Core has been registered*.

At this point we can create various MooTools Core builds, depending on your needs. Lets look at some examples.

### Building MooTools

In the previous step we have registered MooTools Core as *Core*, all MooTools Core components are now under the *Core* package. Wherever you are, you can build a MooTools build. An example of building the DOMReady component from the Core package would be as follows:

    $ packager build Core/DOMReady

To build all components, the * wildcard can be used:

    $ packager build Core/*
    $ packager build Core/* > core.js

The *>* redirects the output to save to a file.

### Optimizing MooTools filesize

To exclude certain blocks, we can use the `-blocks` option. This is an command that removes most Internet Explorer 8 or lower specific code:

    $ packager build Core/* -blocks IE '!ES5' ltIE9 ltIE8

Note that the `!ES5` is in single quotes because otherwise the terminal would interpret the `!` as some other command.

As you can see there are several block types. Here's a list of all the block types and what they're used for. 

* **1.2compat** this is the MooTools 1.2 compatibility layer for old scripts that use MooTools 1.2
* **1.3compat** for API changes between 1.3 and 1.4
* **!ES5** this adds ECMAScript 5 methods, like `Array.prototype.{forEach, map, every}`
* **!ES5-bind** if it should include `Function.prototype.bind`. This method wasn't natively available before Safari 5.1.4.
* **IE** used for all Internet Explorer versions (may include IE9)
* **ltIE9** IE8 IE7 and IE6
* **ltIE8** IE7 and IE8
* **ltFF4** code for old FireFox browsers (only for `set('html')` and table elements)
* **webkit** code for webkit (currently a button type property bug)

In the code the blocks are defined as something like `/*<IE>*/ … code … /*</IE>*/`, so you could checkout the the code for more details, and decide whether you need it or not:

### Real Life Test Case

What if we want to build an application for modern browsers only? We start it from scratch so we don't need compatibility code and we like to use MooTools Class and Element for the basic stuff, and use an external library [moofx](https://github.com/kamicane/moofx) for CSS3 animations. To initialize everything we also need DOMReady.

The packager command would look like:

    $ packager build Core/Class \
                   Core/Class.Extras \
                   Core/Element \
                   Core/Element.Event \
                   Core/DOMReady \
            -blocks 1.2compat 1.3compat '!ES5' '!ES5-bind' \
                IE ltIE9 ltIE8 firefox ltFF4 webkit > core.js

From GitHub we have downloaded a moofx build which is in moofx.min.js. We can simply append this file to the freshly built MooTools build:

    $ cat moofx.min.js >> core.js

Moofx has a MooTools adapter, from the README:

    Element.implement('animate', function(){
        var moo = moofx(this);
        moo.animate.apply(moo, arguments);
        return this;
    });

This code is saved in moofx.mootools-adapter.js, and can be appended to core.js as well:

    $ cat moofx.mootools-adapter.js >> core.js

At this point we have all our code we need, and nothing too much. However the MooTools Core Builder on the MooTools website has a compress option. We can do this with several tools like [YUI Compressor](http://yuilibrary.com/projects/yuicompressor/), [UglifyJS](https://github.com/mishoo/UglifyJS/) or [Closure Compiler](https://developers.google.com/closure/compiler/). It's outside the scope of this post to explain the exact differences and how you would use them. For now lets just use uglifyjs for our final build step:

    $ uglifyjs core.js > core-min.js

No one really likes to do a lot of typing, so you might want to combine the commands in a simple bash script, a Makefile or whatever build system you might be using already. The script in this [Gist](https://gist.github.com/3201540) pulls and builds everything for me.

### Beyond Packager

Packager is great for building MooTools Core and MooTools More and many other projects. A great deal of projects on the MooTools Forge are also compatible with Packager. Unfortunately Packager is written in PHP and is actually only compatible with MooTools projects. Since the creation of Packager for MooTools 1.3, the the JavaScript community has (finally) picked up the idea of writing modules and separate components, but has chosen for CommonJS(-like) modules in Node.JS or AMD modules. In my Gist I also use an Packager alternative: [WrapUp](https://github.com/kamicane/wrapup). WrapUp is a tool like Packager but runs on Node.JS and supports CommonJS-like modules. Writing CommonJS/AMD modules has some sweet advantages which are outside the scope of this post, but you should definitely checkout WrapUp. For now, Packager does a great job by removing unnecessary code and picking the right components. Customize your MooTools builds and get a smaller filesize!