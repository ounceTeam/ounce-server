const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("user server get api");
});

router.post("/user", async (req, res, next) => {
  //시퀄라이즈 때문에 대충 이런식으로 한다고만 올려둔거에요 알아서 로직 바꿔서 로그인 짜시면 될거같습니다.이부분은 다 지우고 하셔도 상관없어요.

  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const newUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      oauthid: req.body.oauthid,
    });

    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

/*
사용자가 그룹에 가입하는 메소드
*/
router.post("/:userId/groups/:groupId", async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: {
        id: req.params.groupId,
      },
    });
    if (group.peopleSize == group.maxPeopleSize) {
      return res.status(403).send("그룹방 최대인원을 초과하였습니다.");
    }

    const newGroup = await db.Group_User.create({
      GroupId: req.params.groupId,
      userId: req.params.userId,
    });

    await db.Group.update(
      { peopleSize: group.peopleSize + 1 },
      { where: { id: req.params.groupId } }
    );

    return res.status(200).json(newGroup);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
