import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const ideas = _.times(30, i => ({
	name: `Анна Смирнова ${i}`,
	nick: `${i}`,
	isActive: true,
	email: `${i} anna.s@example.com`,
	text: _.times(
		30,
		j => `<p>Основной текст раздела ${j} от кандидата ${i}...</p>`,
	).join('\n'),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
	getIdeas: trpc.procedure.query(() => {
		return { ideas: ideas.map(idea => _.pick(idea, ['nick', 'name', 'email'])) }
	}),
	getIdea: trpc.procedure
		.input(z.object({ ideaNick: z.string() }))
		.query(({ input }) => {
			const idea = ideas.find(idea => idea.nick === input.ideaNick)
			return { idea: idea || null }
		}),
})

export type TrpcRouter = typeof trpcRouter
