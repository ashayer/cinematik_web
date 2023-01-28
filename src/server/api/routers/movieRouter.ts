import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const movieRouter = createTRPCRouter({
  getMovieComments: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return "you can now see this secret message!";
    }),
});
