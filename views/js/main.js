"use strict";

if (window.matchMedia){

	// we can use all this, because matchMedia is for modern browser
	// only anyway

	window.addEventListener('DOMContentLoaded', function(){

		var matchMobile = function(){
			var match = window.matchMedia('only screen and (max-width: 47.999em)');
			return match.matches;
		};

		// for header menu on mobile
		var navigation = document.querySelector('#header ul');
		var selected = document.querySelector('#header ul li.selected');

		if (navigation && selected){

			var opened = false;
			selected.addEventListener('click', function(event){
				if (!matchMobile()) return;
				event.preventDefault();
				navigation.classList.toggle('opened');
				opened = !opened;
			}, false);
		}

		// for footer menu on mobile
		var sitemap = document.querySelectorAll('#sitemap div');
		var openedElement = sitemap[0];

		var toggleDiv = function(i){
			return function(){
				if (!matchMobile()) return;

				var parent = sitemap[i];
				if (parent != openedElement){
					openedElement.classList.remove('open');
				}

				parent.classList.toggle('open');
				openedElement = parent;
			};
		};

		for (var i = 0; i < sitemap.length; i++){
			sitemap[i].addEventListener('click', toggleDiv(i), false);
		}

	}, false);

}

var editor = require('wrapup-webbuilder/views/js/editor');

require('elements/domready')(function(){
	if (!document.getElementById('editor')) return;
	editor({
		theme: 'mootools'
	});
});
