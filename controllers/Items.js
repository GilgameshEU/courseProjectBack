import Items from "../models/Items.js";
import Users from "../models/Users.js";
import Collections from "../models/Collections.js";
import Comments from "../models/Comments.js";
import Likes from "../models/Likes.js";

export const getItems = async (req, res) => {
  try {
    const items = await Items.findAll({ where: { collectionId: req.params.id } });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await item.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Items.findAll({
      include: [
        {
          model: Collections,
          include: [
            {
              model: Users,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getItem = async (req, res) => {
  try {
    const items = await Items.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Collections,
          attributes: ["name"],
          include: [{ model: Users, attributes: ["name"] }],
        },
        { model: Likes },
        {
          model: Comments,
          include: [{ model: Users, attributes: ["name"] }],
        },
      ],
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const createItem = async (req, res) => {
  const { name, description, imageUrl, collectionId, tags } = req.body;
  try {
    const newItem = await Items.create({
      name,
      description,
      imageUrl,
      collectionId,
      tags,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const createComment = async (req, res) => {
  const { id } = req.params;
  const { comment_text, userId } = req.body;
  try {
    const item = await Items.findByPk(id);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    const comment = await Comments.create({
      comment_text,
      itemId: item.id,
      userId,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};
