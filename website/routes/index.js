

const userRoute = require('../models/users');

userRoute.post('/register', (req, res, next) => {
  const noEmptyData = 
    req.body.email &&
    req.body.name &&
    req.body.password &&
    req.body.confirmPassword;

  const validConfirmPassword = req.body.password === req.body.confirmPassword;
  if(!noEmptyData) {
    const err = new Error('Some fields are empty');
    err.status = 400;
    return next(err);
  }

  if(!validConfirmPassword) {
    const err = new Error('Passwords do not match');
    err.status = 400;
    return next(err);
  }

  const userData = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  };

  User.create(userData, (err, user) => {
    if(err) {
      return next(err);
    }
    return res.redirect('/profile');
  });
});