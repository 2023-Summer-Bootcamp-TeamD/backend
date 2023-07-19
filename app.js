require('@babel/register');
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import createRouter from './routes/createrooms'; // 사용자 방만들기


dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

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

app.get("/users", (req, res) => {
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send({ users: result });
    }
  });
});

const roomsRouter = createRouter(db);
app.use(roomsRouter); // 사용자 방만들기



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
