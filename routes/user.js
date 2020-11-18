const express = require("express");
const db = require("../models");
const jwtMiddleware = require("../config/jwtMiddleware");
const jwt = require("jsonwebtoken");
const secret_config = require("../config/secret");

const router = express.Router();

router.get("/user/:userId", jwtMiddleware, async (req, res) => {
  try {
    const User = await db.User.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    if (!User) {
      return res.status(404).send("존재하지 않는 유저입니다.");
    }

    return res.status(200).json(User);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
일반 회워가입 - password 요청
*/

router.post("/user", async (req, res, next) => {
  //시퀄라이즈 때문에 대충 이런식으로 한다고만 올려둔거에요 알아서 로직 바꿔서 로그인 짜시면 될거같습니다.이부분은 다 지우고 하셔도 상관없어요.

  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const newUser = await db.User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      password: req.body.password,
    });

    //return res.status(200).json(newUser);
    let token = await jwt.sign(
      {
        userId: req.body.userId,
      }, // 토큰의 내용(payload)
      secret_config.jwtsecret, // 비밀 키
      {
        expiresIn: "365d",
        subject: "userInfo",
      } // 유효 시간은 365일
    );
    //console.log(token);
    res.json({
      jwt: token,
      info: newUser,
      isSuccess: true,
      code: 200,
      message: "회원가입 성공",
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
카카오 로그인 시의 회원가입 - password없이 oauthid로 요청
*/

router.post("/kakaouser", async (req, res, next) => {
  //시퀄라이즈 때문에 대충 이런식으로 한다고만 올려둔거에요 알아서 로직 바꿔서 로그인 짜시면 될거같습니다.이부분은 다 지우고 하셔도 상관없어요.

  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const newUser = await db.User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      oauthid: req.body.oauthid,
    });

    //return res.status(200).json(newUser);
    let token = await jwt.sign(
      {
        userId: req.body.userId,
      }, // 토큰의 내용(payload)
      secret_config.jwtsecret, // 비밀 키
      {
        expiresIn: "365d",
        subject: "userInfo",
      } // 유효 시간은 365일
    );
    //console.log(token);
    res.json({
      jwt: token,
      info: newUser,
      isSuccess: true,
      code: 200,
      message: "회원가입 성공",
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
사용자가 그룹에 가입을 요청하는 메소드 (방장이 수락 하기전 사용자가 요청만)
*/
router.post("/groups/:groupId", jwtMiddleware, async (req, res, next) => {
  const { userId } = req.verifiedToken;
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId,
      },
    });
    if (group.peopleSize == group.maxPeopleSize) {
      return res.status(403).send("그룹방 최대인원을 초과하였습니다.");
    }

    const newAsk = await db.Group_Ask.create({
      status: "Applying",
      groupId: req.params.groupId,
      userId: userId,
    });

    console.log("@@@@" + newAsk);

    // const newGroup = await db.Group_User.create({
    //   groupId: req.params.groupId,
    //   userId: req.params.userId,
    //   userLevel: "user",
    // });

    // await db.Group.update(
    //   { peopleSize: group.peopleSize + 1 },
    //   { where: { id: req.params.groupId } }
    // );

    return res.status(200).json(group.name + "방에 가입 신청을 하였습니다");
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
