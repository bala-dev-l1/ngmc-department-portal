// src/routes/adminRoutes.ts
import express from 'express';
import { verifyToken, allowRoles } from '../middleware/auth';
import {
  getAdminProfile,
  createUser,
  viewAllUsers,
  deleteUser,
  updateUserRole
} from '../controllers/adminController'; 


const router = express.Router();

// Protect all routes with auth and admin role
router.use(verifyToken, allowRoles('admin'));

// Admin functionalities
router.get('/profile', getAdminProfile);
router.post('/create-user', createUser);
router.get('/users', viewAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

export default router;
