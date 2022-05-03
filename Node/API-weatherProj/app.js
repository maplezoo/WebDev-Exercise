const express = require("express");
const https = require("https");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res){
    const city =  req.body.cityName;
    const apiKey = ""
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + city.replace(" ", "%20") +
        "&appid=" + apiKey +
        "&units=" + units;
    https.get(url, function (respond) {
        respond.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<p>The current weather in " + city + " is " + description + "</p>");
            res.write("<h1>Tempeture in " + city + " is " + temp + " degrees.</h1>");
            res.write("<img src =" + icon + ">");
            res.send();
        })
    })
})


app.listen(3000, function (){

})
