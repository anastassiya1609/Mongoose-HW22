import mongoose from "mongoose";

const vaccinationsSchema = new mongoose.Schema(
  {
    vaccineName: {
      type: String,
      required: true,
      trim: true,
    },
    vaccinationYear: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const childrenSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    vaccinations: {
      type: [vaccinationsSchema],
      default: [],
    },
    group:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Group"
    }
  },
  {
    timestamps: true,
  }
);

export const Children = mongoose.model("Children", childrenSchema);
