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

// Создание нового комментария
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

// Создание нового лайка
export const createLike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const item = await Items.findByPk(id);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    const like = await Likes.create({
      itemId: item.id,
      userId,
    });
    res.status(201).json(like);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create like" });
  }
};
