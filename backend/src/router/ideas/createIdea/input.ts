import { z } from 'zod';

export const zCreateIdeaTrpcInput = z.object({
  name: z
    .string()
    .or(z.undefined())
    .transform((val) => val ?? '')
    .refine((val) => val.length >= 3, 'Не менее 3 символов'),
  nick: z
    .string()
    .or(z.undefined())
    .transform((val) => val ?? '')
    .refine((val) => val.length >= 3, 'Не менее 3 символов')
    .refine((val) => /^[a-z0-9-]+$/.test(val), 'Только строчные буквы, цифры и дефис'),
  description: z
    .string()
    .or(z.undefined())
    .transform((val) => val ?? '')
    .refine((val) => val.length >= 3, 'Описание обязательно'),
  text: z
    .string()
    .or(z.undefined())
    .transform((val) => val ?? '')
    .refine((val) => val.length >= 7, 'Не менее 7 символов'),
  email: z
    .string()
    .or(z.undefined())
    .transform((val) => val ?? '')
    .refine((val) => val.length >= 7, 'Не менее 7 символов'),
});
