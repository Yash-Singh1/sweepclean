import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        token: z.string().min(1),
        lat: z.number(),
        lon: z.number(),
        startTime: z.date(),
        endTime: z.date(),
        name: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const request = (await fetch(
        `https://cleansweep-flask.vercel.app/geo?lat=${input.lat}&lon=${input.lon}`
      ).then((response) => response.json())) as string;
      await ctx.prisma.event.create({
        data: {
          address: request,
          lat: input.lat,
          lon: input.lon,
          description: input.description,
          endTime: input.endTime,
          startTime: input.startTime,
          name: input.name,
          userId: ctx.user.id,
        },
      });
    }),
  join: protectedProcedure
    .input(
      z.object({
        token: z.string().min(1),
        eventId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const eventFound = await ctx.prisma.event.findUnique({
        where: {
          id: input.eventId,
        },
      });
      if (!eventFound) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event is not found",
        });
      }
      await ctx.prisma.event.update({
        where: {
          id: input.eventId,
        },
        data: {
          attendees: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
  all: protectedProcedure
    .input(
      z.object({
        token: z.string().min(1),
      })
    )
    .query(async ({ ctx }) => {
      return Promise.all(
        (await ctx.prisma.event.findMany()).map(async (event) => ({
          ...event,
          relation:
            event.userId === ctx.user.id
              ? "owned"
              : !!(await ctx.prisma.user.findFirst({
                  where: {
                    id: ctx.user.id,
                    eventsIn: {
                      some: {
                        id: event.id,
                      },
                    },
                  },
                }))
              ? "attended"
              : "none",
        }))
      );
    }),
});
