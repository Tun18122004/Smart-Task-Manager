import pool from '../config/db.js';

export const getDashboard = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status = 'todo') AS todo,
      COUNT(*) FILTER (WHERE status = 'in_progress') AS in_progress,
      COUNT(*) FILTER (WHERE status = 'done') AS done,
      COUNT(*) FILTER (WHERE deadline < NOW() AND status != 'done') AS overdue
    FROM tasks
    WHERE created_by = $1
    `,
    [userId]
  );

  return result.rows[0];
};