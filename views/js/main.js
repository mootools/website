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
		var open_el = sitemap[0];

		function toggle_div() {
			var this_el = event.target.parentNode;
			open_el.classList.remove('open');

			if (this_el === open_el) return false;
			this_el.classList.toggle('open');
			open_el = this_el;
		}
		
		for (var i = 0; i < sitemap.length; i++) {
			sitemap[i].addEventListener('click',toggle_div,false);
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
