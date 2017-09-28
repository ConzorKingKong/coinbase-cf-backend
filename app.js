var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var simpleFetch = require("simple-fetch")
var PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/', function(request, response) {
  var type = request.body.authentications.account.token.type
  type = type.charAt(0).toUpperCase() + type.slice(1)

  var token = request.body.authentications.account.token.token

  simpleFetch.getJson("https://api.coinbase.com/v2/accounts", {
    headers: {
      Authorization: `${type} ${token}`
    }
  })
  .then(function(promiseResponse, error) {
    if (promiseResponse) {
      var options = request.body.install.options
      var amount = promiseResponse.data[0].balance.amount
      options.bitcoin = parseFloat(amount)
      response.json({install: request.body.install, proceed: true})
    }
  })
})

app.listen(PORT, function() {
  console.log("running on port " + PORT)
})