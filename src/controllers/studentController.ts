// src/controllers/studentController.ts
import { Request, Response } from 'express';
import { User } from '../models/user';
import { LeaveRequest } from '../models/leaveRequest';
import { Marks } from '../models/marks';
import { Performance } from '../models/performance';
import { Notification } from '../models/notification';
import { AuthRequest } from '../middleware/auth';

export const getStudentProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const student = await User.findById(req.user?.userId).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch profile', error: err });
  }
};

export const applyForLeave = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { reason, fromDate, toDate } = req.body;
  try {
    const leave = new LeaveRequest({
      studentId: req.user?.userId,
      reason,
      fromDate,
      toDate,
      status: 'pending'
    });
    await leave.save();
    return res.status(201).json({ message: 'Leave request submitted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to apply for leave', error: err });
  }
};

export const getAcademicPerformance = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const performance = await Performance.findOne({ studentId: req.user?.userId });
    if (!performance) return res.status(404).json({ message: 'Performance record not found' });
    return res.status(200).json(performance);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch performance', error: err });
  }
};

export const getApprovedMarks = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const marks = await Marks.find({ studentId: req.user?.userId, approved: true });
    return res.status(200).json(marks);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch marks', error: err });
  }
};

export const getNotifications = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const notifications = await Notification.find({ target: 'student' });
    return res.status(200).json(notifications);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch notifications', error: err });
  }
};
