const express = require("express");
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

const ejs = require("ejs")

const app = express();

const items = ["Udemy 01", "Udemy 02", "Gym"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function (req, res){
    res.render('list', {listTitle: date.getDay(), todoItems: items});
})

app.post("/", function (req, res){
    const newTodo = req.body.newItem;
    if (req.body.list === "Work"){
        workItems.push(newTodo);
        res.redirect("/work");
    }else{
        items.push(newTodo);
        res.redirect("/");
    }
})

app.get("/work", function (req, res){
    res.render('list', {listTitle: "Work Tasks", todoItems: workItems});
})

app.get("/about", function (req, res){
    res.render('about')
})

app.listen(3000, function (){
    console.log("Service is hosting on port 3000")
})