import express from 'express';

const router = express.Router();

const joinRoomRouter = (db) => {
    router.post("/api/v1/rooms/users/:UUID", (req, res) => {
        const { UUID } = req.params;
        const { nickname } = req.body;

        // Begin transaction
        db.beginTransaction(err => {
            if (err) {
                res.status(422).send({ error: "Database transaction could not be initiated." });
                return;
            }

            // Check if room with provided UUID exists
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

                    // Check if nickname already exists in the room
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

                            if (existingUserResult.length >= roomResult[0].player_num -1 ) {
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

                            // After Room is confirmed and nickname is not duplicated, insert into Users table with the room_id
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

                                    // Get the joined user
                                    db.query(
                                        `SELECT * FROM Users WHERE id = ?`,
                                        [userResult.insertId],
                                        (err, userResults) => {
                                            if (err) {
                                                res.status(422).send({ error: 'Database error occurred', err });
                                            } else {
                                                const user = userResults[0];

                                                // If no errors, commit the transaction
                                                db.commit(err => {
                                                    if (err) {
                                                        res.status(422).send({ error: "Database transaction could not be completed.", err });
                                                        return;
                                                    }

                                                    const room = roomResult[0];
                                                    res.status(201).send({ time: room.time, player_num: room.player_num, category_id: room.category_id, score: user.score });
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