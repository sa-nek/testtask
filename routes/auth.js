const { register, login } = require("../controllers/auth");
const { Router } = require("express");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
