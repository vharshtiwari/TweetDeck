var Twitter = require('twitter');
var cors = require('cors');
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cookieParser = require('cookie-parser');
var imp = require('./test.js');
var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
 
app.listen(8000);
console.log("listening to port 8000");
 
var CONSUMER_KEY = '9YfiigzkfEONfI79hWrQHIDdY';
var CONSUMER_SECRET = 'AC5wYgbc80Qu07ZLWwZKvQTAq1286FSvC7fCybbntBQF9hlhAC';

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
    // ready to make signed requests on behalf of the user
    
        var fw =  qs.parse(body);
        var token = fw.oauth_token;
        var token_secret = fw.oauth_token_secret;
 
        var client = new Twitter({
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          access_token_key: token,
          access_token_secret: token_secret
    }); 
    module.exports = client;
    
    var param;

    
 var neil = function(param){    
       client.get('statuses/home_timeline',   function(error, tweet, response) {
         if(error) throw error;
         
         var fs = require('fs');
         var fuck =  JSON.stringify(tweet);
           
       fs.appendFile(param+'.json', fuck, function (err) {
         if (err) throw err;
         console.log('Updated!');
         module.exports = JSON.stringify(client);
         res.send(fuck.length);
       });
       
       });
     }
  
  neil('lexluth21817810');
  
    var raby = function(count){    
      client.post('statuses/update', {status: "sdsfgsgjegejg"},  function(error, tweet, response) {
        if(error) throw error;
       // Tweet body.
        count++;
        
        if(count<100){
          raby(count);
        }
        else{
          return;
        }
      });
    }
    


      })
    })
    })
  })
