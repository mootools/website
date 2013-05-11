
var application = require('mootools-microsite');
var express = application.express;

var routes = function(app){

	app.use(function setPath(req, res, next){
		res.locals.path = app.path()
		next();
	});

	app.get('/', function(req, res){
		res.render('index', {
			title: 'MooTools'
		});
	});

};

var statics = function(app){
	app.use(express.static(__dirname + '/public'));
}

var app = application({
	routes: routes,
	static: statics,
	dirname: __dirname
});

app.use('/prime', require('./prime-website'));
app.use('/elements', require('./elements-website'));
