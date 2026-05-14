import { trpc } from '../../Lib/trpc';

export const getIdeasTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  console.log(ideas);
  return { ideas };
});
