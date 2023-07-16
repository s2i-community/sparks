import { Request, Response } from "express";

exports.test = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ test: "ok" });
  } catch (error) {}
};
