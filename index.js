const express = require("express");
const db = require("./models");
const userAPIRouter = require("./routes/user");

const app = express();
app.use(express.json());
db.sequelize.sync();

app.use("/api/users", userAPIRouter);

app.listen(3065, () => {
  //9999
  console.log("server is running on http://localhost:3065");
});
