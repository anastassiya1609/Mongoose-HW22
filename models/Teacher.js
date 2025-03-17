import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  education: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
