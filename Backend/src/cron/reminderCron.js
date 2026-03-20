import cron from 'node-cron';
import * as reminderService from '../services/reminderService.js';
import pool from '../config/db.js';

export const startReminderJob = () => {

  // chạy mỗi phút
  cron.schedule('* * * * *', async () => {
    console.log('Checking reminders...');

    try {
      // ======================
      // 1. REMINDER LOGIC
      // ======================
      const reminders = await reminderService.getPendingReminders();

      for (const r of reminders) {
        console.log(`Send reminder to ${r.email}: ${r.title}`);
        await reminderService.markAsSent(r.id);
      }

      // ======================
      // 2. SMART PRIORITY UPDATE 🔥
      // ======================
      await pool.query(`
        UPDATE tasks
        SET priority_score =
          CASE
            WHEN deadline < NOW() THEN 100
            WHEN deadline < NOW() + INTERVAL '1 day' THEN 80
            WHEN deadline < NOW() + INTERVAL '3 days' THEN 60
            ELSE 30
          END
      `);

      console.log('Priority updated');

    } catch (err) {
      console.error(err.message);
    }
  });

};