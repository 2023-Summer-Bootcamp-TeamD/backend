require('@babel/register');
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
});

router.get('/api/v1/results/:room_id', async (req, res) => {
    try{
        const room_id = req.params.room_id;

        const getScore = () => {
            return new Promise((resolve, reject) => {
                db.query(`SELECT nickname, score from Users WHERE room_id = (SELECT id FROM Rooms WHERE uuid = '${room_id}');`, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        const ranks = [...result];      
                        
                        // score를 기준으로 내림차순 정렬
                        ranks.sort((a, b) => {
                            if (b.score === a.score) {
                                // score가 같을 때 nickname을 기준으로 오름차순 정렬
                                return a.nickname.localeCompare(b.nickname);
                            } else {
                                return b.score - a.score;
                            }
                        });  

                        console.log(`석차 조회 완료!`);
                        res.status(200).json({석차: ranks});
                        resolve();
                    }
                });
            })
        }

        await getScore();

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;