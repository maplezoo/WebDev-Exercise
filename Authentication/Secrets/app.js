//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate')
const session = require('express-session')
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    secrets: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = new mongoose.model("User", userSchema);

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets"

    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/secrets"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({
            facebookId: profile.id
        }, function(err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })

        req.login(newUser, function(err) {
            if (err) { res.redirect("/login") }
            res.redirect("secrets");
        });
    });

/////////////////////////////////////////// REGISTER PAGE ///////////////////////////////////////////
app.route("/register")
    .get(function (req, res) {
        res.render("register")
    })

    .post(function (req, res) {

        User.register({username: req.body.username}, req.body.password, function(err, user) {
            if (err) {
                console.log(err);
                res.render("register")
            }
            passport.authenticate('local')(req, res, function () {
                    res.redirect('/secrets');
                });
        });
    });

/////////////////////////////////////////// SECRETS PAGE ///////////////////////////////////////////
app.route("/secrets")
    .get(function (req, res){
        User.find({"secrets": { $ne: null }}, function (err, foundUsers){
            if (err) console.log(err);
            if (foundUsers){
                res.render("secrets", {userWizSecret: foundUsers});

            }
        })
    });

/////////////////////////////////////////// SUBMIT PAGE ///////////////////////////////////////////
app.route("/submit")
    .get(function (req, res){
        if (req.isAuthenticated()){
            res.render("submit");
        } else {
            res.redirect("/login");
        }
    })

    .post(function (req,res){
        User.findById(req.user.id, function (err, foundUser){
            if (err) console.log(err);
            if (foundUser){
                foundUser.secrets = req.body.secret;
                foundUser.save(function (){
                    res.redirect("secrets");
                })
            } else {
                res.redirect("/login");
            }
        })
    });

/////////////////////////////////////////// LOG OUT PAGE ///////////////////////////////////////////
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

/////////////////////////////////////////// GOOGLE AUTH PAGE ///////////////////////////////////////////
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));



app.get("/auth/:strategy/secrets",
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });


app.listen(3000, function () {
    console.log("Server started on port 3000.");
});

