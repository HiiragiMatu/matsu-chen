const express = require('express');
const path = require('path');
// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res) {
    let articles = [
        {
            id:1,
            title: 'Article 1',
            author: 'Matsu Chen',
            body: 'This is article one'
        },
        {
            id:2,
            title: 'Article 2',
            author: 'Matsu Chen',
            body: 'This is article two'
        },
        {
            id:3,
            title: 'Article 3',
            author: 'Matsu Chen',
            body: 'This is article three'
        },
    ];
    res.render('index', {
        //Use npm install -g <name>, so that no need to restart
        //tag: argument -> be passed to html 
        title:'Articles',
        articles: articles
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

