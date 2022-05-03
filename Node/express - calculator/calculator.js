
const express = require("express");
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req,res){
    console.log(req.body);
    res.send("Thank you");
})

app.get("/bmicalculator", function (req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator", function (req, res){
  var w = Number(req.body.w);
  var h = Number(req.body.h);
  var bmi = Math.round( w / (h * h));
  res.send("Your BMI is " + bmi);
})

app.listen(3000, function (){
    console.log("Server start on port 3000");
})