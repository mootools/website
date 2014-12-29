"use strict";

var project = 'demos';
var demos = require('../middleware/demos')(project, {
	title: "MooTools Demos"
});

module.exports = function(app){
	app.get('/demos/', demos);
};
