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
  })
  .mutation("like-movie-by-id", {
    input: z.object({ userId: z.string(), movieId: z.string() }),
    async resolve({ input }) {
      return await prisma?.likedMovies.create({
        data: {
          randomId: input.userId + input.movieId,
          userId: input.userId,
          movieId: input.movieId,
        },
      });
    },
  })
  .mutation("disliked-movie", {
    input: z.object({ userId: z.string(), movieId: z.string() }),
    async resolve({ input }) {
      return await prisma?.likedMovies.delete({
        where: {
          userId_movieId_randomId: {
            userId: input.userId,
            movieId: input.movieId,
            randomId: input.userId + input.movieId,
          },
        },
      });
    },
  })
  .query("get-user-liked-movies", {
    input: z.object({ userId: z.string() }),
    async resolve({ input }) {
      return await prisma?.likedMovies.findMany({
        where: {
          userId: {
            equals: input.userId,
          },
        },
        select: {
          movieId: true,
        },
      });
    },
  })
  .query("check-if-movie-liked", {
    input: z.object({ userId: z.string(), movieId: z.string() }),
    async resolve({ input }) {
      return await prisma?.likedMovies.findFirst({
        where: {
          AND: [{ userId: input.userId }, { movieId: input.movieId }],
        },
      });
    },
  });

