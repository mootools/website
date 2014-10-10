---
title: "What's New in 1.2: Behaviour Driven Development"
date: "Sat, 20 Oct 2007 08:18:03 +0000"
author: "Michelle Steigerwalt"
tags: "all,features,news"
permalink: "2007/10/20/whats-new-in-12-behaviour-driven-developmentyou-know-weve-been-telling-you-that-mootools-is-reliable-but-how-can-you-can-be-sure-that-it-will-work-for-your-project-without-just-taking-our-word/"

---
You know we've been telling you that MooTools is reliable, but how can you can be sure that it will work for your project without just taking our word for it?  

Check the Spec folder out from the repository and its self-contained testing suite will prove it.  Show your boss, show your coworkers, and let them know that MooTools is professional grade.

<!--more-->

#### Verifiably Rock-Solid

What makes this possible?  We've added <a href="http://dev.mootools.net/browser/trunk/Specs">our own special blend</a> of <a href="http://jania.pe.kr/aw/moin.cgi/JSSpec">JSSpec</a> to the MooTools source.  It goes through critical components of MooTools to make sure that they work as expected.  

For this release, we'll be supporting specs for Core, Class, Natives, and Element.js.  While not all of the Elements scripts or the other folders will make it into 1.2, we hope to release their specs in later releases.

#### What's A Spec?

The spec is short for specification.  Specifications are meant to be human-readable descriptions of code which can be verified programmatically.   They also serve as code samples and documentation all in a neat little package.  Exciting, right?

You could call them tests, but they're a little different.

#### Specs vs. Tests

Switching from tests to specs is a semantic shift between TDD (Test Driven Development) and BDD (Behavioral Driven Development).  

The examples describe the behavior, while tests make assertions of the state of a system.  Describing the behavior is the most intuitive way to verify that a system will behave the same way every time.

#### Roll Your Own

As an added bonus, you can use the spec runner to create your own tests.  The syntax is pretty simple.

    describe('Game', {

      'before each': function(){
        Game.start('Plum', 'library', 'wrench');
      },

      'should lose if bad guess': function(){
        var result = Game.guess('Plum', 'study', 'rope');
        value_of(Game.hasWon()).should_be_false();
      },

      'should win if good guess': function(){
        Game.guess('Plum', 'library', 'wrench');
        value_of(Game.hasWon()).should_be_true();
      }

    });

In this example, the first line denotes what we'll be testing.

    describe('Game', {

The first spec, 'before each', will be run before each example.

    'before each': function(){
        Game.start('Plum', 'library', 'wrench');
    },

This means that every example, the new method of the Game object will be called, passing in its predefined parameters.

This is followed by each spec you want to test.

    '<human readable description>': function(){
        <setup code goes here>
        value_of(<what you want to test to verify the spec>).should_be_true();
    }

Of course, should_be_true(); is just one example of what you can do.  For more examples, you can read the specs we've done for the framework, or check out the <a href="http://jania.pe.kr/aw/moin.cgi/JSSpec/Manual#head-5960092c3ff570684a689cf420da85da55d0c337">main JSSpec documentation</a>.
#### Why Bother?
So what's the point of making specs for all your MooTools goodness?  

Without specs, you might not know about a JavaScript problem until you get a call from an angry customer, assuming you're lucky and get enough traffic to have the issue reported.  Otherwise, errors could fester on your site unbeknownst to you for weeks, like a big "Kick Me" sign for your visitors to laugh at.

With specs, you can know <strong>before</strong> you update your site whether or not it will crash and burn.  It might not make you richer or more popular, but at least you won't have to worry about it.

#### Further Reading
 * <a href="http://video.google.com/videoplay?docid=8135690990081075324">Beyond Test Driven Development: Behaviour Driven Development</a> - an introductory video
 * <a href="http://jania.pe.kr/aw/moin.cgi/JSSpec">The Main JSSpec Wiki Page</a>