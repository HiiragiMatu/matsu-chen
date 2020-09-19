const path = require('path')
const bodyParser = require('body-parser');
let Posts = require('../models/posts');

module.exports = function(app, passport) {
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  app.get('/', function(req ,res){
    res.render('index');
  });

  app.get('/posts', function(req, res){
    Posts.find({}, function(err, posts){
      if(err){
        console.log(err);
      }else{
        res.render('posts', {
          title: posts.title,
          author: posts.author,
          contect: posts.content,
          date: posts.date, 
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
    //req.checkBody('title', 'Title is required!').notEmpty();
    //req.checkBody('author', 'Author is required!').notEmpty();
    //req.checkBody('content', 'Content is required!').notEmpty();
    
    //let errors = req.validationErrors();
    /*if(errors){
      res.render('add_posts', {
        title: "",
        errors: errors,
      });
    }else{*/
    let post = new Posts();
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;
    // Fix Date problem
    //post.date = new Date(req.body.update_at); 
    console.log(post.title + " " + post.author + " " + post.content);
    //}
    post.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        //req.flash('Success', 'Post Added');
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

