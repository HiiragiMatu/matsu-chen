const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
});

let Posts = module.exports = mongoose.model('Posts', postSchema);