import { internalServerError, invalidreq } from "../../utils/errorUtils";

export const updateMessage = async (req, res) => {
  const msgId = req.params.id;

  try {
    const msg = await Messages.findByIdAndUpdate(
      msgId,
      { unread: false },
      { new: true }
    );
    if (!msg) {
      return invalidreq(400, { err: "Invalid payload", res });
    }
    return res.json({ msg: "Unread status updated successfully" });
  } catch (err) {
    return internalServerError(res);
  }
};
