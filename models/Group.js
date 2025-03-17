import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  childrens: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Children",
    default: [],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

export const Group = mongoose.model("Group", groupSchema);
