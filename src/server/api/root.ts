import { createTRPCRouter } from "./trpc";
import { vegetableRouter } from "./routers/vegetables";
import { eventRouter } from "./routers/event";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  vegetable: vegetableRouter,
  event: eventRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
