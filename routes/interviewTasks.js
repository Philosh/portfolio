const express = require("express");
const router = express.Router();
const path = require("path");
const TASKS = require("../taskSolutions/taskMain.js");
const dataV = require("../taskSolutions/dataValidation.js");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("tasksViews/tasksMain", { pageTitle: "Introduction" });
});

router.get("/:taskId", function (req, res, next) {
  const taskID = req.params.taskId;
  const isWholeNum = dataV.validateIsWholeNum([taskID]);
  const isInRange = dataV.validateThreshold([taskID], 1, 7);
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
    6: [{ x: 0, y: 10.1 }, { x: 1.4, y: -9.6 }, -0.01, 0.01],
    7: [],
  };

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
