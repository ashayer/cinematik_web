// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { movieRouter } from "./movieRouter";

export const appRouter = createRouter().transformer(superjson).merge("movie.", movieRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

