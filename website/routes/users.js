const express = require('express');
const userRoute = express.Router();

/* GET users listing. */
userRoute.get('/cool', function(req, res, next) {
  res.send('you are so cool!!!');
});

module.exports = userRoute;