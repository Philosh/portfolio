const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Displaydd datavis here");
});

module.exports = router;
