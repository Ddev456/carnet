import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const vegetableRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
          return await ctx.prisma.vegetable.findMany({
            select: {
              id: true,
              name: true,
              icon: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      }),
    postVegetable: adminProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.vegetable.create({
          data: {
            name: input.name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});