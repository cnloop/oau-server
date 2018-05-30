var express = require("express");
var axios = require("axios");

var app = express();

// parse application/x-www-form-urlencoded
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});

app.get("/login", function(req, res) {
  if (req.query) {
    axios({
      method: "post",
      url: "https://github.com/login/oauth/access_token",
      headers: { accept: "application/json" },
      data: {
        client_id: "8a98ceca42bdf7bd689e",
        client_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        code: req.query.code
      }
    })
      .then(function(response) {
        console.log(response.data.access_token);
        axios
          .get("https://api.github.com/user", {
            params: {
              access_token: response.data.access_token
            }
          })
          .then(function(response) {
            res.redirect("http://127.0.0.1:8080/#/login?id=33");
            // res.json(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

app.listen(3000, function() {
  console.log("app is running...");
});
