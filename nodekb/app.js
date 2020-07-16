const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check for DB Connection
db.once('open', function() {
    console.log('Connected to MongoDB');
});

//Check for DB Errors
db.on('error', function(err) {
    console.log(err);
});

// Init App
const app = express();

// Bring in Models
let Article = require('./models/articles');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res) {
    Article.find({}, function(err, articles){
        if(err) {
            console.log(err);
        } else {
            res.render('index', {
                //Use npm install -g <name>, so that no need to restart
                //tag: argument -> be passed to html 
                title:'Articles',
                articles: articles
            }); 
        }
    });
});

// Add articles route
app.get('/articles/add', function(req, res){
    res.render('add_articles', {
        title: 'Add Articles'
    });
});

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});

