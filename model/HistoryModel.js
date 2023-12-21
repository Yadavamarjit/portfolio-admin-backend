import mongoose from "mongoose";

const history = new mongoose.Schema({});

export const HISTORY = mongoose.model("HISTORY", history);
