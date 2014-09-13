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
	customBuilderTable();
	}, false);

}

function customBuilderTable(){

	var checkboxes = document.querySelectorAll('table#builderOptions input[type=checkbox]');
	if (!checkboxes.length) return;
	var providerInput = {};
	var requireInput = {};
	for (var i = 0; i < checkboxes.length; i++){
		var data = getData(checkboxes[i]);
		data.provides.forEach(function(code){
			if (code) providerInput[code] = checkboxes[i];
		});
		data.requires.forEach(function(code){
			if (code) {
				if (!requireInput[code]) requireInput[code] = [];
				requireInput[code].push(checkboxes[i]);
			}
		});
		checkboxes[i].addEventListener('change', updateModules)
	};


	function updateModules(){
		var action = this.checked ? addDependency : removeDependency;
		var modules = getData(this)[this.checked ? 'requires' : 'provides'];
		for (var i = 0; i < modules.length; i++) if (modules[i]) action(modules[i]);

	}
	function addDependency(code){
		if (!providerInput[code]) return;
		providerInput[code].checked = true;
		updateModules.call(providerInput[code]);
	}
	function removeDependency(code){
		if (!requireInput[code]) return;
		requireInput[code].forEach(function(input){
			input.checked = false;
			updateModules.call(input);
		});
	}
	function getData(input){
		var provides = input.getAttribute('data-provides').split(', ');
		var requires = input.getAttribute('data-requires').split(', ');
		return {provides: provides, requires: requires};
	}
};
