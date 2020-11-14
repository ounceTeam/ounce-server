const express = require("express");

const db = require("../models");
const jwtMiddleware = require('../config/jwtMiddleware');
const jwt = require('jsonwebtoken');
const secret_config = require('../config/secret');
const router = express.Router();

/*
    전체 그룹 조회
*/
router.get("/", jwtMiddleware,async (req, res, next) => {
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
router.get("/:category", jwtMiddleware, async (req, res, next) => {
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
router.get("/:groupId/posts", jwtMiddleware, async (req, res, next) => {
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
router.get("/:groupId/posts/:postId", jwtMiddleware, async (req, res, next) => {
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

/*
그룹 내 그룹원들 조회
*/

/*
그룹내 공지사항 조회
*/

router.get("/:groupId/notices", jwtMiddleware, async (req, res, next) => {
  try {
    const newNotice = await db.Group_Notice.findAll({
      where: { groupId: req.params.groupId },
    });

    res.json(newNotice);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
그룹 내 랭킹 조회
*/

router.get("/:groupId/ranking", jwtMiddleware, async (req, res, next) => {
  try {
    const newNotice = await db.Group_User.findAll({
      where: { groupId: req.params.groupId },
      order: [["ounce", "DESC"]],
    });

    res.json(newNotice);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
