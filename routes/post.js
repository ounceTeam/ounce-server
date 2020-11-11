const express = require("express");

const db = require("../models");

const router = express.Router();

/*
그룹원이 그룹내에 인증 게시글 올리는 메소드
*/

router.post("/", async (req, res, next) => {
  try {
    const newPost = await db.Post.create({
      content: req.body.content,
      url: req.body.url,
      userId: req.body.userId,
      groupId: req.body.groupId,
    });

    res.json(newPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
