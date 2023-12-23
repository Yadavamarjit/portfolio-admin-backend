import mongoose from "mongoose";

const visitors = new mongoose.Schema({
  city: String,
  country_name: String,
  country_code: String,
  country_calling_code: String,
  country_capital: String,
  currency: String,
  ip: String,
  latitude: Number,
  longitude: Number,
  state: String,
  adminEmail: String,
  messaged: Boolean,
  emailId: String,
  name: String,
});

export const Visitors = mongoose.model("Visitors", visitors);
