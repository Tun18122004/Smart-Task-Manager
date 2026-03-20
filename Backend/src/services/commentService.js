import pool from '../config/db.js';

export const createComment = async (taskId, userId, content) => {
  const result = await pool.query(
    `INSERT INTO comments (task_id, user_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [taskId, userId, content]
  );

  return result.rows[0];
};

export const getCommentsByTask = async (taskId) => {
  const result = await pool.query(
    `SELECT c.id, c.content, c.created_at, u.name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.task_id = $1
     ORDER BY c.created_at DESC`,
    [taskId]
  );

  return result.rows;
};