var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var logger = require('morgan');
var ig = require('instagram-node-lib');


var instaUsername;

ig.set('client_id', 'b8ea3dcb540743fc9d1b92110261002e');
ig.set('client_secret', '6696c3641a554af88bcf0a61657094f5');
//ig.set('access_token', '3d93984d99904747b5a610aff69533ee' );

var app = express();
var path = require('path');
var utf8 = require('utf8');
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

var handlebars = require('express-handlebars').create({'defaultLayout':'main'});
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

app.engine('handlebars', handlebars.engine);

// set handlebars as default view engine
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 5000);


app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/index', function(req, res, next) {
  res.render('index');
});

app.get('/about', function(req, res, next) {
  res.render('about');
});

app.post('/setup', function(req, res, next) {
    if (req.body.instagramUsername) {
      instaUsername = req.body.instagramUsername;
      console.log('server', instaUsername);
      findIG(instaUsername, getLatestUserMedia);
      function getLatestUserMedia(userID) {
          console.log('userID', userID);
          ig.users.recent({
           user_id: userID, 
            complete: function(instaResults){
              var latest = instaResults[0];
              console.log('in getLatestUserMedia');
              console.log(latest.images.standard_resolution.url);
              var imgUrl = latest.images.standard_resolution.url;
              res.send(imgUrl);
             }
          });
      }
    }
    else {
      res.status(404);
    }
});

server.listen(app.get('port'));


function findIG(username, callback) {
  console.log('finding');
  var match = -1;
  ig.users.search({
    q: utf8.encode(instaUsername), // term to search
    complete: function (data, pagination) {
      console.log('complete');
      for(var i = 0; i< data.length; i++) {
        if(username==data[i].username) {
          match = data[i].id;
          console.log('ITS A MATCH !!!!!!');
          return callback(match);
        }
      }
     return "";
    }
  });
}

/*app.post('/verify', function(req, res, next) {
  var usernameVerification = {};

  function verifyTwitter(match) {
    usernameVerification.platform = 'twitter';
    if (match) {
      if (match == 'taken') {
        usernameVerification["twitter"] = true;
      }
      else {
        usernameVerification["twitter"] = false;
      }
      res.json(usernameVerification);
    }
    else {
      usernameVerification["twitter"] = true;
      res.json(usernameVerification);
    }

  }
  function verifyIG(instaID) {
      usernameVerification.platform = 'insta';
      req.session.instaId = instaID;
      if (instaID > -1) {
        usernameVerification.insta = true;
      }
      else {
         usernameVerification.insta = false;
      }
      res.json(usernameVerification);
  }

  if (req.body.platform == 'twitter') {
      download('http://twitter.com/users/username_available?username='+ req.body.username, verifyTwitter);
  }
  else if (req.body.platform == 'insta') {
    findIG(req.body.username, verifyIG);
  }

});
*/


