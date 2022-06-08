let { tasks } = require("../tasks");

const getAllTasks = (req, res) => {
  res.status(200).json({ success: true, data: tasks });
};

const createTask = (req, res) => {};

const modifyTask = (req, res) => {};

const deleteTask = (req, res) => {};

module.exports = { getAllTasks, createTask, modifyTask, deleteTask };
