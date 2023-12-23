import { USER } from "../model/userModel.js";
import { Visitors } from "../model/visitorModel.js";
import { internalServerError, invalidreq } from "../utils/errorUtils.js";

export const addVisitor = async (req, res, next) => {
  const { adminEmail } = req.body;
  console.log({ "body---------": req.body });
  try {
    const user = await USER.findOneAndUpdate(
      { email: adminEmail },
      { $inc: { visits: 1 } },
      { new: true }
    );
    if (!user) {
      return invalidreq(400, { err: "User didn't exists ", res });
    }
    const visitor = await Visitors.create({ ...req.body });
    console.log({ visitor });
    res.json({ id: visitor._doc._id });
    if (!visitor) {
      return invalidreq(400, { err: "" }, res);
    }
  } catch (err) {
    console.error("Error while adding visitor", err);
    return internalServerError(res);
  }
};
