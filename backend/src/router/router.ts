import { trpc } from '../Lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas/getideas';
import { getIdeaTrpcRoute } from './getIdea/geridea';

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
