import { ref } from "firebase/storage";
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
        projectName: String,
        description: String,
        projectUrl: String,
        img: String,
        techs: [String],
        id: String,
        link: String,
      },
    ],
    visits: { type: Number, default: 0 },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visitors" }],
  },
  { timestamps: true }
);

export const USER = mongoose.model("USER", user);
