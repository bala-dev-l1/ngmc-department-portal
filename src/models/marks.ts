// src/models/Marks.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMarks extends Document {
  studentId: mongoose.Types.ObjectId;
  subject: string;
  mark: number;
  approved: boolean;
  createdAt: Date;
}

const marksSchema = new Schema<IMarks>(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    mark: { type: Number, required: true },
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Marks = mongoose.model<IMarks>('Marks', marksSchema);
