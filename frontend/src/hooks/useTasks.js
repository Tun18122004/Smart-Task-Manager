import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import * as taskService from "../services/taskService";

export const useTasks = () => {
  const { tasks, setTasks } = useTaskStore();

  const fetchTasks = async () => {
    try {
      const res = await taskService.getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, fetchTasks };
};