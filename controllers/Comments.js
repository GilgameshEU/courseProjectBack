import Items from "../models/Items.js";

export const getComments = async (itemId) => {
  try {
    const comments = await Comment.findAll({
      where: {
        itemId: itemId,
      },
    });
    return comments;
  } catch (error) {
    throw error;
  }
};
