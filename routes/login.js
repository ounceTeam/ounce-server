const express = require('express');
const router = express.Router();
const request=require('request');
const jwt = require('jsonwebtoken');
const secret_config = require('../config/secret');
const db = require("../models");
const jwtMiddleware = require('../config/jwtMiddleware');
// const bodyParser = require('body-parser');
//
// const app=express();
// app.use(express.json());
router.post('/kakao', async (req, res, next) => {

    //시퀄라이즈 때문에 대충 이런식으로 한다고만 올려둔거에요 알아서 로직 바꿔서 로그인 짜시면 될거같습니다.이부분은 다 지우고 하셔도 상관없어요.


    // console.log("come!");
    try {
        const {access_token}=req.body;
        // console.log(access_token);
        request(
            {
                url: "https://kapi.kakao.com/v2/user/me",
                method: "GET",
                headers: { Authorization: " Bearer " + access_token },
            },

            async function (error, response, body) {
                //console.log(response.body);
                if (!error && response.statusCode == 200) {
                    const profile_json = JSON.parse(body);
                    const oauthId = profile_json.id;
                    const exUser = await db.User.findOne({
                        where: {
                            oauthid: oauthId
                        }
                    });
                    if (!exUser) {
                        res.json({
                            oauthid: oauthId,
                            isSuccess: false,
                            code: 404,
                            message: "회원가입해주세요.",
                        });
                        //connection.r
                    }
                    else {
                        let token = await jwt.sign(
                            {
                                userId: exUser.userId,
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
                            isSuccess: true,
                            code: 200,
                            message: "로그인 성공",
                        });
                        //connection.release();
                    }
                } else {
                    return res.json({
                        code : response.statusCode,
                        isSuccess : false,
                        error_message : response.body
                    });
                }
            }
        );


        //return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }


});


router.post('/', async (req, res, next) => {

    //시퀄라이즈 때문에 대충 이런식으로 한다고만 올려둔거에요 알아서 로직 바꿔서 로그인 짜시면 될거같습니다.이부분은 다 지우고 하셔도 상관없어요.


    // console.log("come!");
    try {

                    const exUser = await db.User.findOne({
                        where: {
                            userId: req.body.userId,
                            password: req.body.password,
                        }
                    });
                    if (!exUser) {
                        res.json({
                            isSuccess: false,
                            code: 404,
                            message: "아이디와 패스워드를 확인해주세요.",
                        });
                        //connection.r
                    }
                    else {
                        let token = await jwt.sign(
                            {
                                userId: exUser.userId,
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
                            isSuccess: true,
                            code: 200,
                            message: "로그인 성공",
                        });
                        //connection.release();
                    }
                } else {
                    return res.json({
                        code : response.statusCode,
                        isSuccess : false,
                        error_message : response.body
                    });
                }
            }
        );


        //return res.status(200).json(newUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }


});


router.get("/", jwtMiddleware, async (req, res) => {
    const {userId} = req.verifiedToken;
    try {
        const User = await db.User.findOne({
            where: {
                userId: userId,
            },
        });
        if (!User) {
            return res.status(404).send("존재하지 않는 유저입니다.");
        }


        return res.status(200).send("인증 성공");
    } catch (e) {
        console.error(e);
        return next(e);
    }
});


module.exports = router;