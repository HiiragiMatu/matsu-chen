/**
 * This is just an example used to try how to build Schema
 */

 const mongoose = require('mongoose');

 let AnimalSchema = new mongoose.Schema({
   size: String,
   mass: Number,
   category: {
     type: String,
     default: 'On Land'
   },
   name: {
     type: String,
     required: true
   },
   createdAt: {
     type: Date,
     default: Date.now
   },
 });

 AnimalSchema.methods.getCategory = function () {
   console.log(`This animal belongs to ${this.category}`);
 };

 AnimalSchema.methods('getName', function() {
   console.log(`The animal is ${this.name}`);
 });

 module.exports = mongoose.model('Animal', AnimalSchema);