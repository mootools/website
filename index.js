"use strict";

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view cache', true);
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.bodyParser());

// important to be before express.router
if (app.get('env') == 'development'){

	app.use(express.logger('dev'));
	app.use(express.errorHandler());

	app.use(function setJadePretty(req, res, next){
		res.locals.pretty = true;
		res.locals.cache = false;
		next();
	});

}

app.get('/', function(req, res){
	res.render('index', {
		title: 'MooTools'
	});
});

// stuff to build static files (css/js)
require('./middleware/build-static')(app, {
	dirname: __dirname
});

app.use(express.static(__dirname + '/public'));

require('./prime')(app);
require('./elements')(app);

app.use(app.router);

// starting server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
