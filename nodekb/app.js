const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

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

//Body parser middleware -> parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

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

// Get Single Article
app.get('/article/:id', function(req, res) {
  Article.findById(req.params.id, function(err, article) { 
      res.render('article', {
        article:article
    });
  });
});

// Add Submit POST Route -> We can use the same route with different method(GET,POST...)
app.post('/articles/add', function(req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err) {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    }); 
}); 

// Start Server
app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}...`);
});

