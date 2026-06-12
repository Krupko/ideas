import { trpc } from '../../../Lib/trpc';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw Error('АВТОРИЗУЙТЕСЬ!');
    }

    const existingIdea = await ctx.prisma.idea.findUnique({
      where: { nick: input.nick },
    });

    if (existingIdea) {
      throw new Error('Такая запись уже существует!');
    }

    await ctx.prisma.idea.create({
      data: {
        name: input.name,
        nick: input.nick,
        description: input.description,
        text: input.text,
        email: input.email,
        authorId: ctx.me.id,
      },
    });

    return true;
  });
