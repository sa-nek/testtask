const config = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  define: config.define,
  logging: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.employee = require("./employee.js")(sequelize, Sequelize);
db.boss = require("./boss.js")(sequelize, Sequelize);
db.admin = require("./admin.js")(sequelize, Sequelize);

db.user.hasOne(db.employee, { foreignKey: "user_id" });

db.user.hasOne(db.boss, { foreignKey: "user_id" });

db.user.hasOne(db.admin, { foreignKey: "user_id" });

db.employee.belongsTo(db.boss, { foreignKey: "boss_id", targetKey: "user_id" });

module.exports = db;
