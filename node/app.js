
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// Mongo 
var mongo = require('mongodb');
var monk = require('monk');
//path to db
var db = monk('localhost:27017/test');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/userlist',routes.userlist(db));
app.get('/POIlist', routes.POIlist(db));
app.get('/nonStopPharmacies', routes.nonStopPharmacies(db));
app.get('/countOfPlacesWithWiFi', routes.countOfPlacesWithWiFi(db));
app.get('/deleteGovernmentBuildings', routes.deleteGovernmentBuildings(db));
app.get('/minus10seats', routes.minus10seats(db));
app.get('/helloworld',routes.helloworld);
app.get('/newuser', routes.newuser);
app.get('/newPOI', routes.newPOI);
app.get('/logout', routes.logout);
app.get('/getFavourites', routes.getFavourites(db));


//app.post('/addCollection', routes.addCollection(db));
app.post('/adduser', routes.adduser(db));
app.post('/addPOI', routes.addPOI(db));
app.post('/login', routes.login(db));
app.post('/addFavourite', routes.addFavourite(db));
app.post('/getPois', routes.getPois(db));
app.post('/getNear', routes.getNear(db));
//app.post('/removeFavourite', routes.removeFavourite(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
