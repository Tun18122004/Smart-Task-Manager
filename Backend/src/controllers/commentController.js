import * as commentService from '../services/commentService.js';

export const createComment = async (req, res) => {
  try {
    const { taskId, content } = req.body;

    const comment = await commentService.createComment(
      taskId,
      req.user.id,
      content
    );

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await commentService.getCommentsByTask(taskId);

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};