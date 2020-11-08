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
      authTime: req.body.authTime,
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
