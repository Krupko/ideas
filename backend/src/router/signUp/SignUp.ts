import crypto from 'crypto';
import { trpc } from '../../Lib/trpc';
import { zSignUpTrpcInput } from './input';

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (exUser) {
      throw new Error('User с таким ником уже существует');
    }
    await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: crypto.createHash('sha256').update(input.password).digest('hex'),
      },
    });
    return true;
  });
