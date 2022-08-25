import { createRouter } from "./context";
import { z } from "zod";
import { MovieDb } from "moviedb-promise";

export const movieRouter = createRouter()
  .query("get-popular-movies", {
    async resolve() {
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      const popular = await movieDB.moviePopular();

      return popular.results;
    },
  })
  .query("get-movie-details", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      const popular = await movieDB.movieInfo(input.id);

      return popular;
    },
  })
  .query("get-cast-list", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      const credits = await movieDB.movieCredits(input.id);

      return credits;
    },
  });

