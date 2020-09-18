const mongoose = require( 'mongoose' );
mongoose.connect('mongodb://localhost/website,' , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection; 
// Or in this way: db.on('error', err => console.log('Connection Error', err));
db.on('error', function(err){
  console.log(`Error: ${err}`);
});
db.once('open', function(){
  console.log(`MongoDB Connection Successful!`);
});

/*
var Schema   = mongoose.Schema;
var POST = new Schema({
    authorName    : String,
    content    : String,
    updated_at : Date
});
const POSTS = mongoose.model('POSTS', POST);
let p1 = new POSTS({ authorName: 'Matsu Chen', content: 'Post1', updated_at: Date});
console.log(p1.authorName)
console.log(p1.content);
console.log(p1.updated_at);*/

