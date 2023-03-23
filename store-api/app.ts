import express from "express";
const app = express();
import connectDb from "./db/connect";

import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

require("dotenv").config();

const port = process.env.PORT || "5000";

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
