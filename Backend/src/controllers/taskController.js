import * as taskService from '../services/taskService.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.updateTask(
      id,
      req.body,
      req.user.id
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await taskService.deleteTask(id, req.user.id);

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};