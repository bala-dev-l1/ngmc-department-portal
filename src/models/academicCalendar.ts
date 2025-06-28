// src/models/AcademicCalendar.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAcademicCalendar extends Document {
  date: Date;
  event: string;
  order?: number; // Represents day order (1–6)
}

const academicCalendarSchema = new Schema<IAcademicCalendar>(
  {
    date: { type: Date, required: true, unique: true },
    event: { type: String, required: true },
    order: { type: Number, min: 1, max: 6 }
  },
  { timestamps: true }
);

export const AcademicCalendar = mongoose.model<IAcademicCalendar>('AcademicCalendar', academicCalendarSchema);
