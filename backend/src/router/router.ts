import { trpc } from '../Lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas/getideas';
import { getIdeaTrpcRoute } from './getIdea/getidea';
import { createIdeaTrpcRoute } from './createIdea/createIdea';

export const trpcRouter = trpc.router({
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
