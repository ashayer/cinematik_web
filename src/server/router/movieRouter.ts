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
      const movieDetails = await movieDB.movieInfo(input.id);
      return movieDetails;
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
          userId_movieId: {
            userId: input.userId,
            movieId: input.movieId,
          },
        },
      });
    },
  })
  .query("get-user-liked-movies-by-id", {
    input: z.object({ userId: z.string() }),
    async resolve({ input }) {
      const movieIdArray = await prisma?.likedMovies.findMany({
        where: {
          userId: {
            equals: input.userId,
          },
        },
        select: {
          movieId: true,
        },
      });
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      if (movieIdArray && movieIdArray?.length > 0) {
        const movieDetailsArray = Promise.all(
          movieIdArray.map(async (movieId) => await movieDB.movieInfo(movieId.movieId)),
        );
        return movieDetailsArray;
      } else {
        return null;
      }
    },
  })
  .query("check-if-movie-liked", {
    input: z.object({ userId: z.string(), movieId: z.string() }),
    async resolve({ input }) {
      const isLiked = await prisma?.likedMovies.findFirst({
        where: {
          AND: [{ userId: input.userId }, { movieId: input.movieId }],
        },
        select: {
          movieId: true,
        },
      });

      if (isLiked) return true;
      return false;
    },
  })
  .query("search-movie", {
    input: z.object({ searchText: z.string() }),
    async resolve({ input }) {
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      const parameters = {
        query: input.searchText,
        page: 1,
      };
      const movieSearchResults = await movieDB.searchMovie(parameters);
      return movieSearchResults;
    },
  });

