import express from "express";
import { userControllers } from "../../../controllers";

export const userRouter = express.Router();

// test
userRouter.get("/test", userControllers.test);
