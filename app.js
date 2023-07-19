require('@babel/register');
import express from 'express';
import cors from 'cors';

import imageUpload from "./routes/imageUpload";
import roundStart from "./routes/roundStart";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
}); 

app.use('/', imageUpload);
app.use('/', roundStart);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});