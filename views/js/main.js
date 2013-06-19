"use strict";

if (window.matchMedia){

	// we can use all this, because matchMedia is for modern browser
	// only anyway

	window.addEventListener('DOMContentLoaded', function(){

		var navigation = document.querySelector('#header ul');
		var selected = document.querySelector('#header ul li.selected');

		if (navigation && selected){

			var opened = false;
			selected.addEventListener('click', function(event){
				var match = window.matchMedia('only screen and (max-width: 47.999em)');
				if (match.matches){
					event.preventDefault();
					navigation.classList.toggle('opened');
					opened = !opened;
				}
			}, false);
		}

	}, false);

}

var editor = require('wrapup-webbuilder/views/js/editor');

require('elements/domready')(function(){
	editor({
		theme: 'mootools'
	});
});
