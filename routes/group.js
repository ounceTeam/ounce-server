const express = require("express");

const db = require("../models");
const jwtMiddleware = require("../config/jwtMiddleware");
const jwt = require("jsonwebtoken");
const secret_config = require("../config/secret");
const router = express.Router();

/*
    그룹 등록
*/
router.post("/", jwtMiddleware, async (req, res, next) => {
  try {
    console.log("@@@@@@@@" + JSON.stringify(req.body)); //@@@@ 로깅은 이렇게 하시면 돼요 콘솔창에 뜹니다.
    const { userId } = req.verifiedToken;
    const { nickname } = await db.User.findOne({
      where: { userId: userId },
    });
    console.log("@@@@@@@@@" + nickname);

    const newGroup = await db.Group.create({
      name: req.body.name,
      groupCategory: req.body.groupCategory,
      userId: userId,
      authTime: req.body.authTime,
      url: req.body.url,
      peopleSize: 1,
      maxPeopleSize: req.body.maxPeopleSize,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday,
      saturday: req.body.saturday,
      sunday: req.body.sunday,
    });

    const authRule = req.body.authRule;
    const dbAuthRule = authRule.map((a) => {
      if (a) return a;
    });

    dbAuthRule.map((d) => {
      db.Group_Notice.create({
        content: d,
        groupId: newGroup.id,
      });
    });

    await db.Group_User.create({
      groupId: newGroup.id,
      userId: userId,
      nickname: nickname,
      userLevel: "owner",
    });

    res.json(newGroup);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/*
    그룹 아이디 별 상세 그룹 조회
 */
router.get("/:id", async (req, res, next) => {
  try {
    // const group_user = await db.Group_User.findAll({
    //   where: {
    //     userId: userId,
    //     groupId: req.params.id,
    //   },
    // });
    // console.log(group_user);
    // if (group_user.length == 0) {
    //   res.status(403).json("그룹에 가입 하지 않았습니다.");
    // }

    const group = await db.Group.findOne({
      where: {
        id: req.params.id,
      },
    });
    const temp = await db.Group_User.findOne({
      where: {
        groupId: group.id,
        userLevel: "owner",
      },
    });
    const { nickname } = temp;
    console.log(group);
    group.dataValues.ownerNickname = nickname;
    return res.status(200).json(group);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/all/ranking", async (req, res, next) => {
  try {
    const newNotice = await db.Group_User.findAll({
      order: [["ounce", "DESC"]],
    });
    res.status(200).json(newNotice);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
