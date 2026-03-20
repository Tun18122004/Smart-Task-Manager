import * as dashboardService from '../services/dashboardService.js';

export const getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboard(req.user.id);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};