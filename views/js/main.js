"use strict";

var moofx = require("moofx");

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
		
		// moofx animation for icons
		var bigSections = document.querySelectorAll('.main > a');
		var bigIcons = document.querySelectorAll('div.big-icon img');
		
		var rotateIcons = function(h, degrees){
			return function(){
				if (matchMobile()) return;
				
				moofx(bigIcons[h]).animate('transform', 'rotate('+degrees+'deg)', {duration: 2000});
			}
		}
		
		for (var h = 0; h < bigSections.length; h++){
			bigSections[h].addEventListener('mouseenter', rotateIcons(h, 360), false);
			bigSections[h].addEventListener('mouseleave', rotateIcons(h, 0), false);
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
