const { Router } = require("express");
const { getUserData, changeBossForEmployee } = require("../controllers/user");
const verifyToken = require("../middleware/verifyAuth");

const userRouter = Router();

//get users
userRouter.get("/", verifyToken, getUserData);

//changeboss
userRouter.post("/changeboss", verifyToken, changeBossForEmployee);

module.exports = userRouter;
