import mongoose from "mongoose";
import { USER } from "../model/userModel.js";
import { Visitors } from "../model/visitorModel.js";
import { internalServerError, invalidreq } from "../utils/errorUtils.js";

export const addVisitor = async (req, res, next) => {
  const { adminEmail } = req.body;
  console.log({ "body---------": req.body });
  try {
    const visitor = await Visitors.create({ ...req.body });
    console.log({ visitor });
    const visitorId = new mongoose.Types.ObjectId(visitor.id);

    const user = await USER.findOneAndUpdate(
      { email: adminEmail },
      { $inc: { visits: 1 }, $push: { visitors: visitorId } },
      { new: true }
    );

    if (!user) {
      return invalidreq(400, { err: "User didn't exists ", res });
    }

    res.json({ id: visitor.id });
    if (!visitor) {
      return invalidreq(400, { err: "" }, res);
    }
  } catch (err) {
    console.error("Error while adding visitor", err);
    return internalServerError(res);
  }
};
