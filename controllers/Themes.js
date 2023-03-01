import Themes from "../models/Themes.js";
import { Sequelize } from "sequelize";

export const getThemes = async (req, res) => {
  try {
    const themes = await Themes.findAll();
    res.json(themes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
