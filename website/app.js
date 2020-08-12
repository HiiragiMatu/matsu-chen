var http = require('http');
var express = require('express');
var app = express();


/**
 * Router definition(callback func)
 */
app.get('/', function(req, res){
  res.send('Hello Matsu');
});

app.listen(3000, function(){
  console.log('Listening on port 3000...');
});

