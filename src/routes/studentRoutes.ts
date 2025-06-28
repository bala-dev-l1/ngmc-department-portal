// src/routes/studentRoutes.ts
import express from 'express';
import { verifyToken, allowRoles } from '../middleware/auth';
import {
  getStudentProfile,
  applyForLeave,
  getAcademicPerformance,
  getApprovedMarks,
  getNotifications
} from '../controllers/studentController';

const router = express.Router();

// All routes are protected and accessible only by 'student' role
router.use(verifyToken, allowRoles('student'));

router.get('/profile', getStudentProfile);
router.post('/leave', applyForLeave);
router.get('/performance', getAcademicPerformance);
router.get('/marks', getApprovedMarks);
router.get('/notifications', getNotifications);

export default router;
