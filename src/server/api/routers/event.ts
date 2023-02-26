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
    postEvent: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        start: z.string(),
        end: z.string(),
        extendedProps: z.object({eventCategory: z.string(), relatedVegetable: z.number()})
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.event.create({
          data: {
            title: input.title,
            start: input.start,
            end: input.end,
            userId: ctx.session.user.id,
            extendedProps: input.extendedProps
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
    dynamicEvent: protectedProcedure
    .input(
      z.array(
        z.object({
          title: z.string(),
          start: z.string(),
          end: z.string(),
          extendedProps: z.object({eventCategory: z.string(), relatedVegetable: z.number()})
      })
      )
    )
    .mutation(async({ ctx, input }) => {
      try {
        await ctx.prisma.event.createMany({
          data: input,
        });
      } catch (error) {
        console.log(error);
      }
    }),
});