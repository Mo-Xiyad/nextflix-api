import express, { query } from "express";

import {
  getAllMovies,
  getMoviebyId,
  postMovie,
  editMovie,
  deleteMovie,
} from "./utils.js";

const moviesRouter = express.Router();

moviesRouter.get("/", getAllMovies);
moviesRouter.post("/", postMovie);
moviesRouter.get("/:mediaId", getMoviebyId);
moviesRouter.put("/:mediaId", editMovie);
moviesRouter.delete("/:mediaId", deleteMovie);

export default moviesRouter;
