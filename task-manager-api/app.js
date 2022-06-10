//import modules
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
const notFound = require("./middleware/not-found");
require("dotenv").config();

const port = "5000";

//middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(notFound);
app.use("/api/v1/tasks", tasks);

//init app
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
