import * as assignmentService from '../services/assignmentService.js';

export const assignUser = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    const assignment = await assignmentService.assignUser(taskId, userId);

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTaskUsers = async (req, res) => {
  try {
    const { taskId } = req.params;

    const users = await assignmentService.getUsersByTask(taskId);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};