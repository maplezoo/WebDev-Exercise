const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // the mailchimp need a JSON file
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/"
    const option = {
        method: "POST",
        auth: "maple:a06276b12e24dd17c0aa52bf4ea994c1-us14"
    }

    const request = http.request(url, option, function (response){
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")

        }
        response.on("data", function (data){
            console.log(JSON.parse(data));
        })
    })

// Write data to request body
    request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function (req, res){
    console.log("Server is running on port 3000.");
})

// apiKey
// a06276b12e24dd17c0aa52bf4ea994c1-us14
//
// list id
// 34be844279