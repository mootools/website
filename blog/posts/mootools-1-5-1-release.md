---
title: "1.5.1 is out!"
date: "Fri, 29 Aug 2014 12:25:41 +0000"
author: "Sérgio Crisóstomo"
tags: "all,releases"
permalink: "2014/08/29/mootools-1-5-1-release/"

---
Today we release MooTools Core and More versions 1.5.1. This continues our improvement work for both Core and More and introduces also some features that were in the queue for being added. This release fixes also a regression related to the mousewheel event.    
When preparing the 1.5 release we decided that Core 1.5.x will work with More 1.5.x. This means that, inside the 1.5 space, versions should be compatible and you might be seeing Core or More releases that are not simultaneous. 

In 1.5.1 we added a new `dist/` folder in Core, present at the <a href="https://github.com/mootools/mootools-core/tree/1.5.1" title="dist folder" target="_blank">tagged commit</a>, for those who want the Core source, as well as a needed update so you can get MooTools via [Bower](http://bower.io/).

Worth a notice is also the new [MooTools Packager](https://github.com/ibolmo/grunt-mootools-packager). MooTools has always been about modularity, and for those of you that want to choose which modules to use you can now use the new MooTools Packager (for Node.js/Grunt), as well as the website builder. The new Packager allows to compile source files from the dependencies in the YAML header. You can find it on [GitHub](https://github.com/ibolmo/grunt-mootools-packager) and [NPM](https://www.npmjs.org/package/grunt-mootools-packager).

The main things in this release are:

#### Core:

* Mousewheel regression fix for Chrome and Firefox. (<a href="https://github.com/mootools/mootools-core/commit/20ed69135451d9c3c80784ea040d67375c943010" target="_blank">link</a>)
* DOMEvent's wheel property now listens for DOM3 wheel event also. (<a href="https://github.com/mootools/mootools-core/commit/20ed69135451d9c3c80784ea040d67375c943010" target="_blank">link</a>)
* IE8 iFrame leak fix. (<a href="https://github.com/mootools/mootools-core/commit/1d38828bbdea786390a386b8500b186cece2c8db" target="_blank">link</a>)
* Added postMessage to NativeEvents. (<a href="https://github.com/mootools/mootools-core/commit/e01fdc18aebb73ef48424415e94a3ef92486ead2" target="_blank">link</a>)
* Fixed setter so IE7/8 can set text of style element. (<a href="https://github.com/mootools/mootools-core/commit/d1dce0f25dbd69b14572fe264393139730844b98" target="_blank">link</a>)
* Normalize values on newElement for radio and checkbox types. (<a href="https://github.com/mootools/mootools-core/commit/b8307071fc950623c4f7804ade716f168152dc75" target="_blank">link</a>)
* Fixed svg element size. (<a href="https://github.com/mootools/mootools-core/commit/6837e04a89c2358dc4d2c52e59f7bc72964ea628" target="_blank">link</a>)
* Fixed getter behavior for border-radius. (<a href="https://github.com/mootools/mootools-core/commit/9e4919750a7baff8a94d8e8efdf60f91aaf2da64" target="_blank">link</a>)
* Added fix for IE8 to be able to set html into style element. (<a href="https://github.com/mootools/mootools-core/commit/94a64bc75f05598126881d482cca98563cd77d38" target="_blank">link</a>)
* Added option to trigger xhr.withCredentials without http auth. (<a href="https://github.com/mootools/mootools-core/commit/ccc36c24b20878e6b76d243beab1a4ebab38e33d" target="_blank">link</a>)
* Added the PATCH and HEAD methods to Request. (<a href="https://github.com/mootools/mootools-core/commit/2c72ef2f0f9fdb54e94da825dae2b6bb42da6b5e" target="_blank">link</a>)
* Fixed hasClass without classList to comply with ES6. (<a href="https://github.com/mootools/mootools-core/commit/6808764ca3d8e0faf41f6ceff6b1ba9e3f95cc03" target="_blank">link</a>)
* Added fix for IE9 when setting an input type to "email". (<a href="https://github.com/mootools/mootools-core/commit/d16b5b2e23a56d3e19ec0943c487a6a18c47e804" target="_blank">link</a>)
* Fix for IE when removing delegated "submit" event from destroyed element. (<a href="https://github.com/mootools/mootools-core/commit/d2fc72bc9ff2f063e011d4c7b0b4b90452b35301" target="_blank">link</a>)
* Updates in Docs.

#### More:

* Drag position calculation fix. (<a href="https://github.com/mootools/mootools-more/commit/a586f51d264b07ca932e9f07d6a5de5e06a1920e" target="_blank">link</a>) 
* Form.Validator.Extras credit card regex update. (<a href="https://github.com/mootools/mootools-more/commit/43a2d890734d391f742bc4eb1240262ff3da2a7d" target="_blank">link</a>)
* Fix Scroller Class to be able to use window as element. (<a href="https://github.com/mootools/mootools-more/commit/5f82f73673d0d491741a5beca5585ebb5a7773a5" target="_blank">link</a>)
* Added custom sort function for HtmlTable.Sort. (<a href="https://github.com/mootools/mootools-more/commit/743a34defa26945fc7ea633a1c766bd9eb731b25" target="_blank">link</a>)
* Fixed Type error for empty string in Form.Validator. (<a href="https://github.com/mootools/mootools-more/commit/94bf5a95704434a828fe6fbac6abdeb169f85fce" target="_blank">link</a>)
* Added onLoad callback for local and cross-origin CSS assets. (<a href="https://github.com/mootools/mootools-more/commit/d0d5712cb918948cd18ae4672f51f1556a0b47ed" target="_blank">link</a>)
* Fixed sort regex to respect sci-notated floated numbers in HtmlTable.Sort. (<a href="https://github.com/mootools/mootools-more/commit/bf8b5de63569fb7420c831066dbf777c9b725731" target="_blank">link</a>)
* Fixed scroll miss-placement while dragging and scrolling. (<a href="https://github.com/mootools/mootools-more/commit/b2a1efaa7807efd9b37a4f58bf9e4795bd299a0c" target="_blank">link</a>)
* Updates in Docs.