import Collections from "../models/Collections.js";
import Users from "../models/Users.js";

export const getCollections = async (req, res) => {
  try {
    const collections = await Collections.findAll({
      attributes: ["id", "name", "description", "theme", "image_url", "createdAt", "updatedAt"],
      include: {
        model: Users,
        attributes: ["name"],
      },
    });
    res.json(collections);
  } catch (error) {
    console.log(error);
  }
};
