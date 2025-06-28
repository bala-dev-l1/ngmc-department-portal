// src/models/Assignment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAssignment extends Document {
  studentId: mongoose.Types.ObjectId;
  subject: string;
  fileUrl: string;
  uploadedAt: Date;
  marks?: number;
  evaluated: boolean;
  plagiarized?: boolean;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    marks: { type: Number },
    evaluated: { type: Boolean, default: false },
    plagiarized: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);