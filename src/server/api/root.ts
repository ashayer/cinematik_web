import { createTRPCRouter } from "./trpc";
import { commentRouter } from "./routers/commentRouter";
import { movieRouter } from "./routers/movieRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  comment: commentRouter,
  movie: movieRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
