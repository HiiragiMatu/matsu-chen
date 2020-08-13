const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');

/**
 * Require modules created by myself
 */
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
app.use('/routes/users', userRouter);

/**
 * Specify modules that are going to be used
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
/**
 * When catch 404 error, forward to error handler
 */
/*app.use(function(req, res, next){
  next(createError(404));
});
app.use(function(err, req, res, next){
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
})
*/

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
  res.render('index', {title: 'My Website'});
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/porfolio', function(req, res){
  res.render('portfolio');
})



app.listen(POST, function(){
  console.log(`Listening on port ${POST}...`);
});

module.exports = app;
