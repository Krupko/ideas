import { trpc } from '../../../Lib/trpc';
import { zGetIdeasTrpcInput } from './input';

export const getIdeasTrpcRoute = trpc.procedure
  .input(zGetIdeasTrpcInput)
  .query(async ({ ctx, input }) => {
    const rawIdeas = await ctx.prisma.idea.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
        email: true,
        createdAt: true,
        serialNumber: true,
        ...(ctx.me
          ? {
              ideasLikes: {
                select: {
                  userId: true,
                },
                where: { userId: ctx.me.id },
              },
            }
          : {}),
      },
      where: !input.search
        ? undefined
        : {
            OR: [
              {
                name: {
                  contains: input.search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: input.search,
                  mode: 'insensitive',
                },
              },
              {
                text: {
                  contains: input.search,
                  mode: 'insensitive',
                },
              },
            ],
          },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          serialNumber: 'desc',
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    });

    const nextIdea = rawIdeas.at(input.limit);
    const nextCursor = nextIdea?.serialNumber;
    const rawIdeasExceptNext = rawIdeas.slice(0, input.limit);
    const ideasExceptNext = rawIdeasExceptNext.map((idea) => ({
      ...idea,
      likesCount: idea.ideasLikes?.length ?? 0,
      isLikedByMe: !!idea.ideasLikes?.length,
    }));
    return { ideas: ideasExceptNext, nextCursor };
  });
