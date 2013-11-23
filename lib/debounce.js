"use strict";

function debounce(fn){
	var timer;
	return function(){
		var self = this, args = Array.prototype.slice.call(arguments);
		clearTimeout(timer);
		timer = setTimeout(function(){
			fn.apply(self, args);
		}, 200);
	};
}

module.exports = debounce;
