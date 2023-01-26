var express = require('express');
var router = express.Router();
var validateToken = require('../validateToken');


/* GET private page. Requires validated JWT token. Token gets validated in validateToken.js. Responds with the authorized user's email. */
router.get('/', validateToken, (req, res, next) => {
    res.json({
        email: req.user.email
    });
  });
    //res.render('index', { title: 'Express' });          Add rendering next week
module.exports = router;

