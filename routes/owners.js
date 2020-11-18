const express = require("express");
const db = require("../models");
const jwtMiddleware = require("../config/jwtMiddleware");
const jwt = require("jsonwebtoken");
const secret_config = require("../config/secret");
const router = express.Router();

/*
방장이 그룹 공지사항 등록
*/

router.post(
  "/:ownerId/groups/:groupId/notices",
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const { userId } = req.verifiedToken;
      console.log(userId);
      const temp = await db.Group_User.findAll({
        where: {
          userId: userId,
          groupId: req.params.groupId,
          userLevel: "owner",
        },
      });
      console.log(temp);

      if (temp.length == 0) {
        res.status(403).json("그룹 방장이 아닙니다");
      }

      const newNotice = await db.Group_Notice.create({
        content: req.body.content,
        groupId: req.params.groupId,
      });

      res.json(newNotice);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

/*
사용자들이 그룹방에 가입요청을 하면 방장이 수락하는 메소드
*/
router.post(
  "/groups/:groupId/allows",
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const { userId } = req.verifiedToken;
      console.log(userId);
      const temp = await db.Group_User.findAll({
        where: {
          userId: userId,
          groupId: req.params.groupId,
          userLevel: "owner",
        },
      });
      console.log(temp);

      if (temp.length == 0) {
        res.status(403).json("그룹 방장이 아닙니다");
      }

      const newGroup = await db.Group_User.create({
        groupId: req.params.groupId,
        userId: req.body.userId,
        userLevel: "user",
      });

      const group = await db.Group.findOne({
        where: {
          id: req.params.groupId,
        },
      });

      await db.Group.update(
        { peopleSize: group.peopleSize + 1 },
        { where: { id: req.params.groupId } }
      );

      await db.Group_Ask.destroy({
        where: {
          groupId: req.params.groupId,
          userId: req.body.userId,
        },
      });

      res.json(
        req.body.userId + " 님이 그룹" + group.name + " 에 가입 완료 됐습니다."
      );
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

/*
그룹방 가입 요청 목록 중 방장이 거절하는 메소드
*/

router.post("/groups/:groupId/deny", jwtMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.verifiedToken;
    console.log(userId);
    const temp = await db.Group_User.findAll({
      where: {
        userId: userId,
        groupId: req.params.groupId,
        userLevel: "owner",
      },
    });
    console.log(temp);

    if (temp.length == 0) {
      res.status(403).json("그룹 방장이 아닙니다");
    }

    await db.Group_Ask.destroy({
      where: {
        groupId: req.params.groupId,
        userId: req.body.userId,
      },
    });

    res.json(req.body.userId + " 님이 그룹에 가입하는 것을 거절했습니다.");
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
그룹방에 가입하려고 신청한 유저들의 목록 조회
*/

router.get(
  "/groups/:groupId/requests",
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const { userId } = req.verifiedToken;
      console.log(userId);
      const temp = await db.Group_User.findAll({
        where: {
          userId: userId,
          groupId: req.params.groupId,
          userLevel: "owner",
        },
      });
      console.log(temp);

      if (temp.length == 0) {
        res.status(403).json("그룹 방장이 아닙니다");
      }

      const userList = await db.Group_Ask.findAll({
        where: {
          groupId: req.params.groupId,
        },
      });
      return res.status(200).json(userList);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }
);

module.exports = router;
