import { Request, Response, NextFunction } from "express";
import { errorToRestStatus, formatErrorResponse } from "../utils/errors";
import { log } from "../utils/logger";

export async function errorHandler(
  err: any,
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) {
  const { user } = res.locals;
  const sessionId = user?._id ? user._id.toString() : undefined;

  log.error(err, sessionId);

  const status = errorToRestStatus(err);
  const message: string =
    status !== 500 ? err.message : "Internal server error";

  return res
    .status(status)
    .json(formatErrorResponse(status, message, err.details));
}