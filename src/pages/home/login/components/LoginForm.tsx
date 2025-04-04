'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { homeRoutes } from '@/app/router/routesConfig';
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { MagicCard } from '@/shared/ui/magic-card';
import { useLoginMutation } from '@/modules/auth/model/hooks/useLoginMutation';
import { Loader } from '@/shared/ui/loader';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Поле должно быть имейлом, например 222@gmail.com'
  }),
  password: z.string().min(2, {
    message: 'Пароль должен быть длиннее 2 символов'
  })
});
export function LoginForm() {
  const { theme } = useTheme();
  const { register } = homeRoutes;
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''

    }
  });
  useEffect(() => {
      if (localStorage.getItem('token-storage')) {
        navigate('/');
      }
  }, []);
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success('Успешная регистрация');

        navigate('/');
      },
      onError: (error) => {
        toast.error('Oшибка регистрации', { description: error.response?.data.detail });
      }
    });
  };

  return (
    <div className='flex justify-center items-center   w-1/3'>
      <MagicCard className='w-full p-5 rounded-xl' gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}>
        <Form {...form}>
          <form className=' space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Введите Email' {...field} />
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
                      <Input type={isVisible ? 'text' : 'password'} placeholder='Введите пароль' {...field} />
                      <button
                        aria-label={isVisible ? 'Hide password' : 'Show password'}
                        aria-pressed={isVisible}
                        className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                        type='button'
                        aria-controls='password'
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeOff aria-hidden='true' size={16} strokeWidth={2} />
                        ) : (
                          <Eye aria-hidden='true' size={16} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              name='password'

              control={form.control}
            />
            <div className='flex gap-2'>
             <Button className='min-w-28.5' disabled={isPending} type='submit'>
                {isPending ? <Loader className='w-4 h-4' /> : 'Вход'}
              </Button>
              <Link to={register.path}><Button>Регистрация</Button></Link>
            </div>

          </form>
        </Form>
      </MagicCard>
    </div>

  );
}
