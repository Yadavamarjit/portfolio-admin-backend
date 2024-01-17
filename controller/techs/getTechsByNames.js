import { Tech } from "../../model/techModel.js";

export const getTechsByName = async (req, res) => {
  try {
    const techNames = req.params.techs.split(",");
    const techs = await Tech.find({ name: { $in: techNames } });

    const formattedTechs = techs.map((tech) => ({
      name: tech.name,
      img: tech.img,
    }));

    res.status(200).json(formattedTechs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
