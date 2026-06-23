import { z } from 'zod';

export const zUpdateProfileTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'В НИКТЕЙМЕ МОГУТ СОДЕРЖАТЬСЯ ТОЛЬКО СТРОЧНЫЕ БУКВЫ, ЦИФРЫ И ТИРЕ'),
  name: z.string().max(50).default(''),
});
