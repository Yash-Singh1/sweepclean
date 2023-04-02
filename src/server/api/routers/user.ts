import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  incrementReputation: protectedProcedure
    .input(
      z.object({
        token: z.string(),
        amount: z.number().int().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          reputation: ctx.user.reputation + input.amount,
        },
      });
    }),

  getName: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        token: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      return (
        await ctx.prisma.user.findUnique({
          where: {
            id: input.userId,
          },
        })
      )?.name;
    }),

  getId: protectedProcedure
    .input(
      z.object({
        token: z.string().min(1),
      })
    )
    .query(({ ctx }) => ctx.user.id),
});
