import Items from "../models/Items.js";

export const getCollectionItems = async (req, res) => {
  try {
    const items = await Items.findAll({ where: { collectionId: req.params.id } });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
