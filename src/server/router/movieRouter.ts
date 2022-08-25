import { createRouter } from "./context";
import { z } from "zod";
import { MovieDb } from "moviedb-promise";

if (process.env.MOVIE_DB_API_KEY) {
  const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY);
}

const movie_db_url = "https://api.themoviedb.org/3/movie/";

export const movieRouter = createRouter().query("get-popular-movies", {
  async resolve() {
    const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
    const popular = await movieDB.moviePopular();

    return popular.results;
  },
});

