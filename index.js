const express = require("express");
const db = require("./models");

const loginAPIRouter = require("./routes/login");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const groupsAPIRouter = require("./routes/groups");
const groupAPIRouter = require("./routes/group");
const ownersAPIRouter = require("./routes/owners");
const mypageAPIRouter = require("./routes/mypage");

const app = express();
app.use(express.json());
db.sequelize.sync();

app.use("/login", loginAPIRouter);
app.use("/users", userAPIRouter);
app.use("/posts", postAPIRouter);
app.use("/groups", groupsAPIRouter);
app.use("/group", groupAPIRouter);
app.use("/owners", ownersAPIRouter);
app.use("/mypage", mypageAPIRouter);

app.listen(9000, () => {
  //9999
  console.log("server is running on http://15.164.18.115:9000");
});
