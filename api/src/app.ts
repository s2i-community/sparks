import express, { Application, Request, Response } from "express";
require("dotenv").config();
const app: Application = express();
const morgan = require("morgan");
const connectDB = require("./services/db/connection");

const PORT = process.env.PORT || 9000;

// HTTP request logger middleware
app.use(morgan("common"));

// mongoDB connection
connectDB();

// load v1 api router
app.use("/api/v1", require("./api_v1/router"));

app.listen(PORT, () => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
