const express = require("express");
const axios = require("axios");

function filter(req, res, next) {
  console.log("filter");

  axios
    .get("https://httpstat.us/500")
    .then((response) => {
      console.log("response=", response.data);
      next();
    })
    .catch((error) => {
      console.log("error=", error);
      res.sendStatus(502);
    });
}

function sleep(req, res, next) {
  console.log("sleep");
  setTimeout(next, 10000);
}

function checkhttpstat() {
  console.log("checkhttpstat");
  axios
    .get("https://httpstat.us/200")
    .then((response) => {
      console.log("200 response=", response.data);
    })
    .catch((error) => {
      console.log("error=", error);
      res.sendStatus(500);
    });
}

const app = express();

app.use(sleep);
app.get("/", (req, res) => {
  console.log("get");
  checkhttpstat();
  console.log("return Hello World");
  res.send("Hello World!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("App listening on port: " + port);
});
