import { Application } from "express";
import { log } from "../utils";

/**
 * Starts the server on the specified port.
 * @param app - The Express application instance.
 * @param port - The port number to listen on.
 * @returns A Promise that resolves to a boolean indicating whether the server was started successfully.
 */
export const startServer = (app: Application, port: number) => {
  return new Promise((resolve, reject) => {
    try {
      app.listen(port, () => {
        log.info(`Server started on port ${port}`);
        resolve(true);
      });
    } catch (err: any) {
      reject(
        new Error(`Server filed to start: ${err?.message}`)
      );
    }
  });
};
