const express = require("express");
const router = express.Router();
const path = require("path");
const TASKS = require("../taskSolutions/taskMain.js");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("tasksViews/tasksMain");
});

router.get("/:taskId", function (req, res, next) {
  console.log("params", req.params.taskId);
  const taskID = req.params.taskId;
  const taskIdFunc = {
    1: TASKS.task1,
    2: TASKS.task2,
    3: TASKS.task3,
    4: TASKS.task4,
    5: TASKS.task5,
    6: TASKS.task6,
    7: TASKS.task7,
  };
  //const answer1 = TASKS.task1(2, "100");
  //console.log("answer1", answer1);

  //const answer2 = TASKS.task2(10000);
  //console.log("answer2", answer2);

  // const answer3 = TASKS.task3(100);
  // console.log("answer3", answer3);

  // const answer4 = TASKS.task4(100);
  // console.log(("answer4", answer4));

  const taskFunc = taskIdFunc[taskID];
  const answer = taskFunc(2, "100");
  console.log("answer", answer);
  const answer1 = TASKS.task1(2, "100");
  console.log("answer5", answer1);
  res.render("tasksViews/tasksMain", { ans: answer });
});

module.exports = router;
