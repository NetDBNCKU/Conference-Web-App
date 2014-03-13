
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var info = require('./routes/info');
var paperList = require('./routes/paperList');
var people = require('./routes/people');
var program = require('./routes/program');
var map = require('./routes/map');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/info', info.list);
app.get('/paperList', paperList.list);
app.get('/demoPaper', paperList.demoPaper);
app.get('/people', people.list);
app.get('/program', program.list);
app.get('/program/:id', program.programday);
app.get('/map', map.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
