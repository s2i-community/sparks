import { Application } from "express";
export const startServer = (app: Application, port: number) => {
  return new Promise((resolve, reject) => {
    try {
      app.listen(port, () => {
        console.log("SERVER IS UP ON PORT:", port);
        resolve(true);
      });
    } catch (err) {
      reject(err);
    }
  });
};
