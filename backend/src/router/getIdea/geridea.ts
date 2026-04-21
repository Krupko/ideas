import { z } from 'zod';
import { ideas } from '../../Lib/ideas';
import { trpc } from '../../Lib/trpc';

export const getIdeaTrpcRoute = trpc.procedure
  .input(z.object({ ideaNick: z.string() }))
  .query(({ input }) => {
    const idea = ideas.find((idea) => idea.nick === input.ideaNick);
    return { idea: idea || null };
  });
