import { SECRET_KEY } from "./envs.js";
import jwt from "jsonwebtoken";
export const findOne = async (model, obj) => {
  return await model.findOne(obj);
};

export const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { ...payload },
      SECRET_KEY,
      { expiresIn: 864000 }, // setting expiry to 10 days
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
