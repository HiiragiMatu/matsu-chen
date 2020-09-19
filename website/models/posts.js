require('./db');
let mongoose = require('mongoose');
let postSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  content: {type: String, required: true},
  update_at: {type: Date, "default": Date.now},
});

/* Not working -> Schema is not a constructor -> cannot get mongoose libs.
let mongoose = require('./db');
let Schema = mongoose.Schema;
let postSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  content: {type: String, required: true},
  date: {type: Date, "default": Date.now},
});*/

module.exports = mongoose.model('Posts', postSchema);