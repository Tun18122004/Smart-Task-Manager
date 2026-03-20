import pool from '../config/db.js';

export const getPendingReminders = async () => {
  const result = await pool.query(
    `SELECT r.id, r.remind_at, t.title, u.email
     FROM reminders r
     JOIN tasks t ON r.task_id = t.id
     JOIN users u ON t.created_by = u.id
     WHERE r.remind_at <= NOW() AND r.is_sent = false`
  );

  return result.rows;
};

export const markAsSent = async (id) => {
  await pool.query(
    `UPDATE reminders SET is_sent = true WHERE id = $1`,
    [id]
  );
};