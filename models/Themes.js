import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Collections from "./Collections.js";

const { DataTypes } = Sequelize;

// Themes table
const Themes = db.define("themes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Themes.hasMany(Collections);
Collections.belongsTo(Themes);

(async () => {
  await db.sync();
})();

export default Themes;
