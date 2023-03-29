import express from "express";
import * as dotenv from "dotenv";
import "express-async-errors";
import getNotFoundPage from "./middlewares/not-found.js";
import handleErrors from "./middlewares/error-handler.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use(getNotFoundPage);
app.use(handleErrors);

async function start() {
  try {
    app.listen(port, () =>
      console.log(`server is listening on port ${port}....`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
