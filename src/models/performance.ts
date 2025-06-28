// src/models/Performance.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPerformance extends Document {
  studentId: mongoose.Types.ObjectId;
  semester: string;
  GPA: number;
  attendance: number; // percentage
  remarks?: string;
  createdAt: Date;
}

const performanceSchema = new Schema<IPerformance>(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    semester: { type: String, required: true },
    GPA: { type: Number, required: true },
    attendance: { type: Number, required: true },
    remarks: { type: String }
  },
  { timestamps: true }
);

export const Performance = mongoose.model<IPerformance>('Performance', performanceSchema);
