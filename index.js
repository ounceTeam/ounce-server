const express = require('express');

const db = require('./models');
const userAPIRouter = require('./routes/user');
const app = express();
db.sequelize.sync();

app.use('/api/users',userAPIRouter);

app.listen(3065, () => {
    console.log("server is running on http://localhost:3065");
  });
  