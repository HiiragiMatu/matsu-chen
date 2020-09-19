const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/website'
/*mongoose.connect('mongodb://localhost:27017/website,' , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});*/

let db = mongoose.connection;
// Or in this way: db.on('error', err => console.log('Connection Error', err));
db.on('error', function(err){
  console.log(`Error: ${err}`);
});
db.once('open', function(){
  console.log(`MongoDB Connection Successful! ${db.name}`);
});

module.exports = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

