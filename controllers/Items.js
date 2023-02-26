import Items from "../models/Items.js";
import Users from "../models/Users.js";
import Collections from "../models/Collections.js";

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
