import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

function createSession() {
  return [1, 2, 3].map(() => Math.random().toString().split(".")[1]).join("");
}

export const authRouter = createTRPCRouter({
  signin: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userFound = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });
      if (!userFound) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (userFound.password !== input.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Wrong password",
        });
      }
      const session = createSession();
      await ctx.prisma.session.create({
        data: {
          userId: userFound.id,
          sessionToken: session,
        },
      });
      return session;
    }),

  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userFound = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });
      if (userFound) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User already exists",
        });
      }
      const session = createSession();
      await ctx.prisma.user.create({
        data: {
          username: input.username,
          password: input.password,
          sessions: {
            create: {
              sessionToken: session,
            },
          },
        },
      });
      return session;
    }),

  verify: protectedProcedure
    .input(
      z.object({
        token: z.string().min(1),
      })
    )
    .query(() => true),
});
