const express = require("express");
const router = express.Router();
const path = require("path");
const uFuncs = require("../taskSolutions/utilitiesFunctions.js");
const TASKS = require("../taskSolutions/taskMain.js");
const dataV = require("../taskSolutions/dataValidation.js");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("tasksViews/tasksMain", { pageTitle: "Introduction" });
});

router.get("/:taskId", function (req, res, next) {
  let queryInput = req.query.input;
  if (uFuncs.isJson(queryInput)) {
    queryInput = JSON.parse(queryInput);
  }

  const taskID = req.params.taskId;
  console.log("taskId", taskID);
  const isWholeNum = dataV.validateIsWholeNum([taskID]);
  const isInRange = dataV.validateThreshold([taskID], 1, 6);
  if (!isWholeNum || !isInRange) {
    res.redirect("/eulerTasks");
  }
  const taskIdFunc = {
    1: TASKS.task1,
    2: TASKS.task2,
    3: TASKS.task3,
    4: TASKS.task4,
    5: TASKS.task5,
    6: TASKS.task6,
  };

  const taskMap = {
    1: 29,
    2: 46,
    3: 80,
    4: 76,
    5: 112,
    6: 114,
  };

  let taskDefParams = {
    1: [2, 100],
    2: [10000],
    3: [100],
    4: [100],
    5: [99],
    6: [{ x: 0, y: 10.1 }, { x: 1.4, y: -9.6 }, -0.01, 0.01],
  };

  const taskFunc = taskIdFunc[taskID];
  const defParams = taskDefParams[taskID];
  let finalInput = queryInput ? queryInput : defParams;

  if (taskID == 6 && queryInput) {
    finalInput = [
      { x: finalInput[0], y: finalInput[1] },
      { x: finalInput[2], y: finalInput[3] },
      finalInput[4],
      finalInput[5],
    ];
  } else if (taskID == 6) {
    finalInput = [finalInput[0], finalInput[1], finalInput[2], finalInput[3]];
  }

  taskDefParams[taskID] = finalInput;

  console.log("finalInput", finalInput);
  const taskParamTxt = {
    1: " where (a, b) = (" + taskDefParams[1].join(", ") + ")",
    3: " where n = " + taskDefParams[3].join(", "),
    4: " where n = " + taskDefParams[4].join(", "),
    5: " where n = " + taskDefParams[5].join(", "),
    6:
      " where (x1, y1) = (" +
      taskDefParams[6][0].x +
      ", " +
      taskDefParams[6][0].y +
      "), (x2, y2) = (" +
      taskDefParams[6][1].x +
      ", " +
      taskDefParams[6][1].y +
      ") and exit threshold (lx, rx) = (" +
      taskDefParams[6][2] +
      ", " +
      taskDefParams[6][3] +
      ")",
  };

  console.log("taskParamTxt", taskParamTxt);
  const answer = queryInput ? taskFunc(...finalInput) : taskFunc(...defParams);
  console.log("answer", answer);
  res.render("tasksViews/tasksMain", {
    ans: answer,
    taskId: taskID,
    pageTitle: "Task " + taskMap[taskID],
    paramTxt: taskParamTxt[taskID],
  });
});

router.get("/params/", (req, res, next) => {
  res.render("tasksViews/tasksMain", { pageTitle: "Introduction" });
});

module.exports = router;
