import { z } from 'zod';
import { trpc } from '../../../Lib/trpc';

export const getIdeaTrpcRoute = trpc.procedure
  .input(z.object({ ideaNick: z.string() }))
  .query(async ({ ctx, input }) => {
    const rawIdea = await ctx.prisma.idea.findUnique({
      where: { nick: input.ideaNick },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        ideasLikes: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });

    const likesCount = rawIdea?.ideasLikes.length ?? 0;
    const isLikedByMe = !!ctx.me && rawIdea?.ideasLikes.some((like) => like.userId === ctx.me?.id);
    const idea = rawIdea && {
      ...rawIdea,
      author: rawIdea.author,
      likesCount,
      isLikedByMe,
    };
    return { idea };
  });
