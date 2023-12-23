import { Messages } from "../../model/messageModel.js";
import { internalServerError, invalidreq } from "../../utils/errorUtils";

export const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    await Messages.findByIdAndDelete(messageId);
    return { msg: "Message deleted successfully" };
  } catch (error) {
    return internalServerError(res);
  }
};
