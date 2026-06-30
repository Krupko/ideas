import { trpc } from '../../Lib/trpc';
import { zSetIdeaLikeIdeaTrpcInput } from './input';

export const setIdeaLikeTrpcRoute = trpc.procedure
  .input(zSetIdeaLikeIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { ideaId, isLikedByMe } = input;

    if (!ctx.me) {
      throw new Error('АВТОРИЗУЙТЕСЬ');
    }

    const idea = await ctx.prisma.idea.findUnique({
      where: {
        id: ideaId,
      },
    });

    if (!idea) {
      throw new Error('НЕ НАЙДЕНО');
    }

    if (isLikedByMe) {
      await ctx.prisma.ideaLike.upsert({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          ideaId,
        },
        update: {},
      });
    } else {
      await ctx.prisma.ideaLike.delete({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
      });
    }

    const likesCount = await ctx.prisma.ideaLike.count({
      where: {
        ideaId,
      },
    });
    return {
      idea: {
        id: idea.id,
        likesCount,
        isLikedByMe,
      },
    };
  });
