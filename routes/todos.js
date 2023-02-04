var express = require('express');
var router = express.Router();
var validateToken = require('../validateToken');
var todo = require('../models/Todo');


/* POST private page. Requires validated JWT token. Token gets validated in validateToken.js. Responds with the authorized user's email. */
router.post('/', validateToken, (req, res, next) => {
  todo.findOne({user: req.user.id},(err, todos) =>{
    if(err){
        console.log("error in database search");
        return res.send("error in database search");
    }
    if(!todos){
      if(!req.body.items){                  //If no todos are found and none are provided, return empty array
        return(res.send(JSON.parse('{"_id": "undefined","user": "undefined","items": [],"__v": 0}')));
      }
        const newItems = [];
        for(var i = 0; i< req.body.items.length; i++){
          newItems.push(req.body.items[i]);
        }
        let newTodo = new todo({
            user: req.user.id,
            items: newItems
        }).save((err) =>{
            if(err) {console.log("error in saving to database");}
            else{
              const responseObject = new Object
              responseObject._id = "undefined"
              responseObject.user = "undefined"
              responseObject.items = req.body.items
              return res.send(responseObject)}
            }
        )
    }
    else{
      if(!req.body.items){                //If todos are found but no new ones provided, return the todos
        return(res.send(todos));
      }
      for(var i = 0; i< req.body.items.length; i++){
        todos.items.push(req.body.items[i])
      }
      todos.save((err) =>{
        if(err) {console.log("error in saving to database");}
        else{return res.send(todos)}
        })
    }
  }
)
  });
    //res.render('index', { title: 'Express' });          Add rendering next week
module.exports = router;

