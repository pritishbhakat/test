const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https=require("https");

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

//  let datta= {
//     "responses": [
//       {
//         "response_id": "string",
//         "submitted_at": "2019-08-24T14:15:22Z",
//         "contact": {
//           "email_id": email,
//           "contact_id": "string",
//           "status": "Subscribed",
//           "email": "string",
//           "full_name": firstName+lastName,
//           "consents_to_one_to_one_messaging": true,
//           "avatar_url": "string"
//         },
//         "is_new_contact": true
//       }
//     ],
//     "total_items": 0,
//     "_links": [
//       {
//         "rel": "string",
//         "href": "string",
//         "method": "GET",
//         "targetSchema": "string",
//         "schema": "string"
//       }
//     ]
//   }

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
  const urll = "https://us8.api.mailchimp.com/3.0/ping/e04d0d2b52";
  const url="https://$us8.api.mailchimp.com/3.0/ping/sky:5252961267664553ba2397fcb1010fa7-us8";
  const options = {
    method: "POST",
    auth: "sky:5252961267664553ba2397fcb1010fa7-us8"
  }

 
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);

  request.end();
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

//5252961267664553ba2397fcb1010fa7-us8 api
//e04d0d2b52 list id
//e04d0d2b52