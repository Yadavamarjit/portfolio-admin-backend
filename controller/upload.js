import { Tech } from "../model/techModel.js";
import { internalServerError, invalidreq } from "../utils/errorUtils.js";

export const uploadTech = async (req, res, next) => {
  try {
    await Tech.create({ name: req.body.name, img: req.fileUrl });
    return res.json({ name: req.body.name, url: req.fileUrl });
  } catch {
    return internalServerError(res);
  }
};

export const uploadUserImages = async (req, res) => {
  try {
    const fileUrl = req.fileUrl;
    return res.json({ img: fileUrl });
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};
