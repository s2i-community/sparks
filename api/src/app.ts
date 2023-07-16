import express, { Application, Request, Response } from "express";
import { startServer } from "./services/startServer";
require("dotenv").config();
const app: Application = express();
const morgan = require("morgan");
const connectDB = require("./services/db/connection");

const PORT = parseInt(process.env.PORT ?? "") || 9000;

// HTTP request logger middleware
app.use(morgan("common"));

// load v1 api router
app.use("/api/v1", require("./api_v1/router"));

connectDB()
  .then(() => startServer(app, PORT))
  .catch((err: Error) => {
    console.error(err);
  });
