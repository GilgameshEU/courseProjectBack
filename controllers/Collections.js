import Collection from "../models/UserModel.js";

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      attributes: ["id", "name", "description", "theme", "image_url", "createdAt", "updatedAt"],
    });
    res.json(collections);
  } catch (error) {
    console.log(error);
  }
};
