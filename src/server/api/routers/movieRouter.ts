import { z } from "zod";
import { MovieDb, MovieResult } from "moviedb-promise";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const movieRouter = createTRPCRouter({
  getPopularMovies: publicProcedure.query(async ({}) => {
    const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
    const popular = await movieDB.moviePopular();
    return popular.results;
  }),
  getTrendingMovies: publicProcedure.query(async ({}) => {
    const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
    const trending = await movieDB.trending({
      media_type: "movie",
      time_window: "day",
    });
    return trending.results as MovieResult[];
  }),
  getMovieDetails: publicProcedure
    .input(z.object({ movieId: z.string() }))
    .query(async ({ input, ctx }) => {
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      const movieDetails = await movieDB.movieInfo(input.movieId);
      return movieDetails;
    }),
  getCastList: publicProcedure
    .input(z.object({ movieId: z.string() }))
    .query(async ({ input, ctx }) => {
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      const credits = await movieDB.movieCredits(input.movieId);

      return credits;
    }),
  searchMovieByText: publicProcedure
    .input(z.object({ searchText: z.string() }))
    .query(async ({ input, ctx }) => {
      const movieDB = new MovieDb(process.env.MOVIE_DB_API_KEY as string);
      const parameters = {
        query: input.searchText,
        page: 1,
      };
      const movieSearchResults = await movieDB.searchMovie(parameters);
      return movieSearchResults;
    }),
  likeMovieById: protectedProcedure
    .input(z.object({ userId: z.string(), movieId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.likedMovies.create({
        data: {
          userId: input.userId,
          movieId: input.movieId,
        },
      });
    }),
  dislikeMovieById: protectedProcedure
    .input(z.object({ userId: z.string(), movieId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.likedMovies.delete({
        where: {
          userId_movieId: {
            userId: input.userId,
            movieId: input.movieId,
          },
        },
      });
    }),
  checkIfMovieLiked: protectedProcedure
    .input(z.object({ userId: z.string(), movieId: z.string() }))
    .query(async ({ input, ctx }) => {
      const isLiked = await ctx.prisma.likedMovies.findFirst({
        where: {
          AND: [{ userId: input.userId }, { movieId: input.movieId }],
        },
        select: {
          movieId: true,
        },
      });

      if (isLiked) return true;
      return false;
    }),
  getUserLikedMovies: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const movieIdArray = await ctx.prisma.likedMovies.findMany({
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
      if (movieIdArray && movieIdArray.length > 0) {
        const movieDetailsArray = Promise.all(
          movieIdArray.map(
            async (movieId) => await movieDB.movieInfo(movieId.movieId)
          )
        );
        return movieDetailsArray;
      } else {
        return null;
      }
    }),
});
