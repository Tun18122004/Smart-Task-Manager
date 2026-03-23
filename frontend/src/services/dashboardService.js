import { api } from "./api";

export const getAllTasks = () => api.get("/tasks");

// nếu có API riêng thì dùng, chưa có thì dùng chung
export const getActivities = () => api.get("/activity-logs");
export const getComments = () => api.get("/comments");