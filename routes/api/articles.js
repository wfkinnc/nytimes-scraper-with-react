const router = require("express").Router();
const articleController = require("../../controller/articleController.js");


console.log(" from routes/api/articles.js " );
// Matches with "/api/articles"
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create);

router.route("/:Id") 
  .delete(articleController.delete);

module.exports = router;
