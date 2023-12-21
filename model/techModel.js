import mongoose from "mongoose";

const techSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
});

export const Tech = mongoose.model("Tech", techSchema);
