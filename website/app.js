const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const app = express.Router();
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')));
/**
 * Set directory to contain the templates('views')
 * Set view engine to use, could be pug or other template format
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/**
 * Default mongoose connection
 * Bind connection to error event
 */
mongoose.connect('mongodb://localhost/website');
let db = mongoose.connection;
/**
 * Check for DB connection and error
 */
db.once('open', function() {
  console.log('Connected to MongoDB');
});
db.on('error', function(err) {
  console.log(err);
});

const POST = process.env.PORT || 3000;
/**
 * Router definition(callback func)
 */
app.get('/', function(req, res){
  res.send('Hello Matsu');
});

app.get('/about', function(req, res){
  res.render('index', { title: 'Hey', msg: 'Where are you?'} )
});

app.listen(POST, function(){
  console.log(`Listening on port ${POST}...`);
});


module.exports = router;
module.exports = app;