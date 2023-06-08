const { Router } = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);

module.exports = mainRouter;
