import express from "express";
import { userRouter } from "./users";

export const apiRouter_v1 = express.Router();

apiRouter_v1.use("/user", userRouter);
