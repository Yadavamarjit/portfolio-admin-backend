import { Tech } from "../model/techModel.js";
import { USER } from "../model/userModel.js";
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
    const email = req.email;
    const { id, imgFor } = req.body;
    if (imgFor === "projects" && id) {
    } else if (imgFor == "experiences" && id) {
    } else {
      const updatedUser = await USER.findOneAndUpdate(
        { email: email },
        { $set: { profilePic: fileUrl } },
        { new: true } //
      );
      if (!updatedUser) {
        return invalidreq(400, { err: "Failed to update image in DB" }, res);
      }
      return res.json({ img: fileUrl });
    }
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};
