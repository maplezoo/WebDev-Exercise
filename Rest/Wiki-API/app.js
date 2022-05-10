const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/WikiDB');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(function (req, res) {
        Article.find({}, function (err, r) {
            err ? res.send(err) : res.send(r);
        })
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function (err) {
            err ? res.send(err) : res.send(`Successfully send a new article about ${req.body.title}`);
        });
    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            err ? res.send(err) : res.send("Successfully delete all the articles!")
        })
    })

//////////////////////////////Look up a specific article///////////////////////////////

app.route("/articles/:articleTitle")
    .get(function (req, res){
       Article.findOne({title: req.params.articleTitle}, function (err, foundArticle){
           if (err) res.send(err);
           if (foundArticle){
               res.send(foundArticle);
           } else {
               res.send(`Did not found article under name ${req.params.articleTitle} `)
           }
       })
    })

    .delete(function (req,res){
        Article.deleteOne({title: req.params.articleTitle}, function (err){
            err ? res.send(err) : res.send(`Successfully delete the article about ${req.params.articleTitle}!`)
        })
    });

app.listen(3000, function () {
    console.log("Service is hosting on port 3000")
});