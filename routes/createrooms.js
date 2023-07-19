import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const createRouter = (db) => {
    router.post("/api/v1/rooms", function (req, res) {
        const { category_id, time, player_num, nickname } = req.body;
        const uuid = uuidv4().substr(0, 5); // 앞의 5글자만 사용
        // 트랜잭션 시작
        db.beginTransaction(err => {
            if (err) {
                res.status(422).send({ error: "Database transaction could not be initiated." });
                return;
            }

            // Rooms table에 삽입
            db.query(
                "INSERT INTO Rooms (uuid, category_id, time, player_num) VALUES (?, ?, ?, ?)",
                [uuid, category_id, time, player_num],
                (err, roomResult) => {
                    if (err) {
                        db.rollback(() => {
                            res.status(422).send({ error: "Error inserting room into the database.", err });
                        });
                        return;
                    }

                    // Room이 생성된 후, Users 테이블에 room_id와 함께 삽입
                    db.query(
                        "INSERT INTO Users (nickname, score, is_host, room_id) VALUES (?, 0, 1, ?)",
                        [nickname, roomResult.insertId],
                        (err, userResult) => {
                            if (err) {
                                db.rollback(() => {
                                    res.status(422).send({ error: "Error inserting user into the database.", err });
                                });
                                return;
                            }

                            // UUID로 생성된 방 조회
                            db.query(
                                `SELECT * FROM Rooms WHERE id = ?`,
                                [roomResult.insertId],
                                (err, roomResults) => {
                                    if (err) {
                                        res.status(422).send({ error: 'Database error occurred', err });
                                    } else {
                                        const room = { ...roomResults[0], uuid }; // 방 객체에 UUID 포함

                                        // 생성된 사용자 조회
                                        db.query(
                                            `SELECT * FROM Users WHERE id = ?`,
                                            [userResult.insertId],
                                            (err, userResults) => {
                                                if (err) {
                                                    res.status(422).send({ error: 'Database error occurred', err });
                                                } else {
                                                    const user = userResults[0];

                                                    // 오류가 없다면 트랜잭션 커밋
                                                    db.commit(err => {
                                                        if (err) {
                                                            res.status(422).send({ error: "Database transaction could not be completed.", err });
                                                            return;
                                                        }

                                                        // 생성된 UUID, 방 정보, 사용자를 클라이언트에 전송
                                                        res.status(201).send({ room, user });
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    );
                }
            );
        });
    }); // 이 위치로 괄호 이동

    return router;
};

export default createRouter;
