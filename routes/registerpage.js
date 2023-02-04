var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var users = require('../models/Users');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register');
  });
  
  module.exports = router;

module.exports = router;
