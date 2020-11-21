const express = require("express");

const db = require("../models");
const jwtMiddleware = require("../config/jwtMiddleware");
const jwt = require("jsonwebtoken");
const secret_config = require("../config/secret");
const moment = require("moment");

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
router.get("/:groupId/posts", jwtMiddleware, async (req, res, next) => {
  try {
    const userId = req.verifiedToken;
    console.log(userId);

    const temp = await db.Group_User.findOne({
      where: {
        groupId: req.params.groupId,
        userId: userId.userId,
      },
    });

    const temp2 = await db.Group_Ask.findOne({
      where: {
        groupId: req.params.groupId,
        userId: userId.userId,
      },
    });

    const groups = await db.Post.findAll({
      where: {
        groupId: req.params.groupId,
      },
      order: [["createdAt", "DESC"]],
    });
    console.log(moment().format("YYYY-MM-DD"));

    let all = {};
    console.log(all);

    if (temp == null) {
      all.userLevel = null;
      if (temp2 != null) {
        all.userLevel = "request";
      }
    } else {
      let { userLevel } = temp;
      all.userLevel = userLevel;
    }
    all.post = groups;

    return res.status(200).json(all);
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

/*
그룹 내 그룹원들 조회
*/

/*
그룹내 공지사항 조회
*/

router.get("/:groupId/notices", async (req, res, next) => {
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

router.get("/:groupId/ranking", async (req, res, next) => {
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

/*
그룹내 인증 사진 있는 날들 목록 조회
*/
router.get("/:groupId/days", async (req, res, next) => {
  try {
    let tset = new Set();

    const temp = await db.Post.findAll({
      where: { groupId: req.params.groupId },
    });

    if (temp == null) {
      res.status(200).json([]);
    } else {
      temp.forEach((i) => {
        let { createdAt } = i;
        createdAt = moment(createdAt).format("YYYY-MM-DD");
        console.log(createdAt);
        tset.add(createdAt);
      });
    }
    const setarr = [...tset];
    res.status(200).json(setarr);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:groupId/somedate/:date", async (req, res, next) => {
  try {
    let date = req.params.date;
    console.log(date);
    date = moment(date).format("YYYY-MM-DD");
    console.log(moment(date).format("YYYY-MM-DD"));
    const posts = await db.Post.findAll({
      where: {
        groupId: req.params.groupId,
      },
      order: [["createdAt", "DESC"]],
    });

    let cposts = [];
    posts.forEach((p) => {
      let tday = moment(p.createdAt).format("YYYY-MM-DD");
      if (tday == date) cposts.push(p);
    });

    res.status(200).json(cposts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
그룹방 내 그룹가입원 목록
*/

router.get("/:groupId/members", async (req, res, next) => {
  try {
    const people = await db.Group_User.findAll({
      where: { groupId: req.params.groupId },
    });

    res.json(people);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
