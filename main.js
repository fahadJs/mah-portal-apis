import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

import waRouter from './api/wabot/waRouter.js';

app.use('/api/send', waRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`);
});
