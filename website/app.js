const express = require('express');
const app = express();
const POST = process.env.PORT || 8888;
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const net = require('net')
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');

// Require modules created by oneself
require('./routes/pages')(app, passport);
//const localDB = require('./db');
const posts = require('./models/posts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlerbars');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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

/** Mail Contact...need revising */
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