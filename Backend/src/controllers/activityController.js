import * as activityService from "../services/activityService.js";

export const getActivities = async (req, res) => {
  try {
    const data = await activityService.getActivities();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};