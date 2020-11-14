const express = require("express");

const db = require("../models");
const jwtMiddleware = require('../config/jwtMiddleware');
const jwt = require('jsonwebtoken');
const secret_config = require('../config/secret');
const router = express.Router();

/*
그룹원이 그룹내에 인증 게시글 올리는 메소드
*/

router.post("/", jwtMiddleware, async (req, res, next) => {
  try {
    const newPost = await db.Post.create({
      content: req.body.content,
      url: req.body.url,
      userId: req.body.userId,
      groupId: req.body.groupId,
    });

    const group_user = await db.Group_User.findOne({
      where: { userId: req.body.userId },
    });

    await db.Group_User.update(
      { ounce: group_user.ounce + 1 },
      { where: { userId: req.body.userId } }
    );

    res.json(newPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
