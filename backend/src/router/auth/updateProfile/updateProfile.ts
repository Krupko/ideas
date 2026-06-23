import { zUpdateProfileTrpcInput } from './input';
import { toClientMe } from '../../../Lib/models';
import { trpc } from '../../../Lib/trpc';

export const updateProfileTrpcRoute = trpc.procedure
  .input(zUpdateProfileTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('НЕФВТОРИЗОВАННЫЙ');
    }
    if (ctx.me.nick !== input.nick) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          nick: input.nick,
        },
      });

      if (exUser) {
        throw new Error('ПОЛЬЗОВАТЕЛЬ С ТАКИМ НИКОМ УЖЕ СУЩЕСТВУЕТ');
      }
    }

    const updatedMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: input,
    });
    ctx.me = updatedMe;
    return toClientMe(updatedMe);
  });
