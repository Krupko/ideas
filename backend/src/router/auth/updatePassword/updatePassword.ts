import { trpc } from '../../../Lib/trpc';
import { zUpdatePasswordTrpcInput } from './input';
import { getPasswordHash } from '../../../utils/getPasswordHash';

export const updatePasswordTrpcRoute = trpc.procedure
  .input(zUpdatePasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('НЕАВТОРИЗОВАННЫЙ');
    }

    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new Error('НЕ ПРАВИЛЬНЫЙ СТАРЫЙ ПАРОЛЬ');
    }

    const updatedMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        password: getPasswordHash(input.newPassword),
      },
    });
    ctx.me = updatedMe;
    return true;
  });
