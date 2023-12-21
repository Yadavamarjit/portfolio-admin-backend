import { findOne } from "../utils/genralUtils.js";
import { generateToken } from "../utils/genralUtils.js";
import { USER } from "../model/userModel.js";
export const googleSignIn = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await findOne(USER, { email });

    if (user) {
      generateToken(req.body).then((token) => {
        return res.json({ token, user });
      });
    } else {
      generateToken(req.body).then(async (token) => {
        await USER.create({
          name,
          email,
        });
        res.cookie("access_token", token, { maxAge: 3600000, httpOnly: false });
        return res.json({ token, user: { name, email } });
      });
    }
  } catch (err) {
    return res.status(500).json({ err: "Internal server error" });
  }
};
