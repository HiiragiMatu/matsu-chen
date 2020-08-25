const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const net = require('net')
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');



/**Model Implementation */
const db = require('./db')

/**
 * Require modules created by myself
 */
//const indexRouter = require('./routes/index');



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
 * View engine setup. 
 * Nodemailer for contact page.
 */
app.engine('handlebars', exphbs());
app.set('view engine', 'handlerbars');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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

/*mongoose.connect( 'mongodb://localhost/express-todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/

//let db = mongoose.connection;
/**
 * Check for DB connection and error
 */

//db.on('error', err => console.log('Connection Error', err));

/*db.on('error', function(err) {
  console.log(err);
});*/

//db.once('open', err => console.log('Connection Successful'));

/*db.once('open', function() {
  console.log('Connected to MongoDB');
});*/

const POST = process.env.PORT || 8888;

/**
 * Router definition(callback func)
 */
app.get('/', function(req, res){
  res.render('index');
});

app.get('/posts', function(req,res){
  res.render('posts');
})

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

/** Chat Code Here */
app.get('/chat', function(req, res){
  res.render('chat');
});
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request as followed:</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `

  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "localhost:3000",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Matsu Website Contact 👻"', // sender address
    to: "matuyou0301@gmail.com", // list of receivers
    subject: "Email Contact from Matsu Website ✔", // Subject line
    text: "Hi Matsu!", // plain text body
    html: output, 
  }); 
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
  res.render('contact', {meg: "Email has been sent to Matsu"});
});

const server = http.listen(POST, function(){
  console.log(`Listening on port ${POST}...`);
});
module.exports = app;