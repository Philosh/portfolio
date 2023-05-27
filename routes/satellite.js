var express = require("express");
var router = express.Router();
const path = require("path");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.sendFile(path.resolve("views/satellite.html"));
});

module.exports = router;
