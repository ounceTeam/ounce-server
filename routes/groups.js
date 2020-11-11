const express = require("express");

const db = require("../models");

const router = express.Router();

/*
    전체 그룹 조회
*/
router.get("/", async (req, res, next) => {
  try {
    const groups = await db.Group.findAll({});
    return res.status(200).json(groups);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
    카테고리별 그룹 조회
 */
router.get("/:category", async (req, res, next) => {
  try {
    const groups = await db.Group.findAll({
      where: {
        groupCategory: req.params.category,
      },
    });
    return res.status(200).json(groups);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
그룹 내 전체 게시글 조회
*/
router.get("/:groupId/posts", async (req, res, next) => {
  try {
    const groups = await db.Post.findAll({
      where: {
        groupId: req.params.groupId,
      },
    });
    return res.status(200).json(groups);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
그룹 내 특정 게시글 조회
*/
router.get("/:groupId/posts/:postId", async (req, res, next) => {
  try {
    const groups = await db.Post.findAll({
      where: {
        groupId: req.params.groupId,
        id: req.params.postId,
      },
    });
    return res.status(200).json(groups);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
