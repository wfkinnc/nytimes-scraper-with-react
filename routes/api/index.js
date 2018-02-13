const router = require("express").Router();
const articleRoutes = require("./articles");

console.log("got to routes/api/index.js")
// Book routes
router.use("/articles", articleRoutes);

module.exports = router;
