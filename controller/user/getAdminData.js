import { Messages } from "../../model/messageModel.js";
import { USER } from "../../model/userModel.js";
import { Visitors } from "../../model/visitorModel.js";
import { internalServerError } from "../../utils/errorUtils.js";

export const getAdminData = async (req, res) => {
  const email = req.email;
  try {
    const user = await USER.findOne({ email }).populate("messages");
    //   .populate({
    //     path: "messages",
    //     model: "Messages",
    //     select: {},
    //     match: { to: email },
    //   })
    //   .populate({
    //     path: "visitors",
    //     model: "Visitors",
    //     select: {},
    //     match: { adminEmail: email },
    //   });
    console.log("Fetched user data", user);
    return res.json({ user });
  } catch (err) {
    return internalServerError(res);
  }
};
