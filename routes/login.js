var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require ('jsonwebtoken');
var users = require('../models/Users');
var router = express.Router();


/* POST login page. Login gets compared to encrypted hash in database. Generates a JWT token on successful login*/
router.post('/', (req, res, next) => {
    users.findOne({email: req.body.email},(err, user) =>{
        if(err){
            console.log("error in database search");
            return res.send('{"error":"error in database search"}');
        }
        if(!user){
            return res.status(403).json({Errors:[{msg:"Invalid credentials"}]})
            }
        else{
            bcrypt.compare(req.body.password, user.password, (err, isMatch) =>{
                if(err) throw err;
                else{
                    if(!isMatch){
                        res.status(403).json({Errors:[{msg:"Invalid credentials"}]})
                    }
                    else{                            
                        const jwtPayload = {
                        id: user.id,
                        email: user.email,
                        };
                    jwt.sign(
                            jwtPayload,
                            process.env.SECRET,
                            {
                                expiresIn: 120
                            },
                            (err,token)=>{
                                if(err) throw err;
                                else{
                                    res.json({success:true,token:token})
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

