import express from "express";
import { apiRouter_v1 } from "./v1";

export const apiRouter = express.Router();

apiRouter.use("/v1", apiRouter_v1);