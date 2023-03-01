import Collections from "../models/Collections.js";
import Users from "../models/Users.js";
import Items from "../models/Items.js";
import Themes from "../models/Themes.js";
import { Sequelize } from "sequelize";
// Получение всех коллекций
export const getCollections = async (req, res) => {
  try {
    const collections = await Collections.findAll({
      attributes: ["id", "name", "description", "themeId", "image", "createdAt", "updatedAt", "userId", [Sequelize.fn("COUNT", Sequelize.col("items.id")), "itemCount"]],
      include: [
        {
          model: Users,
          attributes: ["name"],
        },
        {
          model: Items,
          attributes: [],
        },
        {
          model: Themes,
          attributes: ["name"],
        },
      ],
      group: ["collections.id"],
    });
    res.json(collections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve collections" });
  }
};

// Создание новой коллекции
export const createCollection = async (req, res) => {
  const { name, description, themeId, image, userId } = req.body;
  try {
    const collection = await Collections.create({
      name,
      description,
      themeId,
      image,
      userId,
    });
    res.status(201).json(collection);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create collection" });
  }
};

// Обновление существующей коллекции
export const updateCollection = async (req, res) => {
  const { name, description, themeId, image } = req.body;
  const { id: collectionId } = req.params;
  try {
    const collection = await Collections.findOne({ where: { id: collectionId } });
    if (!collection) {
      res.status(404).json({ error: "Collection not found" });
    } else {
      collection.name = name || collection.name;
      collection.description = description || collection.description;
      collection.themeId = themeId || collection.themeId;
      collection.image = image || collection.image;
      await collection.save();
      res.json(collection);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update collection" });
  }
};

// Удаление коллекции
export const deleteCollection = async (req, res) => {
  const { id: collectionId } = req.params;
  try {
    const collection = await Collections.findOne({ where: { id: collectionId } });
    if (!collection) {
      res.status(404).json({ error: "Collection not found" });
    } else {
      await collection.destroy();
      res.json({ message: "Collection deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete collection" });
  }
};
