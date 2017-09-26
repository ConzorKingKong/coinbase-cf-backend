var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var axios = require("axios")
var PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/', function(request, response) {
  axios.get("https://api.coinbase.com/v2/accounts", {
    headers: {
      Authorization: "Bearer " + request.body.authentications.account.token.token
    }
  })
  .then(function(promiseResponse, error) {
    if (promiseResponse) {
      request.body.install.options.bitcoin = parseFloat(promiseResponse.data.data[0].balance.amount)
      response.status(200).send({install: request.body.install, proceed: true})
    }
  })
  .catch(function(error) {
    console.log("error ", error)
  })
})

app.listen(PORT, function() {
  console.log("running on port " + PORT)
})