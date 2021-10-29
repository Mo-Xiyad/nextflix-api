import express from "express";
import cors from "cors";
import { join } from "path";

import listEndpoints from "express-list-endpoints";

import moviesRouter from "./services/api/movies/index.js";
import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";

const server = express();

// --- Middlewear LOGGER
const logMiddleware = (req, res, next) => {
  console.log(
    `Req Method ${req.method} --- Req URL ${req.url} --- ${new Date()}`
  );
  next();
};

// ******************** CORS SETUP **********************
const whitelist = [process.env.FE_LOCAL_URL, process.env.FE_PROD_URL];

const corsOptions = {
  origin: function (origin, next) {
    console.log("CURRENT ORIGIN AT: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("CORS ERROR-- CHECK THE WHITELIST"));
    }
  },
};

server.use(cors(corsOptions));
server.use(logMiddleware);
server.use(express.json());

// ************************ ENDPOINTS **********************
// const staticFolderPath = join(process.cwd(), "./public");
// server.use(express.static(staticFolderPath));
server.use("/movies", moviesRouter);
// ************************ ENDPOINTS **********************

// ******************** ERROR MIDDLEWARES **********************
// this error handlers are generic to all the endpoints
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

const port = process.env.PORT;

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("Server running on port: ", port);
});
