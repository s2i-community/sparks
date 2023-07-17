import express from "express";
import { userRouter } from "./user";

export const apiRouter_v1 = express.Router();

apiRouter_v1.use("/user", userRouter);
