import { USER } from "../model/userModel.js";
import { invalidreq } from "../utils/errorUtils.js";

export const getUser = async (req, res, next) => {
  const email = req.params.email;
  console.log({ email }, "sddddd");
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return invalidreq(400, "User not found");
    }
    const userObj = { ...user._doc };
    delete userObj.password;
    console.log({ ...user });
    res.json({ ...userObj });
  } catch (err) {}
};
