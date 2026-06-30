import { trpc } from '../Lib/trpc';
import { getIdeasTrpcRoute } from './ideas/getIdeas/getIdeas';
import { getIdeaTrpcRoute } from './ideas/getIdea/getIdea';
import { createIdeaTrpcRoute } from './ideas/createIdea/createIdea';
import { signUpTrpcRoute } from './auth/signUp/SignUp';
import { signInTrpcRoute } from './auth/signIn/SignIn';
import { getMeTrpcRoute } from './auth/getMe/index';
import { updateIdeaTrpcRoute } from './ideas/updateIdea/updateIdea';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { updateProfileTrpcRoute } from './auth/updateProfile/updateProfile';
import { updatePasswordTrpcRoute } from './auth/updatePassword/updatePassword';
import { setIdeaLikeTrpcRoute } from './setIdeaLike/setIdeaLike';

export const trpcRouter = trpc.router({
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
