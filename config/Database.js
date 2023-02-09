import { Sequelize } from "sequelize";

// const db = new Sequelize("sql7594648", "sql7594648", "druiQc37EI", {
//   host: "sql7.freesqldatabase.com",
//   dialect: "mysql",
// });

const db = new Sequelize("course_db", "casual_user", "casual_user", {
  host: "db4free.net",
  dialect: "mysql",
});

export default db;
