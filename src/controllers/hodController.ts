// src/controllers/hodController.ts
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/user';
import { LeaveRequest } from '../models/leaveRequest';
import { Performance } from '../models/performance';
import { Assignment } from '../models/assignment';

export const getHODProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const hod = await User.findById(req.user?.userId).select('-password');
    if (!hod) return res.status(404).json({ message: 'HOD not found' });
    return res.status(200).json(hod);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch profile', error: err });
  }
};

export const approveLeaveRequest = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { leaveId } = req.params;
    const leave = await LeaveRequest.findById(leaveId);
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });
    leave.status = 'approved';
    await leave.save();
    return res.status(200).json({ message: 'Leave request approved' });
  } catch (err) {
    return res.status(500).json({ message: 'Error approving leave', error: err });
  }
};

export const manageFacultyAccess = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { email, role } = req.body;
    const faculty = await User.findOne({ email });
    if (!faculty || faculty.role !== 'faculty') return res.status(404).json({ message: 'Faculty not found' });
    faculty.role = role;
    await faculty.save();
    return res.status(200).json({ message: 'Faculty access updated' });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating access', error: err });
  }
};

export const viewAllStudentPerformance = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const performanceData = await Performance.find();
    return res.status(200).json(performanceData);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching performance', error: err });
  }
};

export const viewAllAssignments = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const assignments = await Assignment.find();
    return res.status(200).json(assignments);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching assignments', error: err });
  }
};