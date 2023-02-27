import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Items from "./Items.js";
import { marked } from "marked";

const { DataTypes } = Sequelize;

// Collections table
const Collections = db.define("collections", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    get() {
      return this.getDataValue("description");
    },
    set(value) {
      this.setDataValue("description", value);
      this.setDataValue("descriptionHtml", marked(value));
    },
  },
  descriptionHtml: {
    type: DataTypes.VIRTUAL,
  },
  theme: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

Collections.hasMany(Items);
Items.belongsTo(Collections);

(async () => {
  await db.sync();
})();

export default Collections;
