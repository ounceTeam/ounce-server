const express = require("express");

const db = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
      StoreId: req.body.StoreId,
    });

    res.json(newPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
