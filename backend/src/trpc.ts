import { initTRPC } from '@trpc/server'

const ideas = [
  {
    name: 'Анна Смирнова',
    age: '25',
    isActive: true,
    email: 'anna.s@example.com',
  },
  {
    name: 'Максим Иванов',
    age: '32',
    isActive: false,
    email: 'max.ivanov@example.com',
  },
  {
    name: 'Елена Козлова',
    age: '29',
    isActive: true,
    email: 'elena.kozlova@example.com',
  },
  {
    name: 'Дмитрий Петров',
    age: '41',
    isActive: true,
    email: 'dmitry.p@example.com',
  },
  {
    name: 'Ольга Новикова',
    age: '23',
    isActive: false,
    email: 'olga.novikova@example.com',
  },
  {
    name: 'Сергей Морозов',
    age: '35',
    isActive: true,
    email: 'sergey.m@example.com',
  },
  {
    name: 'Юлия Соколова',
    age: '28',
    isActive: false,
    email: 'yulia.sokolova@example.com',
  },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
