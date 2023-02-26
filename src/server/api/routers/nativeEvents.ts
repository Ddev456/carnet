import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const nativeEventsRouter = createTRPCRouter({
    getAll: protectedProcedure
    .query(async ({ ctx, input }) => {
        try {
          return await ctx.prisma.nativeEvents.findMany();
        } catch (error) {
          console.log("error", error);
        }
      }),
});