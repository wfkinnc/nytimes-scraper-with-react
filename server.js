const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// gets the .env file
require('dotenv').config({path: './config/.env'});

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
console.log("the mongoose is " + process.env.urlMongoose);
var tstConn =process.env.urlMongoose || "mongodb://localhost/nytimes-react-scraping";
console.log(tstConn)
mongoose.connect(process.env.urlMongoose || "mongodb://localhost/nytimes-react-scraping"  ,
//mongoose.connect("mongodb://localhost/nytimes-react-scraping"  ,
  {
    useMongoClient: true
  }
);

// insert statement
//db.articles.insertOne({"title":"xx","url":"zzz"});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
