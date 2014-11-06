'use strict';

function getHashDependencies(){

	return function(hash){
		if (!hash) return [];
		// I leave a dummy here so far with the first example
		// on the issue Tim opened on Github
		var DB = { 'e8f3003df2d0919c1091b11854a53e9b':
			{
				date: '1415017941', 
				deps: 'Core/Core;Core/String;Core/Event;Core/Browser;Core/Class;Core/Element.Style;Core/Element.Event;Core/Element.Delegation;Core/Element.Dimensions;Core/Fx;Core/Fx.CSS;Core/Fx.Tween;Core/Fx.Morph;Core/Fx.Transitions;Core/Request.HTML;Core/Request.JSON;Core/Cookie;Core/DOMReady'
			}
		};
		var dependencies = DB[hash].deps.split(';');
		return dependencies;
	}
}

module.exports = getHashDependencies;
