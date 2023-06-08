module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
  });

  return Admin;
};
