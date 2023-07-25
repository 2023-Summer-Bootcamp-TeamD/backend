require('@babel/register');
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import multer from 'multer';
import aws from 'aws-sdk';
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
});

/* 게임 라운드별 그림 저장 API - 매 라운드마다 출제자가 그린 그림을 S3에 저장한다. */

// 환경변수 설정
const YOUR_S3_BUCKET_NAME = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const YOUR_ACCESS_KEY = process.env.ACCESS_KEY;
const YOUR_SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

// AWS 설정
const s3 = new aws.S3({
  accessKeyId: YOUR_ACCESS_KEY,
  secretAccessKey: YOUR_SECRET_ACCESS_KEY,
  region: region
});

// multer 설정
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/api/v1/rooms/:room_id/picture/rounds', upload.single('image'), (req, res) => {
  const file = req.file;
  const fileContent = file.buffer;
  const room_id = req.params.room_id;
  
  // S3에 이미지 업로드
  const params = {
    Bucket: YOUR_S3_BUCKET_NAME,
    Key: file.originalname,
    Body: fileContent
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to upload image to S3' });
    }

    console.log(file);
    res.status(201).json({ location: data.Location });

    // url 데이터베이스에 삽입(수정)
    const picture_url = data.Location;
    console.log(picture_url);
    // 1번 게임방, word_id가 1 이라고 가정
    const sql = `UPDATE Rounds AS r1 JOIN ( 
      SELECT MIN(id) AS min_id 
      FROM Rounds 
      WHERE room_id = (SELECT id FROM Rooms WHERE uuid = '${room_id}')
      AND picture_url IS NULL 
      ) AS r2 
      ON r1.id = r2.min_id 
      SET r1.picture_url = '${picture_url}' 
      WHERE r1.room_id = (SELECT id FROM Rooms WHERE uuid = '${room_id}') 
      AND r1.picture_url IS NULL;`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("데이터 삽입 성공!");
      }
    });
  });
});

module.exports = router;