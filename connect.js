import mongoose from "mongoose";
import { DB_URI } from "./utils/envs.js";
export function connectToMongoDB() {
  return mongoose.connect(DB_URI);
}
