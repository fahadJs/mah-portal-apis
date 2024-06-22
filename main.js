import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// import autoController from "./api/auto-script/autoController.js";

import waRouter from "./api/wabot/waRouter.js";
import pdfRouter from "./api/pdf-followup/pdfRouter.js";
import autoRouter from "./api/auto-script/autoRouter.js";
import autoControllerCop from "./api/auto-script-copy/autoControllerCop.js";

app.use("/api/send", waRouter);
app.use("/api/follow", pdfRouter);
app.use("/api/auto", autoRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`MAH Backend App listening on port ${process.env.APP_PORT}`);
  
  // autoController.autoScript();

  // const interval = 10 * 60 * 1000; // 10 minutes in milliseconds
  // // const interval = 10000; // 10 seconds
  // setInterval(() => {
  //   console.log("Running scheduled task...");
  //   autoController.autoScript();
  // }, interval);

  // autoControllerCop.autoScript();

  // const interval = 4 * 60 * 1000; // 4 minutes in milliseconds
  // // const interval = 10000; // 10 seconds
  // setInterval(() => {
  //   console.log("Running scheduled task...");
  //   autoControllerCop.autoScript();
  // }, interval);
});
