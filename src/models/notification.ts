// src/models/Notification.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  title: string;
  message: string;
  target: 'student' | 'faculty' | 'hod' | 'admin' | 'all';
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    target: { type: String, enum: ['student', 'faculty', 'hod', 'admin', 'all'], required: true }
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
