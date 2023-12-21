import { USER } from "../model/userModel.js";

export const updateBasicInfo = async (req, res) => {
  const email = req.email;
  const {
    name,
    profession,
    profilePic,
    techStacks,
    heading,
    subHeader,
    overView,
  } = req.body;

  try {
    let user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (profession) user.profession = profession;
    if (profilePic) user.profilePic = profilePic;
    if (techStacks) user.techStacks = techStacks;
    if (heading) user.heading = heading;
    if (subHeader) user.subHeader = subHeader;
    if (overView) user.overView = overView;

    await user.save();
    const updatedUser = { ...user._doc };
    delete updatedUser.password;
    return res.json({ ...updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Internal server err" });
  }
};
