var express = require('express');
var router = express.Router();
var validateToken = require('../validateToken');
var todo = require('../models/Todo');


/* GET private page. Requires validated JWT token. Token gets validated in validateToken.js. Responds with the authorized user's email. */
router.post('/', validateToken, (req, res, next) => {
  todo.findOne({user: req.user.id},(err, todos) =>{
    if(err){
        console.log("error in database search");
        return res.send("error in database search");
    }
    if(!todos){
        const newItems = [];
        for(var i = 0; i< req.body.items.length; i++){
          newItems.push(req.body.items[i]);
        }
        const newTodo = new todo({
            user: req.user.id,
            items: newItems
        }).save((err) =>{
            if(err) {console.log("error in saving to database");}
            else{return res.send("ok")}
            }
        )
    }
    else{
      for(var i = 0; i< req.body.items.length; i++){
        todos.items.push(req.body.items[i])
      }
      todos.save((err) =>{
        if(err) {console.log("error in saving to database");}
        else{return res.send("ok")}
        })
    }
  }
)
  });
    //res.render('index', { title: 'Express' });          Add rendering next week
module.exports = router;

