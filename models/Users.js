import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Collections from "./Collections.js";
import Likes from "./Likes.js";
import Comments from "./Comments.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      collate: "utf8_General_ci",
    },
    email: {
      type: DataTypes.STRING,
      collate: "utf8_General_ci",
    },
    password: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    role: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Collections);
Collections.belongsTo(Users);

Users.hasMany(Likes);
Likes.belongsTo(Users);

Users.hasMany(Comments);
Comments.belongsTo(Users);

(async () => {
  await db.sync();
})();

export default Users;
