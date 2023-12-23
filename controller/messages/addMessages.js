import { Messages } from "../../model/messageModel.js";
import { Visitors } from "../../model/visitorModel.js";
import { internalServerError, invalidreq } from "../../utils/errorUtils.js";

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
    await Messages.create({
      senderName,
      senderEmail,
      to,
      message,
      visitorId,
    });
    console.log("Message added");
    return res.json({ msg: "Msg sended" });
  } catch (error) {
    console.log({ error });
    return internalServerError(res);
  }
};
