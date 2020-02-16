let express = require("express");
const exphbs = require("express-handlebars");
let mongoose = require("mongoose");
let axios = require("axios");
let cheerio = require("cheerio");
let db = require("./models");
let PORT = process.env.PORT || 3000;;
let app = express();
let router = express.Router()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Articles";
mongoose.connect(MONGODB_URI);
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", (req, res) => {
    db.article.find({} )
    .lean()
    .then(function(dbArticle) {
        res.render("index", {article: dbArticle});
        })
    .catch(function(err) {
        res.json(err);
        });
    });

app.get("/json", (req, res) => {
    db.article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
        })
    .catch(function(err) {
        res.json(err);
        });
}   );

app.get("/scrape", function(req, res) {

    axios.get("http://www.cracked.com/").then(function(response) {
    let $ = cheerio.load(response.data);

        let array = []

        $("h3").each(function(i, element) {
            let result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");
            
            // result.summary =$(this)
            // .children("p")
            // .text();

            array.push(result)

            db.article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
                })
            .catch(function(err) {
                console.log(err);
                });
            });
        res.send("scrape complete")
        });
    });

app.get("/articles/:id", function(req, res) {

    db.article.findOne({ _id: req.params.id })
    // .populate("note")
    .lean()
    .then(function(dbArticle) {
        console.log(dbArticle)
        res.json(dbArticle);
        })
    .catch(function(err) {
        res.json(err);
        });
    });

app.post("/articles/:id", function(req, res) {
    db.note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
    });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
    });


// route for populating the page with the scraper instead of the database
    // app.get("/scrape", function(req, res) {

    //     axios.get("http://www.cracked.com/").then(function(response) {
    //     let $ = cheerio.load(response.data);
    
    //         let array = []
    
    //         $("h3").each(function(i, element) {
    //             let result = {};
    
    //             result.title = $(this)
    //             .children("a")
    //             .text();
    //             result.link = $(this)
    //             .children("a")
    //             .attr("href");
    
    //             array.push(result)
    
    
    //             db.article.create(result)
    //             .then(function(dbArticle) {
    //                 console.log(dbArticle);
    //                 res.render("index", {article:array});
    //                 })
    //             .catch(function(err) {
    //                 console.log(err);
    //                 });
    //             });
    //         res.send("scrape complete")
    //         });
    //     });

// let obj = [
// for (let i = 0; i < dbArticle.length; i++) {
//     obj.push(dbArticle[i].title);
//     }


// app.get("/", function(req, res) {
//     db.Articles.find({}, function(error, data) {
//       var hbsObject = {
//         Article: title
//       };
//       console.log(hbsObject);
//       res.render("index", {article:hbsObject});
//     });
//   });