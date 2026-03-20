import pool from '../config/db.js';

export const assignUser = async (taskId, userId) => {
  const result = await pool.query(
    `INSERT INTO task_assignments (task_id, user_id)
     VALUES ($1, $2)
     RETURNING *`,
    [taskId, userId]
  );

  return result.rows[0];
};

export const getUsersByTask = async (taskId) => {
  const result = await pool.query(
    `SELECT u.id, u.name, u.email
     FROM task_assignments ta
     JOIN users u ON ta.user_id = u.id
     WHERE ta.task_id = $1`,
    [taskId]
  );

  return result.rows;
};