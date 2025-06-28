// src/models/LeaveRequest.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaveRequest extends Document {
  studentId: mongoose.Types.ObjectId;
  reason: string;
  fromDate: Date;
  toDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const leaveRequestSchema = new Schema<ILeaveRequest>(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

export const LeaveRequest = mongoose.model<ILeaveRequest>('LeaveRequest', leaveRequestSchema);
