// src/routes/hodRoutes.ts
import express from 'express';
import { verifyToken, allowRoles } from '../middleware/auth';
import {
  getHODProfile,
  approveLeaveRequest,
  manageFacultyAccess,
  viewAllStudentPerformance,
  viewAllAssignments
} from '../controllers/hodController';

const router = express.Router();

// HOD only routes
router.use(verifyToken, allowRoles('hod'));

router.get('/profile', getHODProfile);
router.put('/approve-leave/:leaveId', approveLeaveRequest);
router.post('/grant-access', manageFacultyAccess);
router.get('/student-performance', viewAllStudentPerformance);
router.get('/assignments', viewAllAssignments);

export default router;
