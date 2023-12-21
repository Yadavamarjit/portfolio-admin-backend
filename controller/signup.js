import { USER } from "../model/userModel.js";
import { generateToken } from "../utils/genralUtils.js";
import { encryptPassword } from "../utils/passwordUtils.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    generateToken(req.body).then(async (token) => {
      await USER.create({
        name,
        email,
        password: await encryptPassword(password),
      });
      const users = await USER.find({});
      res.cookie("access_token", token, { maxAge: 3600000, httpOnly: true });
      return res.json({ token, user: { name, email }, users });
    });
  } catch (err) {
    return res.status(500).json({ err: "Internal server err" });
  }
};
