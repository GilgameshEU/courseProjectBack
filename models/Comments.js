import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Comments = db.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

(async () => {
  await db.sync();
})();

export default Comments;
