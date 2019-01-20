var express = require('express');
var Twitter = require('twitter');
var app = express();
var cookieParser = require('cookie-parser');
var cors = require('cors');


var index = require('./index.js');

var file = function(user,tweet){
    var fs = require('fs');
        var str =  JSON.stringify(tweet);        
        fs.appendFile(user+'.json', str, function (err) {
        if (err) throw err;
        console.log('Updated!'); 
        });                        
    }


module.exports = file;
