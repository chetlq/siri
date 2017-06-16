var express    = require('express');        // call express
var app        = express();
var bodyParser = require('body-parser');
var birds = require('./app/routers/birds');
var MongoClient = require('mongodb');             // define our app using express
//var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
//var url = "mongodb://localhost:27017/mybase";
var url = "mongodb://sbertech:Zx350707@ds153239.mlab.com:53239/base_for_heroku";
var jsonParser = bodyParser.json()

mongoose.connect(url); // connect to our database


    app.use(bodyParser.json());
    //app.use(bodyParser.urlencoded());
    app.use('/', birds);
    //app.use(function(err, req, res, next) {
    //  console.error(err.stack);
    //  res.status(500).send('Something broke!');
  //  });
    app.use(errorHandler);
    app.set('port', process.env.PORT || 8001);

    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
    function errorHandler(err, req, res, next) {
   if (res.headersSent) {
    res.send (err);
     return next(err);
   }
   res.status(400);
   res.render('error', { error: err });
 }
