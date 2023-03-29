import express from "express";
import * as dotenv from "dotenv";
import "express-async-errors";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("jobs api");
});

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
