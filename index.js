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

// fix trailing slashes in path
app.use(function(req, res, next){
	if (req.method == 'POST') return next();
	if (req.path != '/' && req.path.substr(-1) == '/'){
		var query = req.url.slice(req.path.length);
		res.redirect(301, req.path.slice(0, -1) + query);
	} else {
		next();
	}
});

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

app.locals.dateable = require('dateable');
app.locals.webfonts = app.get('webfonts');

// stuff to build static files (css/js)
require('./middleware/build-static')(app, {
	dirname: __dirname
});

app.use(express.static(__dirname + '/public', { redirect: false }));

// github, twitter & blog feeds
var githubEvents = require('./middleware/githubEvents')({
	org: 'mootools'
});
var twitter = require('./middleware/twitter')();
var blogData = require('./blog/data');
function getLatestBlog(req, res, next){
	blogData.get(function(err, blog){
		if (err) next(err);
		res.locals.lastBlogPost = blog.posts[0];
		next();
	});
}

// home
app.get('/', githubEvents, twitter, getLatestBlog, function(req, res){
	res.render('index', {
		title: 'MooTools',
		site: 'mootools',
		lastBlogPost: res.locals.lastBlogPost,
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
require('./demos')(app);
require('./blog')(app);
require('./books')(app);
require('./builder')(app);
require('./developers')(app);

// redirect old docs path
var projects = require('./package.json')._projects;
app.get('/docs/:project?/:module?/:file?', function(req, res){
	var project = projects[req.params.project] ? req.params.project : 'core';
	var latestVersion = projects[project].versions[0];
	if (!req.params.project) res.redirect(301, '/core/docs' + latestVersion);
	var newPath;
	if (!req.params.file){
		newPath = ['/core/docs', latestVersion, req.params.project, req.params.module].join('/');
	} else {
		newPath = ['', req.params.project, 'docs', latestVersion, req.params.module, req.params.file].join('/');
	}
	res.redirect(301, newPath);
});

// redirect old forge path
app.get(/^\/plugins/, function(req, res){
	res.redirect(301, req.path.replace('/plugins', '/forge'));
});

// redirect old download paths
app.get(/^\/download/i, function(req, res){
	res.redirect(301, '/core');
});

// for demos to echo Requests
app.post('/echo/:type', function(req, res){
	var type = req.params.type;
	res.send(req.body[type]);
	res.end();
});

// handle 404 errors
app.get('*', function(req, res, next){
	var err = new Error();
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	if (err.status != 404){
		return next(err);
	}
	res.status(404);
	res.render('errors/404', {
		site: 'mootools'
	});
});

if (app.get('env') != 'development'){
	app.use(function(err, req, res, next){
		res.status(500);
		res.render('errors/500', {
			site: 'mootools'
		});
	});
}

// starting server
app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
