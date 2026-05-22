import { trpc } from '../Lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas/getideas';
import { getIdeaTrpcRoute } from './getIdea/getidea';
import { createIdeaTrpcRoute } from './createIdea/createIdea';
import { signUpTrpcRoute } from './signUp/SignUp';
import { signInTrpcRoute } from './signin/SignIn';
import { getMeTrpcRoute } from './getMe/index';

export const trpcRouter = trpc.router({
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
