const path = require('path')
module.exports = function(app, passport) {
  app.get('/', function(req ,res){
    res.render('index');
  });

  app.get('/posts', function(req, res){
    res.render('posts');
  });
  
  app.get('/photography', function(req,res){
    res.render('photography');
  });

  app.get('/about', function(req, res){
    res.render('about');
  });

  app.get('/contact', function(req, res){
    res.render('contact', {title: 'Contact'});
  });

  app.get('/games', function(req, res){
    res.render('games');
  });

  app.get('/gadgets', function(req, res){
    res.render('gadgets');
  })

  app.get('/ml', function(req, res){
    res.render('ml');
  });

  app.get('/nlp', function(req, res){
    res.render('nlp');
  });
}

