import express, { Application } from "express";
import morgan from "morgan";
import { startServer } from "./services/startServer";
import dotenv from "dotenv";
import csrf from "csurf";
import { connectDB } from "./services/db/connection";
import { apiRouter } from "./routes";

dotenv.config();

/** The port number to listen on. */
const PORT = parseInt(process.env.PORT) || 9000;
/** The MongoDB URI to connect to. */
const mongoDbURI = process.env.MONGO_URI;
/** The Express application instance. */
const app: Application = express();

// Disable the X-Powered-By header.
// This header is enabled by default in Express and is often used by attackers to determine what server is running.
app.disable("x-powered-by");

// Enable Cross-Site Request Forgery (CSRF) protection.
// CSRF attacks can allow attackers to perform actions on behalf of authenticated users
// This middleware adds a csrfToken() method to the request object.
// This token is used to validate the request body when making POST requests.
app.use(csrf());

// HTTP request logger middleware
app.use(morgan("common"));

// load v1 api router
app.use("/api", apiRouter);


// TODO: add error handling middleware at the end of the middleware stack


connectDB(mongoDbURI)
  .then(() => startServer(app, PORT))
  .catch((err: Error) => {
    console.error(err);
  });
