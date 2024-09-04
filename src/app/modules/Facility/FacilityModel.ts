import mongoose from "mongoose";
import { TFaculty } from "./FacilityInterface";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: "",
  },
});

export const Faculty = mongoose.model<TFaculty>("Faculty", facultySchema);
