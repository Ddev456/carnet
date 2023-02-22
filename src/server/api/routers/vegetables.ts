import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const vegetableRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
          return await ctx.prisma.vegetable.findMany({
            orderBy: {
              createdAt: "desc",
            },
          });
        } catch (error) {
          console.log("error", error);
        }
      }),
    getById: publicProcedure
    .input(z.object({
        id: z.string(),
}))
    .query(async({input, ctx}) => {
      try {
        return await ctx.prisma.vegetable.findUnique({where:{
          id: 1,
        }  })
      }catch (error) {
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