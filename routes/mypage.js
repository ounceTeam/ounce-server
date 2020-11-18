const express = require("express");

const db = require("../models");
const jwtMiddleware = require("../config/jwtMiddleware");
const jwt = require("jsonwebtoken");
const secret_config = require("../config/secret");
const router = express.Router();

/*
    내 그룹조회
*/
router.get("/groups", jwtMiddleware, async (req, res, next) => {
  try {
    //console.log("@@@@@@@@" + JSON.stringify(req.body)); //@@@@ 로깅은 이렇게 하시면 돼요 콘솔창에 뜹니다.
    const { userId } = req.verifiedToken;
    const groups = await db.Group_User.findAll({
      where: {
        userId: userId,
      },
    });

    res.json(groups);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/requests", jwtMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.verifiedToken;
    const requests = await db.Group_Ask.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(requests);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/photo", jwtMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.verifiedToken;
    const photo = await db.Post.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(photo);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
