"use strict";

if (window.matchMedia){

	// we can use all this, because matchMedia is for modern browser
	// only anyway

	window.addEventListener('DOMContentLoaded', function(){

		// for header menu on mobile
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
		//end header
		
		// for footer menu on mobile
		var sitemap = document.querySelectorAll('#sitemap div');
		var openedElement = sitemap[0];

		var toggleDiv = function(){
			var parent = event.target.parentNode;
			openedElement.classList.remove('open');

			if (parent === openedElement) return false;
			parent.classList.toggle('open');
			openedElement = parent;
		}
		
		for (var i = 0; i < sitemap.length; i++){
			sitemap[i].addEventListener('click', toggleDiv, false);
		}
		// end footer
		

	}, false);

}

var editor = require('wrapup-webbuilder/views/js/editor');

require('elements/domready')(function(){
	editor({
		theme: 'mootools'
	});
});
