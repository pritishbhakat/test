const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("Static"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;
  console.log(firstName, lastName, email);

  var data = {
    "members": [
      {
        email_address: email,
        status: "subscribed",
        merge_field: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us8.mailchimp.com/3.0/lists/e04d0d2b52";
  const options = {
    method: "POST",
    auth: "sky:5252961267664553ba2397fcb1010fa7-us8"
  }


  const request = https.request(url, options, function (response) {
    let data = "";
    response.on("data", function (chunk) {
      data += chunk;
    });
    response.on("end", function () {
      if (response.statusCode === 200) {
        try {
          console.log(JSON.parse(data));
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Mailchimp API request failed with status code", response.statusCode);
      }
    });
  });

  request.on("error", function (error) {
    console.error(error);
  });

  request.write(jsonData);

  request.end();
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
