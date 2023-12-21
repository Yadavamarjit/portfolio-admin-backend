import { Tech } from "../model/techModel.js";

export const sendMatchingTechs = async (req, res) => {
  const searchText = req.query.search;
  try {
    const matchingTechs = await Tech.find(
      { name: { $regex: searchText, $options: "i" } },
      "name img"
    );

    res.status(200).json(matchingTechs);
  } catch (error) {
    console.error("Error fetching matching techs:", error);
    res.status(500).json({ error: "Server error" });
  }
};
