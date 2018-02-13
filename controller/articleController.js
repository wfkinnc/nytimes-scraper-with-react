const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
     console.log("running controller/articleController.js findAll() - send " );
    db.Articles
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => {
        res.json(dbModel)
        console.log("from controller/articleController.js findAll - db " + dbModel );
      }
      )
      .catch(err => res.status(422).json(err));
      console.log("from contoller/articleController.js finall() - return");
  }, // end findAll
  create: function(req, res) {
    console.log("running  contoller/ArticleController.js create() - send " + req)
    console.log( "body is " + JSON.stringify(req.body.passNewArticle))
    
    db.Articles
      .create(req.body.passNewArticle)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },// end create
  delete: function(req,res){
    console.log("running controller/ArticleController.js delete() - send " + req.params.Id)
    db.Articles
      .deleteOne({_id: req.params.Id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
};
