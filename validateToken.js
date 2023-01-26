const jwt = require("jsonwebtoken");


//Uses JWT to verify a token. Token gets passed in request "authorization" header.
module.exports = function(req,res,next) {
    const authHeader = req.headers["authorization"];
    if(authHeader){
        let token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err,user)=>{
            if(err){
                res.status(401).send()
                throw(err);
            }
            else{
                req.user = user
                next();
            }
        })
    }
    else{
        return res.status(401).send();
    }
};