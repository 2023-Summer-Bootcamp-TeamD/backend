import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

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

const User = sequelize.define('User', {
  nickname: { type: DataTypes.STRING, allowNull: false },
  score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  is_host: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  room_id: { type: DataTypes.INTEGER, references: { model: Room, key: 'id' } }
});

const router = express.Router();

const createRouter = () => {
  router.post("/api/v1/rooms", async (req, res) => {
    const { category_id, time, player_num, nickname } = req.body;
    const uuid = uuidv4().substr(0, 5); // 앞의 5글자만 사용

    const t = await sequelize.transaction();

    try {
      const newRoom = await Room.create({ uuid, category_id, time, player_num }, { transaction: t });

      const newUser = await User.create({
        nickname,
        score: 0,
        is_host: true,
        room_id: newRoom.id
      }, { transaction: t });

      await t.commit();

      res.status(201).send({ uuid: newRoom.uuid, score: newUser.score });
    } catch (err) {
      await t.rollback();
      res.status(422).send({ error: "DB 에러 발생.", err });
    }
  });

  return router;
};

export default createRouter;