const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Group = require("./group")(sequelize, Sequelize);
db.Group_User = require("./group_user")(sequelize, Sequelize);
db.Group_Notice = require("./group_notice")(sequelize, Sequelize);
db.Group_Ask = require("./group_ask")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
