import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const joinRoomRouter = (db) => {
    router.post("/api/v1/rooms/users/:UUID", (req, res) => {
        const { UUID } = req.params;
        const { nickname } = req.body;

        // 트랜잭션 시작
        db.beginTransaction(err => {
            if (err) {
                res.status(422).send({ error: "Database transaction could not be initiated." });
                return;
            }

            // 제공된 UUID로 방이 존재하는지 확인
            db.query(
                "SELECT * FROM Rooms WHERE uuid = ?",
                [UUID],
                (err, roomResult) => {
                    if (err || roomResult.length === 0) {
                        db.rollback(() => {
                            res.status(422).send({ error: "Error finding room with provided UUID.", err });
                        });
                        return;
                    }

                    // 닉네임이 방 내에서 이미 존재하는지 확인
                    db.query(
                        "SELECT * FROM Users WHERE nickname = ? AND room_id = ?",
                        [nickname, roomResult[0].id],
                        (err, existingUserResult) => {
                            if (err) {
                                db.rollback(() => {
                                    res.status(422).send({ error: "Error checking nickname in the database.", err });
                                });
                                return;
                            }

                            if (existingUserResult.length > roomResult[0].player_num -2 ) {
                                db.rollback(() => {
                                    res.status(422).send({ error: "The room is already full." });
                                });
                                return;
                            }

                            if (existingUserResult.length > 0 && existingUserResult[0].is_host === 1) {
                                db.rollback(() => {
                                    res.status(422).send({ error: "The host cannot join the room as a regular user." });
                                });
                                return;
                            }

                            // 방이 확인되고 닉네임이 중복되지 않을 경우, Users 테이블에 room_id와 함께 삽입
                            db.query(
                                "INSERT INTO Users (nickname, score, is_host, room_id) VALUES (?, 0, 0, ?)",
                                [nickname, roomResult[0].id],
                                (err, userResult) => {
                                    if (err) {
                                        db.rollback(() => {
                                            res.status(422).send({ error: "Error inserting user into the database.", err });
                                        });
                                        return;
                                    }

                                    // 참여한 사용자 조회
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

                                                    // 참여한 사용자를 클라이언트에 전송
                                                    res.status(201).send({ user });
                                                });
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        });
    });

    return router;
};

export default joinRoomRouter;