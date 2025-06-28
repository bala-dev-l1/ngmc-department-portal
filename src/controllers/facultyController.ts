// src/controllers/facultyController.ts
import { Request, Response } from 'express';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import { Assignment } from '../models/assignment';
import { Performance } from '../models/performance';
import { AcademicCalendar } from '../models/academicCalendar';
import { AuthRequest } from '../middleware/auth';

export const getFacultyProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const faculty = await User.findById(req.user?.userId).select('-password');
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    return res.status(200).json(faculty);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch profile', error: err });
  }
};

export const postNotification = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { title, message, target } = req.body;
  try {
    const notification = new Notification({ title, message, target });
    await notification.save();
    return res.status(201).json({ message: 'Notification sent successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to send notification', error: err });
  }
};

export const evaluateAssignment = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { assignmentId, marks } = req.body;
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    assignment.marks = marks;
    assignment.evaluated = true;
    await assignment.save();
    return res.status(200).json({ message: 'Assignment evaluated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to evaluate assignment', error: err });
  }
};

export const detectPlagiarism = async (req: AuthRequest, res: Response): Promise<Response> => {
  // Placeholder implementation
  return res.status(200).json({ message: 'Plagiarism check simulated (integration pending).' });
};

export const viewStudentPerformance = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { studentId } = req.params;
  try {
    const performance = await Performance.findOne({ studentId });
    if (!performance) return res.status(404).json({ message: 'Performance not found' });
    return res.status(200).json(performance);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch performance', error: err });
  }
};

export const manageAcademicCalendar = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { date, event, order } = req.body;
  try {
    const calendarEntry = new AcademicCalendar({ date, event, order });
    await calendarEntry.save();
    return res.status(201).json({ message: 'Academic calendar updated' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update calendar', error: err });
  }
};

export const assignDayOrder = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { date, newOrder } = req.body;
  try {
    const calendarEntry = await AcademicCalendar.findOne({ date });
    if (!calendarEntry) return res.status(404).json({ message: 'Date entry not found' });
    calendarEntry.order = newOrder;
    await calendarEntry.save();
    return res.status(200).json({ message: 'Day order reassigned' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to assign day order', error: err });
  }
};
