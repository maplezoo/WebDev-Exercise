//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption")

const app = express();

mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

// encrypt the password
userSchema.plugin(encrypt, {secret: process.env.SECRET_KEY, encryptedFields:["password"]})

const User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

/////////////////////////////////////////// HOME PAGE ///////////////////////////////////////////
app.route("/")
    .get(function (req, res) {
        res.render("home")
    });

/////////////////////////////////////////// LOGIN PAGE ///////////////////////////////////////////
app.route("/login")
    .get(function (req, res) {
        res.render("login")
    })

    .post(function (req, res) {
        User.findOne({email: req.body.username}, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                (req.body.password === user.password) ? res.render("secrets") : res.send("Wrong password");
            } else {
                res.send("User did not found")
            }
        })
    });

/////////////////////////////////////////// REGISTER PAGE ///////////////////////////////////////////
app.route("/register")
    .get(function (req, res) {
        res.render("register")
    })

    .post(function (req, res) {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        })
        newUser.save(function (err) {
            err ? res.send(err) : res.render("secrets");
        })
    });


app.listen(3000, function () {
    console.log("Server started on port 3000.");
});
