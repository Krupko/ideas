import { trpc } from '../Lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas/getideas';
import { getIdeaTrpcRoute } from './getIdea/getidea';
import { createIdeaTrpcRoute } from './createIdea/createIdea';
import { signUpTrpcRoute } from './signUp/SignUp';

export const trpcRouter = trpc.router({
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
