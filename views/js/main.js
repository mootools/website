"use strict";

window.addEvent('domready', function(){

	// download buttons, form submit and source code download
	document.getElements('a.getFile').addEvent('click', function(e){
		e.preventDefault();
		this.getParent('form').submit();
	});

	// to manage dependencies in build table
	customBuilderTable();
});

if (window.matchMedia){

	// we can use all this, because matchMedia is for modern browser
	// only anyway

	window.addEventListener('DOMContentLoaded', function(){

		var matchMobile = function(){
			var match = window.matchMedia('only screen and (max-width: 47.999em)');
			return match.matches;
		};

		// for header menu on mobile
		var navigation = document.querySelectorAll('#header nav ul');

		var openNavigation = function(navigation){
			var selected = navigation.querySelector('li.selected');
			var notReallySelected = selected && selected.classList.contains('not-really');
			if (!selected) selected = navigation.querySelector('li');

			if (!navigation || !selected){
				return;
			}

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
					openedElement.classList.remove('opened');
				}

				parent.classList.toggle('opened');
				openedElement = parent;
			};
		};

		for (var i = 0; i < sitemap.length; i++){
			sitemap[i].addEventListener('click', toggleDiv(i), false);
		}

		// demo runner
		document.getElements('ul.demoTabs li a').addEvent('click', function(event){
			event.preventDefault();
			var type = this.getProperty('data-type');
			if (type == 'jsfiddle') return this.getParent('form').submit();
			$$('ul.demoTabs a.selected').removeClass('selected');
			this.addClass('selected');
			$$('.tabcontent .tabs').removeClass('selected');
			$$('.tabcontent .tabs[data-type="' + type + '"]').addClass('selected');
		}, false);


	}, false);
}

function customBuilderTable(){

	var checkboxes = $$('form#builderOptions table input[type=checkbox]');
	// in case not builder page
	if (!checkboxes.length) return;

	var providerInput = {};
	var requireInput = {};
	checkboxes.each(function(checkbox){
		var data = getData(checkbox);
		data.provides.forEach(function(code){
			if (code) providerInput[code] = checkbox;
		});
		data.requires.forEach(function(code){
			if (code){
				if (!requireInput[code]) requireInput[code] = [];
				requireInput[code].push(checkbox);
			}
		});
		checkbox.addEvent('change', changedModule);
	});
	// in case its a hash URL with pre-selected modules
	$$('.activeChoice').set('checked', true).fireEvent('change');

	// everytime a checkbox changes
	function changedModule() {
		this.toggleClass('activeChoice', this.checked || !this.hasClass('activeChoice'));
		var required = [];
		checkboxes.each(function(checkbox){
			if (checkbox.hasClass('activeChoice')) required.append(getData(checkbox).requires);
			else checkbox.removeClass('dependency').set('checked', null);
		});
		required.each(addDependency);
	}

	// trigger update of checked modules/dependencies
	function updateModules(){
		var isWanted = this.checked || this.hasClass('activeChoice') || this.hasClass('dependency');
		var action = isWanted ? addDependency : removeDependency;
		var modules = getData(this)[isWanted ? 'requires' : 'provides'];
		for (var i = 0; i < modules.length; i++) if (modules[i]) action(modules[i]);
	}

	function addDependency(code){
		if (!providerInput[code]) return;
		providerInput[code].addClass('dependency');
		updateModules.call(providerInput[code]);
	}

	function removeDependency(code){
		if (!requireInput[code]) return;
		requireInput[code].forEach(function(input){
			input.removeClass('dependency');
			updateModules.call(input);
		});
	}

	// make array out of data fields
	function getData(input){
		var provides = input.getAttribute('data-provides').split(', ');
		var requires = input.getAttribute('data-requires').split(', ');
		return {provides: provides, requires: requires};
	}
}

// script for "choose older version" select
global.selectVersion = function(select){
	var span = select.getParent().getNext();
	span.removeClass('visible');
	var link = select.get('value');
	setTimeout(function(){
		span.set('html', '<a download target="_blank" href="' + link + '">Download source code here</a>').addClass('visible');
	}, 200);
};
