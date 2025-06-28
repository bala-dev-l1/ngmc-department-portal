// src/controllers/adminController.ts
import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../middleware/auth';

export const getAdminProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const admin = await User.findById(req.user?.userId).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    return res.status(200).json(admin);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching profile', error: err });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating user', error: err });
  }
};

export const viewAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    await user.save();
    return res.status(200).json({ message: 'User role updated' });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating role', error: err });
  }
};
