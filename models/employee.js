module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    boss_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  });

  return Employee;
};
