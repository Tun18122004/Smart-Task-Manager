import pool from '../config/db.js';
import { calculatePriority } from './priorityService.js';

export const getAllTasks = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM tasks WHERE created_by = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

export const createTask = async (data, userId) => {
  const { title, description, deadline } = data;

  const priority = calculatePriority(deadline);

  const result = await pool.query(
    `INSERT INTO tasks (title, description, deadline, created_by, priority_score)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, deadline, userId, priority]
  );

  return result.rows[0];
};

export const updateTask = async (taskId, data, userId) => {
  const { title, description, status, deadline } = data;

  const priority = calculatePriority(deadline);

  const result = await pool.query(
    `UPDATE tasks
     SET title = $1,
         description = $2,
         status = $3,
         deadline = $4,
         priority_score = $5
     WHERE id = $6 AND created_by = $7
     RETURNING *`,
    [title, description, status, deadline, priority, taskId, userId]
  );

  return result.rows[0];
};

export const deleteTask = async (taskId, userId) => {
  await pool.query(
    `DELETE FROM tasks WHERE id = $1 AND created_by = $2`,
    [taskId, userId]
  );
};