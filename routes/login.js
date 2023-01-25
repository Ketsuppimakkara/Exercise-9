var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require ('jsonwebtoken');
var users = require('../models/Users');
var router = express.Router();


/* POST login page.*/
router.post('/', (req, res, next) => {
    users.findOne({email: req.body.email},(err, user) =>{
        if(err){
            console.log("error in database search");
            return res.send("error in database search");
        }
        if(!user){
            return res.send("No such user found!");
            }
        else{

            bcrypt.compare(req.body.password, user.password, (err, isMatch) =>{
                if(err) throw err;
                else{
                    if(!isMatch){
                        res.send("Login failed");
                    }
                    else{                            
                        const jwtPayload = {
                        id: user.id,
                        email: user.email,
                        };
                    console.log(jwtPayload);
                    jwt.sign(
                            jwtPayload,
                            process.env.SECRET,
                            {
                                expiresIn: 120
                            },
                            (err,token)=>{
                                if(err) throw err;
                                else{
                                    res.json({success:true,
                                        token})
                                }
                            }
                        );
                    }
                    }
                })
            }
            }
        )
    }
)
    //res.render('index', { title: 'Express' });          Add rendering next week
module.exports = router;

