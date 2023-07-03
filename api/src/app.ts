import express, { Application, Request, Response } from "express";
require("dotenv").config();

const app: Application = express();
const morgan = require("morgan");
const connectDB = require("./services/db/connection");

const PORT: number = 9000;

// HTTP request logger middleware
app.use(morgan("common"));

// mongoDB connection
connectDB();

app.use("/", (req: Request, res: Response): void => {
  res.status(200).json({ title: "Hello API!" });
});

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
