import { USER } from "../model/userModel.js";

export const updateProjects = async (req, res, next) => {
  const email = req.email;
  const { id, ...projectData } = req.body;
  console.log(email);
  try {
    const user = await USER.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProjectIndex = user.projects.findIndex(
      (project) => project.id === id
    );

    if (existingProjectIndex !== -1) {
      user.projects[existingProjectIndex] = {
        ...user.projects[existingProjectIndex],
        ...projectData,
      };
    } else {
      // Add new project
      user.projects.push({ id, ...projectData });
    }

    await user.save();

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error("Error updating projects:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
