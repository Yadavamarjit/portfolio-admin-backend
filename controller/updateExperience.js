import { USER } from "../model/userModel.js";

export const updateExperience = async (req, res) => {
  const userEmail = req.email;
  const { experience, id } = req.body;

  try {
    const user = await USER.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (experience) {
      const existingExperienceIndex = user.experiences.findIndex(
        (exp) => exp.id === id
      );

      if (existingExperienceIndex !== -1) {
        user.experiences[existingExperienceIndex] = { ...experience };
      } else {
        user.experiences.push({ ...experience });
      }

      await user.save();

      return res
        .status(200)
        .json({ message: "Experience added/updated successfully", user });
    } else {
      return res.status(400).json({ message: "Invalid data for experience" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
