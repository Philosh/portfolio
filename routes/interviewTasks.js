const express = require("express");
const router = express.Router();
const path = require("path");
const TASKS = require("../taskSolutions/taskMain.js");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("tasksViews/tasksMain", { pageTitle: "Introduction" });
});

router.get("/:taskId", function (req, res, next) {
  console.log("taskId", req.params.taskId);
  const taskID = req.params.taskId;
  const isWholeNum = TASKS.validateIsWholeNum([taskID]);
  const isInRange = TASKS.validateThreshold([taskID], 1, 7);
  if (!isWholeNum || !isInRange) {
    res.redirect("/tasks");
  }
  const taskIdFunc = {
    1: TASKS.task1,
    2: TASKS.task2,
    3: TASKS.task3,
    4: TASKS.task4,
    5: TASKS.task5,
    6: TASKS.task6,
    7: TASKS.task7,
  };

  const taskDefParams = {
    1: [2, 100],
    2: [10000],
    3: [100],
    4: [100],
    5: [99],
    6: [],
    7: [],
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
  const defParams = taskDefParams[taskID];
  const answer = taskFunc(...defParams);
  console.log("answer", answer);
  res.render("tasksViews/tasksMain", {
    ans: answer,
    taskId: taskID,
    pageTitle: "Task " + taskID,
  });
});

module.exports = router;
