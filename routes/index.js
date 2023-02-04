const { json } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  if(req.body.token){
    const token = jwt.verify(req.body.token,process.env.SECRET,function(token,err){
      if(err){
        res.send(err);
      }
      else{
        res.send(token);
      }
    })
  }
}
);

module.exports = router;
