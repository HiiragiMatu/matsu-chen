const note = require('express');




/**
 * Indicating the dir of templates is in the views path.
 * Indicating to use pug template engine
 */
note.set('views', path.join(__dirname, 'view'));
note.set('view engine', 'pug');

/**
 * First params specifies the name of a template, and second param would send data to the template
 */
note.get('/', function(req, res){
  res.render('index', {
    title: 'To-Do List'
  });
});

/**
 * note.all() is always executed, and note.get() is always ignored.
 * However, with the callback param, the note.get() would obtain the token to perform.
 */
note.all('/user/:username', function(req, res, next) {
  console.log('all methods captured');
  next();
});

note.get('/user/:username', function(req, res) {
  res.send('user: ' + req.params.username);
});


