const express = require("express");
const router = express.Router();
const path = require("path");
const tasks = require("../taskSolutions/taskMain.js");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.sendFile(path.resolve("views/tasksViews/tasksIndex.html"));
});

router.get("/1", function (req, res, next) {
  console.log(tasks);
  console.log(tasks.task1(2, "100"));
  res.send({ ans: tasks.task2(1000) });
});

module.exports = router;
