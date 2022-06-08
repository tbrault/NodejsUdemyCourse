const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  modifyTask,
  deleteTask,
} = require("../controller/tasks");

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/", modifyTask);
router.delete("/", deleteTask);

module.exports = router;
