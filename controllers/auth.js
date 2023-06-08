const db = require("../models");
const User = db.user;
const Employee = db.employee;
const Boss = db.boss;
const Admin = db.admin;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    if (password.length < 6 || password.length > 30) {
      return res.status(400).json({ message: "Invalid password length" });
    }
    const isValidRole = ["employee", "boss", "admin"].includes(role);
    const bossId = req.body.bossId;
    if (!role || !isValidRole) {
      res.json({ message: "Role doesn`t exist" });
    }
    const createUser = async () => {
      const userData = await User.create({
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 8),
        role,
      });
      return { ...userData.dataValues, password: undefined };
    };

    switch (role) {
      case "employee":
        const employeeBoss = await Boss.findOne({ where: { user_id: bossId } });
        if (!employeeBoss) return res.json({ message: "No boss with this id" });
        const employee = await createUser();
        const employeeTableRow = await Employee.create({
          user_id: employee.id,
          boss_id: employeeBoss.user_id,
        });
        return res.json({ employee, employeeTableRow });
      case "boss":
        const boss = await createUser();
        const bossTableRow = await Boss.create({ user_id: boss.id });
        return res.json({ boss, bossTableRow });
      case "admin":
        const admin = await createUser();
        const adminTableRow = await Admin.create({ user_id: admin.id });
        return res.json({ admin, adminTableRow });
      default:
        break;
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      return res.status(400).json({ message: "Email or password is invalid" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Email or password is invalid" });
    const token = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
