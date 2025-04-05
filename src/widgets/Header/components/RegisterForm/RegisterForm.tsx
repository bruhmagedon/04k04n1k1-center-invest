// src/modules/auth/ui/RegisterForm/RegisterForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRegisterMutation } from '@/modules/auth/model/hooks/useRegisterMutation';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Loader } from '@/shared/ui/loader';
import { toast } from 'sonner';
import { usePasswordVisible } from '@/widgets/Header/components/RegisterForm/utils/useChangeVisible';
import { TabsContent } from '@/shared/ui/tabs';

const registerSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6)
});
export interface RegisterFormProps {
  onSuccess?: () => void,
  triggerValue: string
}
export function RegisterForm({ onSuccess, triggerValue }: RegisterFormProps) {
  const { mutate, isPending } = useRegisterMutation();
  const { visibleButton, inputType } = usePasswordVisible();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success('Успешная регистрация');
        onSuccess?.();
      },
      onError: (error) => {
        toast.error('Ошибка регистрации', { description: error.response?.data.detail });
      }
    });
  };

  return (
    <Form {...form}>
      <form className=' space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
      <TabsContent value={triggerValue}>
      <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input placeholder='Введите логин' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='username'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Введите Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='email'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input type={inputType} placeholder='Введите пароль' {...field} />
                  {visibleButton}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='password'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input type={inputType} placeholder='Введите пароль' {...field} />
                  {visibleButton}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='confirmPassword'
          control={form.control}
        />
        <div className='flex gap-2'>
          <Button className='min-w-28.5 w-full' disabled={isPending} type='submit'>
            {isPending ? <Loader className='w-4 h-4' /> : 'Регистрация'}
          </Button>
        </div>
      </TabsContent>
       
        
      </form>
    </Form>
  );
}
