import { Tech } from "../../model/techModel.js";
import { internalServerError } from "../../utils/errorUtils.js";

export const getTechs = async (req, res) => {
  try {
    const techs = await Tech.find({});
    res.json({ data: techs });
  } catch (err) {
    console.log("Error in sending all techs", err);
    internalServerError(res);
  }
};
