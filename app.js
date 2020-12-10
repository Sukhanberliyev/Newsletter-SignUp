const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = " https://us7.api.mailchimp.com/3.0/lists/87338b4cab";

    const options = {
        method: "POST", 
        auth: "Aidar1:5e5bd85fed8b466d232835419c00eb11-us7"
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function() {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})






// API Keys
// 5e5bd85fed8b466d232835419c00eb11-us7

// List ID
// 87338b4cab