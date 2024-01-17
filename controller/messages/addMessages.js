import mongoose from "mongoose";
import { Messages } from "../../model/messageModel.js";
import { Visitors } from "../../model/visitorModel.js";
import { internalServerError, invalidreq } from "../../utils/errorUtils.js";
import { USER } from "../../model/userModel.js";

export const addMessage = async (req, res) => {
  const { senderName, senderEmail, to, message, visitorId } = req.body;
  try {
    if (!senderName || !senderEmail || !visitorId || !to) {
      return invalidreq(400, { err: "Invalid payload" }, res);
    }
    await Visitors.findByIdAndUpdate(
      visitorId,
      { messaged: true, emailId: senderEmail, name: senderName },
      { new: true }
    );
    console.log("Visitor updated");
    const msg = await Messages.create({
      senderName,
      senderEmail,
      to,
      message,
      visitorId,
    });
    console.log("Message added", msg.id);
    const msgId = new mongoose.Types.ObjectId(msg.id);

    // Adding messageId in user data

    const user = await USER.findOneAndUpdate(
      { email: to },
      { $push: { messages: msgId } },
      { new: true }
    );
    if (!user) {
      invalidreq(409, { err: "user doesn't exists" }, res);
    }
    return res.json({ msg: "Msg send" });
  } catch (error) {
    console.log({ error });
    return internalServerError(res);
  }
};
