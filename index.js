const express = require("express");
const cors = require("cors");
const db = require("./models");
const mainRouter = require("./routes/main");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(mainRouter);

//db syncronization
db.sequelize.sync();
//to change data scheme
//db.sequelize.sync({ force: true });

app.use((req, res) => {
  res.status(404).json({ message: "This route doesn`t exist" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
