import { USER } from "../model/userModel.js";
import { internalServerError, invalidreq } from "../utils/errorUtils.js";

export const updateVisits = async (req, res, next) => {
  const email = req.param.email;
  try {
    const user = await USER.findOneAndUpdate(
      { email },
      { $inc: { visits: 1 } },
      { new: true }
    );
    if (!user) return invalidreq(400, { err: "User didn't exists" }, res);
    console.log("Visit updated");
    return res.json({ msg: "Updated visit" });
  } catch (err) {
    console.log("Internal server error", err);
    return internalServerError(res);
  }
};
