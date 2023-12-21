import mongoose from "mongoose";
const user = new mongoose.Schema(
  {
    name: String,
    profession: String,
    profilePic: String,
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    techStacks: [String],
    heading: String,
    subHeader: String,
    overView: String,
    roles: [String],
    experiences: [
      {
        role: String,
        companyName: String,
        companyLogo: String,
        roleDetails: String,
        joiningDate: String,
        lastDate: String,
        id: String,
      },
    ],
    projects: [
      {
        name: String,
        desc: String,
        projectUrl: String,
        img: String,
        techs: [String],
        id: Number,
      },
    ],
    visits: { type: Number, default: 0 },
    messages: [{ senderName: String, senderEmail: String, msg: String }],
  },
  { timestamps: true }
);

export const USER = mongoose.model("USER", user);
