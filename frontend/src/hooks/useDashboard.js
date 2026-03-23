import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

export function useDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTasks(); // 🔥 dùng API giống Task page
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const now = new Date();

  const total = tasks.length;

  const doing = tasks.filter((t) => t.status === "doing").length;

  const done = tasks.filter((t) => t.status === "done").length;

  const overdue = tasks.filter(
    (t) =>
      t.deadline &&
      new Date(t.deadline) < now &&
      t.status !== "done"
  ).length;

  const upcoming = tasks
    .filter(
      (t) =>
        t.deadline &&
        new Date(t.deadline) >= now &&
        t.status !== "done"
    )
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  const progress = total
    ? Math.round((done / total) * 100)
    : 0;

  return {
    total,
    doing,
    done,
    overdue,
    upcoming,
    progress,
  };
}