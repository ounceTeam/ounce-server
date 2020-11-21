const express = require("express");

const db = require("../models");
const jwtMiddleware = require("../config/jwtMiddleware");
const jwt = require("jsonwebtoken");
const secret_config = require("../config/secret");
const router = express.Router();

/*
그룹원이 그룹내에 인증 게시글 올리는 메소드
*/

router.post("/", jwtMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.verifiedToken;
    const { nickname } = await db.User.findOne({
      where: { userId: userId },
    });
    const temp = await db.Group_User.findAll({
      where: {
        userId,
        groupId: req.body.groupId,
      },
    });
    console.log(temp);
    if (temp.length == 0) {
      res.status(403).json("그룹원이 아닙니다");
    }

    const newPost = await db.Post.create({
      content: req.body.content,
      url: req.body.url,
      userId: userId,
      nickname: nickname,
      groupId: req.body.groupId,
    });

    const group_user = await db.Group_User.findOne({
      where: { userId: userId, groupId: req.body.groupId },
    });

    await db.Group_User.update(
      { ounce: group_user.ounce + 1 },
      { where: { userId: userId } }
    );

    res.json(newPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const all = await db.Post.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(all);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
