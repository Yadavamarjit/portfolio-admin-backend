import { USER } from "../model/userModel.js";

export const getUser = async (req, res, next) => {
  const email = req.params.email;
  console.log({ email });
  try {
    const user = await USER.findOne({ email });
    res.json({ user });
  } catch (err) {}
};
