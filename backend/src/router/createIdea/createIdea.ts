import { ideas } from '../../Lib/ideas';
import { trpc } from '../../Lib/trpc';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(({ input }) => {
    const newIdea = {
      name: input.name,
      nick: input.nick,
      description: input.description,
      isActive: true,
      email: `${input.nick} user@example.com`,
      text: input.text,
    };

    if (ideas.find((idea) => idea.nick === input.nick)) {
      throw Error('Такая запись уже существует!');
    }
    ideas.unshift(newIdea);
    return true;
  });
