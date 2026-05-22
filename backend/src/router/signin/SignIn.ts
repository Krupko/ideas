import { trpc } from '../../Lib/trpc';
import { zSignInTrpcInput } from './input';
import { getPasswordHash } from '../../utils/getPasswordHash';
import { signJWT } from '../../utils/signJWT';

export const signInTrpcRoute = trpc.procedure
  .input(zSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });
    if (!user) {
      throw new Error('Неверный логин или пароль');
    }
    const token = signJWT(user.id);
    return { token };
  });
