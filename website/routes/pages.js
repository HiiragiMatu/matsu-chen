const path = require('path')
const Post = require('../models/posts');
const bodyParser = require('body-parser');
module.exports = function(app, passport) {
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  app.get('/', function(req ,res){
    res.render('index');
  });

  app.get('/posts', function(req, res){
    Post.find({}, function(err, posts){
      if(err){
        console.log(err);
      }else{
        res.render('posts', {
          test: 'Test',
          title: posts.title,
          author: posts.author,
          contect: posts.content,
          //date: posts.date, 
        });
      }
    });
  });

  app.get('/posts/add_posts', function(req, res){
    res.render('add_posts', {
      title: 'Add New Post',
    })
  });
  
  app.post('/posts/add_posts', function(req, res){
    let post = new Post();
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;
    

    post.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/posts');
      }
    });
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

