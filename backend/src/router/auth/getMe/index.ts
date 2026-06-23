import { toClientMe } from '../../../Lib/models';
import { trpc } from '../../../Lib/trpc';

export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
  if (!ctx.me) {
    return { me: null };
  }
  return { me: toClientMe(ctx.me) };
});
