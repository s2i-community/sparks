import { Application } from "express";

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
        console.log("Server started on port", port);
        resolve(true);
      });
    } catch (err) {
      console.error("Server filed to start.");
      reject(err);
    }
  });
};
