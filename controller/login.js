import { generateToken } from "../utils/genralUtils.js";

export const login = async (req, res) => {
  try {
    const { user } = req;
    const token = await generateToken({ ...user });
    res.cookie("token", token, { maxAge: 3600000, httpOnly: false });
    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ err: "Internal server error" });
  }
};
