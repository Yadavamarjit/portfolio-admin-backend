import { comparePassword } from "../utils/passwordUtils.js";
import { USER } from "../model/userModel.js";
import { findOne } from "../utils/genralUtils.js";
import { SECRET_KEY } from "../utils/envs.js";
import jwt from "jsonwebtoken";

export const checkUserAlreadExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await findOne(USER, { email });
    if (user) {
      return res
        .status(400)
        .json({ err: "User with this email already exists", user });
    }
    return next();
  } catch (err) {
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

export const checkUserCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findOne(USER, { email });
    console.log(user);
    if (user) {
      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ err: "Entered password is incorrect", isPasswordCorrect });
      }
      const { name } = user;
      req.user = { email, name };
      return next();
    }
    return res.status(400).json({ err: "User is not registered" });
  } catch (err) {
    return res.status(500).json({ err: "Internal server error" });
  }
};

export const authenticateUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ err: "Authorization token not found" });
  }

  // Verify the token and extract user information
  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.email = decodedToken.email;
    console.log(decodedToken.email);
    return next();
  });
};
