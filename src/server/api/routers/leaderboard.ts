import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const leaderboardRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        token: z.string().min(1),
      })
    )
    .query(async ({ ctx }) => {
      return await ctx.prisma.user.findMany({
        take: 10,
        orderBy: {
          reputation: "desc",
        },
      });
    }),
});
