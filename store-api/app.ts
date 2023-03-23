import express from "express";
import * as dotenv from "dotenv";

import connectDb from "./db/connect.js";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();
dotenv.config();
const port = process.env.PORT || "5000";

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI!);
    app.listen(port, () =>
      console.log(`server is listening on port ${port}....`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
