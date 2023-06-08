module.exports = (sequelize, Sequelize) => {
  const Boss = sequelize.define("boss", {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
  });

  return Boss;
};
