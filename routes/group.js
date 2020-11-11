const express = require("express");

const db = require("../models");

const router = express.Router();

/*
    그룹 등록
*/
router.post("/", async (req, res, next) => {
  try {
    console.log("@@@@@@@@" + JSON.stringify(req.body)); //@@@@ 로깅은 이렇게 하시면 돼요 콘솔창에 뜹니다.
    const newGroup = await db.Group.create({
      name: req.body.name,
      groupCategory: req.body.groupCategory,
      userId: req.body.userId,
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

    await db.Group_User.create({
      groupId: newGroup.id,
      userId: req.body.userId,
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
    const group = await db.Group.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(group);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
