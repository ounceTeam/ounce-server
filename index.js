const express = require("express");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const loginAPIRouter = require("./routes/login");

const app = express();
app.use(express.json());
db.sequelize.sync();

app.use("/api/users", userAPIRouter);
app.use("/api/login", loginAPIRouter);

app.listen(3065, () => {
  //9999
  console.log("server is running on http://localhost:3065");
});
