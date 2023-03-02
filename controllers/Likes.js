import Likes from "../models/Likes.js";
import Items from "../models/Items.js";

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

export const getLike = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const like = await Likes.findOne({
      where: {
        itemId: id,
        userId: userId,
      },
    });
    res.status(200).json(like);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get like" });
  }
};

export const deleteLike = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const like = await Likes.findOne({
      where: {
        itemId: id,
        userId: userId,
      },
    });
    if (!like) {
      res.status(404).json({ error: "Like not found" });
      return;
    }
    await like.destroy();
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete like" });
  }
};
