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

// // Collections table
// const Collection = db.define("collections", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//   },
//   theme: {
//     type: DataTypes.STRING,
//   },
//   image_url: {
//     type: DataTypes.STRING,
//   },
// });

// // Items table
// const Item = db.define("items", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//   },
//   tags: {
//     type: DataTypes.STRING,
//   },
//   field_1: {
//     type: DataTypes.STRING,
//   },
//   field_2: {
//     type: DataTypes.STRING,
//   },
//   field_3: {
//     type: DataTypes.STRING,
//   },
//   field_4: {
//     type: DataTypes.TEXT,
//   },
//   field_5: {
//     type: DataTypes.TEXT,
//   },
//   field_6: {
//     type: DataTypes.TEXT,
//   },
//   field_7: {
//     type: DataTypes.DATE,
//   },
//   field_8: {
//     type: DataTypes.DATE,
//   },
//   field_9: {
//     type: DataTypes.DATE,
//   },
//   field_10: {
//     type: DataTypes.BOOLEAN,
//   },
//   field_11: {
//     type: DataTypes.BOOLEAN,
//   },
//   field_12: {
//     type: DataTypes.BOOLEAN,
//   },
// });

// // Likes table
// const Like = db.define("likes", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
// });

// // Comments table
// const Comment = db.define("comments", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   comment_text: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// });
