const Task = require("../models/Tasks");

const getAllTasks = (req, res) => {
  res.status(200).json({ success: true, data: tasks });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getSingleTask = (req, res) => {};

const updateTask = (req, res) => {};

const deleteTask = (req, res) => {};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
