import { IncomingMessage, ServerResponse } from "http";
import morgan from "morgan";
import { log } from "../utils/logger";

const skip = (req: IncomingMessage, res: ServerResponse & { locals: any }) => {
  const { method, url } = req;
  const { statusCode, locals } = res;
  const { user } = locals;
  const sessionId = user?._id ? user._id.toString() : undefined;
  const message = [method, url, statusCode].join(" ");
  const isError = statusCode >= 400;


  if (isError) {
    log.error(message, sessionId);
  } else {
    log.info(message, sessionId);
  }

  return true;
};

export const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the skip logic.
  // See the methods above.
  { skip }
);