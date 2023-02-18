import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
    getAll: protectedProcedure
    .query(async ({ ctx, input }) => {
        try {
          return await ctx.prisma.user.findMany({
            where: {
              id: ctx.session.user.id,
            },
            select: {
              events: true,
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      }),
    // postEvent: protectedProcedure
    // .input(
    //   z.object({
    //     name: z.string(),
    //   })
    // )
    // .mutation(async ({ ctx, input }) => {
    //   try {
    //     await ctx.prisma.event.create({
    //       data: {
    //         name: input.name,
    //       },
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }),
});