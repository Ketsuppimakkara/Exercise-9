var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var users = require('../models/Users');
var router = express.Router();
const { body, validationResult } = require('express-validator');


/* POST register page. Request has email and password attributes. Tries to find email with same name from database, if no match is found, salts and encrypts password and saves new user object to  database.*/
router.post('/',body('email').isEmail(),body('password').isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}), (req, res, next) => {
    users.findOne({email: req.body.email},(err, user) =>{
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            return res.status(400).json({errors: validationErrors.array()});
        }
        if(err){
            console.log("error in database search");
            return res.send("error in database search");
        }
        if(!user){
            var salt = bcrypt.genSaltSync(10);
            const newUser = new users({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,salt)
            }).save((err) =>{
                if(err) {console.log("error in saving to database");}
                else{return res.send("ok")}
                }
            )
        }
        else{
            return res.status(403).json({email:"Email already in use."})
        }

    })
    //res.render('index', { title: 'Express' });          Add rendering next week
});

module.exports = router;
