import db from "../config/db.js";

export const getActivities = async () => {
  const result = await db.query(`
    SELECT 
      al.id,
      al.action,
      al.created_at,
      u.name as user_name,
      t.title as task_title
    FROM activity_logs al
    LEFT JOIN users u ON al.user_id = u.id
    LEFT JOIN tasks t ON al.task_id = t.id
    ORDER BY al.created_at DESC
    LIMIT 10
  `);

  return result.rows;
};