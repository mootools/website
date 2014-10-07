"use strict";

var express = require('express');
var jade = require('jade');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var errorhandler = require('errorhandler');

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
var lastBlogPost = require('./cache/blog/posts/posts.json')[0];

// all environments
app.set('views', __dirname + '/views');
app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.set('view cache', true);
app.use(favicon(__dirname + '/public/images/favicon/mootools.ico'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// important to be before express.router
if (app.get('env') == 'development'){

	app.use(morgan('dev'));
	app.use(errorhandler());

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
	org: 'mootools'
});
var twitter = require('./middleware/twitter')();

app.get('/', function(req, res){
	githubEvents(req, res);
	twitter(req, res);
	res.render('index', {
		title: 'MooTools',
		page: 'mootools',
		lastBlogPost: lastBlogPost,
		tweetFeed: res.locals.twitter
	});
});

app.get('/search', function(req, res){
	res.render('search', {
		title: 'Search',
		page: 'search'
	});
});

require('./core')(app);
require('./more')(app);
require('./blog')(app);
require('./builder')(app);
require('./developers')(app);


// starting server
app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
