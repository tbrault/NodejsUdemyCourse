import express from "express";
import * as dotenv from "dotenv";
import "express-async-errors";
import validateAuthentication from "./middlewares/auth.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import getNotFoundPage from "./middlewares/not-found.js";
import handleErrors from "./middlewares/error-handler.js";
import connectDb from "./db/connect.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", validateAuthentication, jobsRouter);
app.use(getNotFoundPage);
app.use(handleErrors);

async function start() {
  try {
    await connectDb(process.env.MONGO_URI!);
    app.listen(port, () =>
      console.log(`server is listening on port ${port}....`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
