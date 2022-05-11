//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://maple:" + process.env.MONGO_PASSWORD + "@webdevexercise.bk5lv.mongodb.net/todolistDB");


const listSchema = new mongoose.Schema({todo: String});
const dynamicSchema = new mongoose.Schema({
    name: String,
    items: [listSchema]
})
const Item = new mongoose.model("Item", listSchema);
const List = new mongoose.model("list", dynamicSchema);

// Close function
const close = () => {
    mongoose.connection.close(function (err) {
        err ? console.log(err) : console.log('mongo closed.');
    })
}


// insert function
const addItem = (list) => {
    Item.insertMany(list, function (err, docs) {
        err ? console.log(err) : console.log(`Insert ${docs.length} items`);
    });
}


const defaultItems = [
    new Item({todo: "Welcome to your todo list!"}),
    new Item({todo: "Hit the + button to add a new item."}),
    new Item({todo: "<-- Hit this to delete an item."})
]


app.get("/", function (req, res) {
    Item.find({}, function (err, itemsFound) {
        if (itemsFound.length === 0) {
            // add default items
            addItem(defaultItems);
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: itemsFound});
        }
    });
});

app.get("/:name", function (req, res) {
    const custName = req.params.name;
    List.findOne({name: custName}, function (err, itemsFound) {
        if (!itemsFound) {
            const newList = new List({name: custName, items: defaultItems})
            newList.save();
            res.redirect("/" + custName);
        } else {
            res.render("list", {listTitle: itemsFound.name, newListItems: itemsFound.items})
        }
    });
})

app.post("/", function (req, res) {

    const item = new Item({todo: req.body.newItem});
    const listName = req.body.list;
    List.findOne({name: listName}, function (err, listFound){
        if (!err && listName === "Today"){
            addItem([item]);
            res.redirect("/")
        } else {
            listFound.items.push(item);
            listFound.save()
            res.redirect("/" + listName);
        }
    })
});

app.post("/delete", function (req, res) {
    const listName = req.body.listName;
    const id = req.body.checkbox;

    if (listName === "Today") {
        Item.findByIdAndRemove(id, function (err) {
            err ? console.log(err) : console.log("Checked item");
        })
        res.redirect("/");
    } else {
        List.findOneAndUpdate(
            {name: listName},
            {$pull: {items:{_id: id}}},
            function(err, foundList){
                err? console.log(err) : res.redirect("/" + listName);
            });
    }

})

app.get("/about", function (req, res) {
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});
