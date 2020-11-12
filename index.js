const express = require("express");
const db = require("./models");

const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const groupsAPIRouter = require("./routes/groups");
const groupAPIRouter = require("./routes/group");
const ownersAPIRouter = require("./routes/owners");

const app = express();
app.use(express.json());
db.sequelize.sync();

app.use("/users", userAPIRouter);
app.use("/posts", postAPIRouter);
app.use("/groups", groupsAPIRouter);
app.use("/group", groupAPIRouter);
app.use("/owners", ownersAPIRouter);

app.listen(3065, () => {
  //9999
  console.log("server is running on http://localhost:3065");
});
