const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  url: String,
  date: { type: Date, default: Date.now }
});

const Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;