import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const mediaJSONpath = join(dataFolderPath, "media.json");
const publicFolderPath = join(process.cwd(), "./public/img/media");

export const getMovies = () => readJSON(mediaJSONpath);
export const writeMovies = (content) => writeJSON(mediaJSONpath, content);
