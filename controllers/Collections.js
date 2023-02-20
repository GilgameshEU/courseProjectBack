import Collections from "../models/Collections.js";
import Users from "../models/Users.js";

// Получение всех коллекций
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
    res.status(500).json({ error: "Failed to retrieve collections" });
  }
};

// Создание новой коллекции
export const createCollection = async (req, res) => {
  const { name, description, theme, image_url } = req.body;
  const { userId } = req.params;
  try {
    const collection = await Collections.create({
      name,
      description,
      theme,
      image_url,
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
  const { name, description, theme, image_url } = req.body;
  const { collectionId } = req.params;
  try {
    const collection = await Collections.findOne({ where: { id: collectionId } });
    if (!collection) {
      res.status(404).json({ error: "Collection not found" });
    } else {
      collection.name = name || collection.name;
      collection.description = description || collection.description;
      collection.theme = theme || collection.theme;
      collection.image_url = image_url || collection.image_url;
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
  const { collectionId } = req.params;
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
