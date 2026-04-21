import _ from 'lodash';
import { ideas } from '../../Lib/ideas';
import { trpc } from '../../Lib/trpc';

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return {
    ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'email'])),
  };
});
