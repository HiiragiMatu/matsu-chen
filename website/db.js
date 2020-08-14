var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});
 
mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/express-todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
/**
 * Check for DB connection and error
 */
//db.on('error', err => console.log('Connection Error', err));
db.on('error', function(err) {
  console.log(err);
});
//db.once('open', err => console.log('Connection Successful'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

