import express from "express";
import { apiRouter_v1 } from "./v1";

export const router = express.Router();

router.use("/v1", apiRouter_v1);