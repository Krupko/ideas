import { z } from 'zod';

export const zSignTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'nick должен состоять из прописных букв, цифр тире'),
  password: z.string().min(1),
});
