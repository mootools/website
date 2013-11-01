"use strict";

var express = require('express');
var http = require('http');
var path = require('path');
var jade = require('jade');

jade.filters.highlight = require('./lib/jade-highlight');

var app = express();

// default config
app.set('port', process.env.PORT || 3000);
app.set('webfonts', true);

// override those config if they're passed as arguments
var args = process.argv.splice(2);

parseArguments: while (args.length){
	var arg = args.shift();

	switch (arg){
		case '-p':
		case '--port':
			app.set('port', args.shift());
			break;
		case '--webfonts':
		case '--webfonts=false':
		case '--webfonts=true':
			app.set('webfonts', arg != '--webfonts=false');
			break;
		default:
			break parseArguments;
	}
}

// all environments
app.set('views', __dirname + '/views');
app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.set('view cache', true);
app.use(express.favicon(__dirname + '/public/images/favicon/mootools.ico'));
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

app.locals.site = 'mootools';
app.locals.page = '';
app.locals.dateable = require('dateable');
app.locals.webfonts = app.get('webfonts');

// stuff to build static files (css/js)
require('./middleware/build-static')(app, {
	dirname: __dirname
});

app.use(express.static(__dirname + '/public'));

var githubEvents = require('./middleware/githubEvents')({
	org: 'mootools',
	variable: 'githubEvents'
});

app.get('/', githubEvents, function(req, res){
	res.render('index', {
		title: 'MooTools'
	});
});

require('./prime')(app);
require('./elements')(app);
require('./moofx')(app);
require('./agent')(app);

require('./blog')(app);
require('./builder')(app);
require('./developers')(app);

app.use(app.router);

// starting server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
