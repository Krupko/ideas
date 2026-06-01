import { trpc } from '../Lib/trpc';
import { getIdeasTrpcRoute } from './getIdeas/getideas';
import { getIdeaTrpcRoute } from './getIdea/getidea';
import { createIdeaTrpcRoute } from './createIdea/createIdea';
import { signUpTrpcRoute } from './signUp/SignUp';
import { signInTrpcRoute } from './signin/SignIn';
import { getMeTrpcRoute } from './getMe/index';
import { updateIdeaTrpcRoute } from './updateIdea/updateIdea';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const trpcRouter = trpc.router({
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
