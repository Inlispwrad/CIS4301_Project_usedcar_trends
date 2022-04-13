const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});

function GoToTrendAnalyzer() {
  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/TrendAnalyzer.html");
  });
}
