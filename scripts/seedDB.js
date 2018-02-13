console.log("trying to run seed db");
const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// connects to get the db.
mongoose.connect("mongodb://localhost/nytimes-react-scraping", {
    useMongoClient: true
}
);

const articleSeed = [
    { title: "As F.B.I. Took a Year to Pursue the Nassar Case, Dozens Say They Were Molested",
      url:"https://www.nytimes.com/2018/02/03/sports/nassar-fbi.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news"
    }

];

db.Articles 
    .remove({})
    .then(() => db.Articles.create(articleSeed))
    .then(data => {
        console.log(data.InsertedIds.length + "records added");
        process.exit(0);
    })
    .catch(err =>{

        console.error(err);
        console.log(err);
        process.exit(1)
    })
