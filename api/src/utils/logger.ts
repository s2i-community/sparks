import { createLogger, transports, format } from "winston";

import { OperationError } from "./errors/operation.error";

const logConsole = new transports.Console();

const DailyRotateFile = require("winston-daily-rotate-file");

const daily = new DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
  flags: "a",
  createSymlink: true,
  symlinkName: "app.log",
});

/**
 * A Winston format function that formats the log message with a timestamp, session, log level, and message.
 * If the log level is "error" and the log message is not an instance of OperationError, the error stack trace is added to the log message.
 * @param info The log information object.
 * @returns The formatted log message.
 */
const customFormat = format.printf((info) => {
  let message = `${info.timestamp} ${info.session} ${info.level}: ${info.message}`;

  if (
    !(info instanceof OperationError) &&
    info.level === "error" &&
    info.stack
  ) {
    message = `\n${info.stack}`;
  }

  return message;
});

/**
 * A Winston format function that adds the error stack trace to the log message if the log level is "error" and the log message is not an instance of OperationError.
 * @param info The log information object.
 * @returns The log information object with the error stack trace added if applicable.
 */
const errorStackFormat = format((info) => {
  if (
    !(info instanceof OperationError) &&
    info.level === "error" &&
    info.stack
  ) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }

  return info;
});

/**
 * A Winston logger instance that logs messages to the console and a daily rotating file.
 */
const logger = createLogger({
  transports: [logConsole, daily],
  format: format.combine(
    // format.errors({ stack: true }),
    errorStackFormat(),
    format.prettyPrint(),
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    customFormat
  ),
  defaultMeta: {
    service: "api",
    session: "*",
  },
  exceptionHandlers: [logConsole, daily],
});

if (process.env.NODE_ENV === "development") logger.remove(daily);
else logger.remove(logConsole);


/**
 * A class that provides logging functionality for the application.
 */
class SetLog {
  private levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  };

  /**
   * Logs an informational message with the specified session.
   * @param message The message to log.
   * @param session The session associated with the message. Defaults to "*".
   */
  public info(message: string, session = "*") {
    this.set("info", message, session);
  }

  /**
   * Logs an error message with the specified session.
   * @param message The message to log.
   * @param session The session associated with the message. Defaults to "*".
   */
  public error(message: string | Error, session = "*") {
    this.set("error", message, session);
  }

  /**
   * Logs a warning message with the specified session.
   * @param message The message to log.
   * @param session The session associated with the message. Defaults to "*".
   */
  public warn(message: string, session = "*") {
    this.set("warn", message, session);
  }

  /**
   * Logs an HTTP message with the specified session.
   * @param message The message to log.
   * @param session The session associated with the message. Defaults to "*".
   */
  public http(message: string, session = "*") {
    this.set("http", message, session);
  }

  /**
   * Logs a verbose message with the specified session.
   * @param message The message to log.
   * @param session The session associated with the message. Defaults to "*".
   */
  public verbose(message: string, session = "*") {
    this.set("verbose", message, session);
  }

  /**
   * Sets the log level, message, and session for the logger.
   * @param level The log level to set.
   * @param message The message to log.
   * @param session The session associated with the message.
   */
  private set(
    level: keyof typeof this.levels,
    message: string | Error,
    session: string
  ) {
    logger.defaultMeta.session = session;
    if (message instanceof Error) {
      logger.error(message);
      logger.defaultMeta.session = "*";
    } else {
      logger.log(level, message, () => {
        logger.defaultMeta.session = "*";
      });
    }
  }
}

export const log = new SetLog();