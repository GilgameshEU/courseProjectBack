import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Likes from "./Likes.js";
import Comments from "./Comments.js";

const { DataTypes } = Sequelize;

const Items = db.define("items", {
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
  },
  tags: {
    type: DataTypes.STRING,
  },
  field_1: {
    type: DataTypes.STRING,
  },
  field_2: {
    type: DataTypes.STRING,
  },
  field_3: {
    type: DataTypes.STRING,
  },
  field_4: {
    type: DataTypes.TEXT,
  },
  field_5: {
    type: DataTypes.TEXT,
  },
  field_6: {
    type: DataTypes.TEXT,
  },
  field_7: {
    type: DataTypes.DATE,
  },
  field_8: {
    type: DataTypes.DATE,
  },
  field_9: {
    type: DataTypes.DATE,
  },
  field_10: {
    type: DataTypes.BOOLEAN,
  },
  field_11: {
    type: DataTypes.BOOLEAN,
  },
  field_12: {
    type: DataTypes.BOOLEAN,
  },
  image: {
    type: DataTypes.STRING,
  },
});

Items.hasMany(Likes);
Likes.belongsTo(Items);

Items.hasMany(Comments);
Comments.belongsTo(Items);

(async () => {
  await db.sync();
})();

export default Items;
