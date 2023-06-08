const db = require("../models");
const User = db.user;
const Employee = db.employee;
const Boss = db.boss;
const getUserData = async (req, res) => {
  try {
    const { id, role } = req.userData;
    switch (role) {
      case "employee":
        const me = await getUserById(id);
        res.status(200).json(me);
        break;
      case "boss":
        const data = await getBossAndEmployees(id);
        res.status(200).json(data);
        break;
      case "admin":
        const adminData = await getEverybody(id);
        res.status(200).json(adminData);
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeBossForEmployee = async (req, res) => {
  try {
    const userData = req.userData;
    if (userData?.role !== "boss") {
      return res
        .status(401)
        .json({ message: "You aren`t allowed to use this route" });
    }

    const { employeeId, newBossId } = req.body;

    if (!employeeId || !newBossId || newBossId === userData.id) {
      return res.status(400).json({ message: "Incorrect data provided" });
    }
    const bossEmployees = await getBossAndEmployees(userData.id);
    const isBossEmployee = Boolean(
      bossEmployees.employees.find((employee) => employee.id === employeeId)
    );

    if (!isBossEmployee) {
      return res.status(400).json({ message: "It isn`t your employee" });
    }

    const newBoss = await Boss.findOne({
      where: { user_id: newBossId },
    });

    if (!newBoss) {
      return res.status(400).json({ message: "Incorrect boss id" });
    }

    await Employee.update(
      { boss_id: newBossId },
      { where: { user_id: employeeId } }
    );

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEverybody = async (adminId) => {
  const admin = await getUserById(adminId);
  const bosses = await Boss.findAll();
  const allData = await Promise.all(
    bosses.map(async (boss) => {
      return await getBossAndEmployees(boss.user_id);
    })
  );
  return {
    admin: { ...admin.dataValues, password: undefined },
    bosses: allData,
  };
};

const getBossAndEmployees = async (bossId) => {
  const boss = await getUserById(bossId);
  const employeesTableRows = await Employee.findAll({
    where: { boss_id: bossId },
  });
  const employees = await Promise.all(
    employeesTableRows.map(async (employee) => {
      const employeeData = await User.findOne({
        where: { id: employee.user_id },
      });
      return { ...employeeData.dataValues, password: undefined };
    })
  );
  const fullData = {
    boss: { ...boss.dataValues, password: undefined },
    employees,
  };
  return fullData;
};

const getUserById = async (user_id) => {
  return await User.findOne({ where: { id: user_id } });
};

module.exports = { getUserData, changeBossForEmployee };
