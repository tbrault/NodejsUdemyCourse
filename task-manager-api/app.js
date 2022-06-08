const express = require("express");
const app = express();

const tasks = require("./routes/tasks");

const port = "5000";

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.listen(port, console.log(`server is listening on port ${port}....`));
