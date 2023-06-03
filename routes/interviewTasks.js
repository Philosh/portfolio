const express = require("express");
const router = express.Router();
const path = require("path");
const TASKS = require("../taskSolutions/taskMain.js");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.sendFile(path.resolve("views/tasksViews/tasksIndex.html"));
});

router.get("/1", function (req, res, next) {
  //const answer1 = TASKS.task1(2, "100");
  //console.log("answer1", answer1);

  //const answer2 = TASKS.task2(10000);
  //console.log("answer2", answer2);

  // const answer3 = TASKS.task3(100);
  // console.log("answer3", answer3);

  const answer4 = TASKS.task4(100);
  console.log(("answer4", answer4));
  res.render("tasksViews/tasksDev", { ans: answer4 });
});

module.exports = router;
