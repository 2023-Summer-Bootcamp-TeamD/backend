require('@babel/register');
import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import multer from 'multer';
import aws from 'aws-sdk';
// import cors from 'cors';

const router = express.Router();
dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,  
      dialect: 'mysql',
      logging: false
    }
);

const Room = sequelize.define('Room', {
  uuid: { type: DataTypes.STRING, allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.INTEGER, allowNull: false },
  player_num: { type: DataTypes.INTEGER, allowNull: false }
});


/* 게임 라운드별 그림 저장 API - 매 라운드마다 출제자가 그린 그림을 S3에 저장한다. */


const Rounds = sequelize.define('Rounds', {
  room_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  word_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  picture_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {});

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


router.post('/api/v1/rooms/:uuid/picture/:word_id/rounds', upload.single('image'), (req, res) => {
  
  const file = req.file;
  const fileContent = file.buffer;
  const uuid = req.params.uuid;
  const word_id = req.params.word_id;
  
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

    

    async function insertRound() {
      try {
        const room = await Room.findOne({ where: {uuid: uuid} });
        const result = await Rounds.create({
          room_id : room.id,
          word_id: word_id,
          picture_url: picture_url,
        });
        console.log('Round inserted successfully:', result.toJSON());
      } catch (error) {
        console.error('Error inserting Round:', error);
      }
    }
    
    insertRound();
  });
});

module.exports = router;