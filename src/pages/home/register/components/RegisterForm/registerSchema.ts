import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(2, {
    message: 'Логин должен содержать не менее 2 символов'
  }).regex(/^\w+$/, {
    message: 'Логин может содержать только буквы, цифры и _'
  }),
  email: z.string().email({
    message: 'Некорректный email'
  }),
  password: z.string().min(2, {
    message: 'Пароль должен содержать не менее 2 символов'
  }),
  confirmPassword: z.string().min(2, {
    message: 'Пароль должен содержать не менее 2 символов'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword']
});
