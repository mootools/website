"use strict";

/* Adding a moofx animation to drop-down menu 
*/
var el$ = require('elements');
var moofx = require('moofx');
window.addEventListener('DOMContentLoaded', function () {
    var drop_down_el = el$('li.dropdown');
    var op = 1;
    drop_down_el.on('click', function () {
        this.search('ul').animate('opacity', op, {
            duration: "500ms",
            equation: 'cubic-bezier(0.17,0.67,0.83,0.67)'
        });
        op = op ? 0 : 1;
    });
});
/* End of moofx test
*/

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
