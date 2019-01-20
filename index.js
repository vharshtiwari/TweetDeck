var Twitter = require('twitter');
var cors = require('cors');
var express = require('express'); 
var request = require('request'); 
var cookieParser = require('cookie-parser');
var test = require('./test.js');
var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
 
app.listen(8000);
console.log("listening to port 8000");
 
var CONSUMER_KEY = '*****';
var CONSUMER_SECRET = '******';

    var qs = require('querystring')
      , oauth =
        { callback: 'http://localhost:8000/callback'
        , consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        , signature_method: 'HMAC-SHA1'
        , version: '1.0'
        , nonce: "4572616e48616d6d65724c61686176",
        transport_method : 'query'
        
        }
      , url = 'https://api.twitter.com/oauth/request_token'
      ;

    app.use('/login', function(req,res,next){
        request.post({url:url, oauth:oauth}, function (e, r, body) {
          var req_data = qs.parse(body)

          var uri = 'https://api.twitter.com/oauth/authenticate'
            + '?' + qs.stringify({oauth_token: req_data.oauth_token})
          // redirect the user to the authorize uri
          res.redirect(302,uri);

          app.use('/callback', function(req,res,next){
                  var alpha = req.query.oauth_verifier;
                    var auth_data = qs.parse(body)
                    , oauth =
                      { consumer_key: CONSUMER_KEY
                      , consumer_secret: CONSUMER_SECRET
                      , token: auth_data.oauth_token
                      , token_secret: req_data.oauth_token_secret
                      , verifier: alpha
                      }
                    , url = 'https://api.twitter.com/oauth/access_token'
                    ;
                    
                    request.post({url:url, oauth:oauth}, function (e, r, body) {
                       
                          var fw =  qs.parse(body);
                          var token = fw.oauth_token;
                          var token_secret = fw.oauth_token_secret;
                  
                          var client = new Twitter({
                            consumer_key: CONSUMER_KEY,
                            consumer_secret: CONSUMER_SECRET,
                            access_token_key: token,
                            access_token_secret: token_secret
                           }); 
                       
                      var user;

                      var timeline = function(user){    
                        client.get('statuses/home_timeline',   function(error, tweet, response) {
                          if(error) throw error;
                          test(user,tweet);
                        });
                      }
                    
                    timeline('user');
                    
                      var post_status = function(user){    
                        client.post('statuses/update', {status: "change_text"},  function(error, tweet, response) {
                          if(error) throw error;
                          test(user,tweet);
                        });
                      }
                      post_status('user');

                    })
            })
            })
          })
