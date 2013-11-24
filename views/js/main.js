"use strict";

var moofx = require("moofx");

if (window.matchMedia){

	// we can use all this, because matchMedia is for modern browser
	// only anyway

	window.addEventListener('DOMContentLoaded', function(){

		var matchMobile = function(){
			var match = window.matchMedia('only screen and (max-device-width: 47.999em)');
			return match.matches;
		};

		// for header menu on mobile
		var navigation = document.querySelectorAll('#header ul, #main-header ul');

		var openNavigation = function(navigation){
			var selected = navigation.querySelector('li.selected');
			var notReallySelected = selected.classList.contains('not-really');
			if (!selected) selected = navigation.querySelector('li');

			if (!navigation || !selected) return;

			var opened = false;
			selected.addEventListener('click', function(event){
				if (matchMobile() && (!opened || !notReallySelected)){
					event.preventDefault();
					navigation.classList.toggle('opened');
					opened = !opened;
				}
			}, false);

		};

		for (var k = 0; k < navigation.length; k++){
			openNavigation(navigation[k]);
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
		var animating = [];
		var rotateIcons = function(h, degrees){
			return function(){
				if (matchMobile()) return;
				if (animating[h]) return;
				animating[h] = true;
				moofx(bigIcons[h]).animate('transform', 'rotate(' + degrees + 'deg)', {
					duration: 2000,
					callback: function(){
						animating[h] = false;
						moofx(bigIcons[h]).style('transform', 'rotate(0deg)');
					}
				});
			};
		};

		for (var h = 0; h < bigSections.length; h++){
			animating[h] = false;
			bigSections[h].addEventListener('mouseenter', rotateIcons(h, 360), false);
		}

	}, false);

}
