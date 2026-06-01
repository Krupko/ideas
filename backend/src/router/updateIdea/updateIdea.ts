import { trpc } from '../../Lib/trpc';
import { zUpdateIdeaTrpcInput } from './input';

export const updateIdeaTrpcRoute = trpc.procedure
  .input(zUpdateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { ideaId, ...ideaInput } = input;

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

    if (ctx.me.id !== idea.authorId) {
      throw new Error('ЭТО НЕ ВАША ИДЕЯ');
    }

    if (idea.nick !== input.nick) {
      const exIdea = await ctx.prisma.idea.findUnique({
        where: {
          nick: input.nick,
        },
      });

      if (exIdea) {
        throw new Error('ИДЕЯ С ТАКИМ НОМЕРОМ УЖЕ СУЩЕСТВУЕТ');
      }
    }

    await ctx.prisma.idea.update({
      where: {
        id: ideaId,
      },
      data: {
        ...ideaInput,
      },
    });
    return true;
  });
