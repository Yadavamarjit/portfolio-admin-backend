import mongoose from "mongoose";

const messages = new mongoose.Schema({
  senderName: String,
  senderEmail: String,
  to: String,
  message: String,
  visitorId: String,
  unread: Boolean,
});

export const Messages = mongoose.model("Messages", messages);
