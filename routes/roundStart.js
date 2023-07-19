require('@babel/register');
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
// import cors from 'cors';

const router = express.Router();

dotenv.config();
// app.use(cors());

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
    console.log("Connected to the MySQL server.");
});

/* 게임 라운드별 그림 API - 매 라운드마다 출제자가 그린 그림을 S3에 저장한다. */
// 뽑힌 닉네임을 저장하는 전역 배열 변수
const usedNicknames = [];

/* 라운드 별 게임 시작 API - room_id, 남은 시간(제한시간), 단어, 그리는 사람의 닉네임 get 요청을 통해 가져온다. */
router.get('/api/v1/rooms/:room_id/rounds/:round_id', async (req, res) => {
    try {
        // room_id가 1번이라고 가정
        const room_id = req.params.room_id;
        let time; // 남은 시간(제한시간)
        let word; // 해당 라운드의 단어
        let word_id;  // 해당 라운드 단어의 id
        let nickname; // 그림을 그릴 사람의 닉네임

        // 제한시간 가져오기
        const getTime = () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT time FROM Rooms WHERE id=${room_id}`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                time = result[0].time;
                console.log(time);
                resolve();
            }
            });
        });
        };

        // 랜덤으로 단어, 단어의 id 추출하기
        const getWord = () => {
        return new Promise((resolve, reject) => {
            // 현재 방(room)에 대해 이전에 선택된 word_id를 조회합니다.
            db.query(`SELECT word_id FROM Rounds WHERE room_id = ${room_id} AND word_id IS NOT NULL`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const excludedWordIds = result.map((row) => row.word_id);
        
                // 이전에 선택된 word_id를 제외하고 랜덤으로 단어와 해당 단어의 ID를 가져옵니다.
                let query;
                if (excludedWordIds.length > 0) {
                query = `SELECT word, id FROM Words 
                        WHERE category_id = (SELECT category_id FROM Rooms WHERE id = ${room_id}) 
                        AND id NOT IN (${excludedWordIds.join(',')}) 
                        ORDER BY RAND() 
                        LIMIT 1`;
                } else {
                query = `SELECT word, id FROM Words 
                        WHERE category_id = (SELECT category_id FROM Rooms WHERE id = ${room_id}) 
                        ORDER BY RAND() 
                        LIMIT 1`;
                }
        
                db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    word = result[0].word;
                    word_id = result[0].id;
                    console.log(word, word_id);
                    resolve();
                }
                });
            }
            });
        });
        };
    
    

        // 추출한 단어의 id를 Rouds 테이블의 room_id가 url에 있는 room_id이고 word_id가 null인 레코드 중에서 id가 제일 작은 레코드의 word_id에 랜덤으로 추출한 word_id를 삽입
        const updateWordId = () => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Rounds SET word_id = ${word_id} WHERE room_id = ${room_id} AND word_id IS NULL AND id IN (SELECT id FROM (SELECT MIN(id) AS id FROM Rounds WHERE room_id = ${room_id} AND word_id IS NULL) AS tmp)`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log('Rounds 테이블에 word_id 삽입!');
                resolve();
            }
            });
        });
        };

        /* 그림을 그리는 사람의 닉네임 추출
        1. room_id에 해당하는 참여자의 닉네임을 쿼리문을 날려서 뽑아내고 배열에 저장  
        2. 1에서 만든 배열에서 랜덤으로 한명을 뽑아내고 프론트 단으로 닉네임 전달
        3. 2에서 한명이 줄어든 배열에서 랜덤 인덱스로 새로운 배열에 닉네임을 저장
        4. 다음 요청이 들어오면 3에서 만든 새로운 배열에서 닉네임을 인덱스 0에서 뽑아 프론트 단으로 전달(이미 랜덤으로 되어있으므로)
        5. 게임방이 여러개니까 배열을 게임방 만큼 이름을 다르게하여 생성 및 관리 해야할듯!
        */
        const getNickName = () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT nickname FROM Users WHERE room_id=${room_id}`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const nicknames = result.map((row) => row.nickname);
                const availableNicknames = nicknames.filter((nickname) => !usedNicknames.includes(nickname));
                
                if (availableNicknames.length === 0) {
                reject(new Error('No available nicknames in the Users table for the given room_id.'));
                return;
                }

                const randomIndex = Math.floor(Math.random() * availableNicknames.length);
                const randomNickname = availableNicknames[randomIndex];
                
                // 뽑힌 닉네임을 usedNicknames 배열에 추가하여 다음 호출 시 중복을 피합니다.
                usedNicknames.push(randomNickname);
                console.log(`뽑힌 닉네임: ${usedNicknames}`);
                console.log(randomNickname);
                nickname = randomNickname;
                resolve();
            }
            });
        });
        };

        // 쿼리를 순차적으로 실행
        await getTime();
        await getWord();
        await updateWordId();
        await getNickName();

        res.status(200).json({room_id: room_id, time: time, word: word, nickname: nickname});

    } catch (err) {
    console.log(err);
    }
});

module.exports = router;