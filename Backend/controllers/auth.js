const { validationResult } = require('express-validator/check');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if( req.body.age < 18){
    const error = new Error('Age should be bigger then 18');
    error.statusCode = 411;
    error.data = errors.array();
    throw error;
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const nickname = req.body.nickname;
  const age = req.body.age;
  const gender = req.body.gender;
  const country = req.body.country;
  const address = req.body.address;

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    nickname: nickname,
    age: age,
    gender:gender,
    country: country,
    address: address
  });
  
  user.save()
  .then(result => {
    res.status(201).json({ message: 'User created!', result: result });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};


exports.getAllUser = (req, res, next) => {

  User.find()
    .then(user => {
      if (!user) {
        const error = new Error('Could not find any user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'All Users fetched.', user: user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
