import express from 'express';
import { assignUser, getTaskUsers } from '../controllers/assignmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, assignUser);
router.get('/:taskId', authMiddleware, getTaskUsers);

export default router;