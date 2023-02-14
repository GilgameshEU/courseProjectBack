// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const Users = db.define(
//   "users",
//   {
//     name: {
//       type: DataTypes.STRING,
//       collate: "utf8_General_ci",
//     },
//     email: {
//       type: DataTypes.STRING,
//       collate: "utf8_General_ci",
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//     },
//     role: {
//       type: DataTypes.STRING,
//     },
//     refresh_token: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );

// export default Users;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

// Users table
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

// Collections table
const Collection = db.define("collections", {
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
  theme: {
    type: DataTypes.STRING,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Items table
const Item = db.define("items", {
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Likes table
const Like = db.define("likes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Comments table
const Comment = db.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Define table relationships
Users.hasMany(Collection);
Collection.belongsTo(Users);

Collection.hasMany(Item);
Item.belongsTo(Collection);

Users.hasMany(Like);
Like.belongsTo(Users);

Item.hasMany(Like);
Like.belongsTo(Item);

Users.hasMany(Comment);
Comment.belongsTo(Users);

Item.hasMany(Comment);
Comment.belongsTo(Item);

(async () => {
  await db.sync();
})();

export default Users;
