import express, { query } from "express";
import path from "path";
import fs from "fs-extra";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import multer from "multer";
import { getMovies, writeMovies } from "../../lib/fs-tools.js";

import { validationResult } from "express-validator";

export const getAllMovies = async (req, res, next) => {
  try {
    const allMovies = await getMovies();
    if (req.query && req.query.title) {
      //
      const filterMovies = allMovies.filter((p) => p.Title === req.query.title);
      //
      res.status(200).send(filterMovies);
      //
    } else {
      //
      res.status(200).send(allMovies);
    }
  } catch (error) {
    next(error);
  }
};

export const getMoviebyId = async (req, res, next) => {
  try {
    const allMovies = await getMovies();
    const movie = allMovies.find((p) => p.imdbID === req.params.mediaId);
    if (media) {
      res.status(200).send(movie);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} does not exist`)
      );
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const postMovie = async (req, res, next) => {
  const errorList = validationResult(req);
  try {
    if (!errorList.isEmpty) {
      next(createHttpError(400, { errorList }));
      console.log(errorList);
    } else {
      const allMovies = await getMovies();
      const newMOvie = { imdbID: uniqid(), ...req.body, createdAt: new Date() };
      allMovies.push(newMOvie);
      await writeMovies(allMovies);
      res.status(200).send(newMOvie);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const editMovie = async (req, res, next) => {
  try {
    const allMovies = await getMovies();
    const index = allMovies.findIndex((p) => p.imdbID === req.params.mediaId);

    const movieToEdit = allMovies[index];
    const editedFields = req.body;

    const updates = { ...movieToEdit, ...req.body, updatedAt: new Date() };
    allMovies[index] = updates;

    await writeMovies(allMovies);
    res.status(200).send(updates);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  const allMovies = await getMovies();
  const remainingMovies = allMovies.filter(
    (p) => p.imdbID !== req.params.mediaId
  );
  await writeMovies(remainingMovies);
  res.status(200).send(remainingMovies);
};
