var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var axios = require("axios")

app.use(bodyParser.json())

app.post('/', function(req, res) {
  console.log("install", req.body.install)

  axios.get("https://api.coinbase.com/v2/checkouts", {
    headers: {
      Authorization: "Bearer " + req.body.authentications.account.token.token
    }
  })
  .then(function(res, err) {
    if (res) {
      // res.data.data is the list of their current sales available
      console.log(res.data)
    }
  })

  res.status(200).send({install: req.body.install, proceed: true})
})

// app.post("/create", function(req, res) {
//   axios.post("https://api.coinbase.com/v2/checkouts", {

//   },{
//     headers: {
//       Authorization: "Bearer " + req.body.authentications.account.token.token
//     }
//   })
// })

app.listen(4568)