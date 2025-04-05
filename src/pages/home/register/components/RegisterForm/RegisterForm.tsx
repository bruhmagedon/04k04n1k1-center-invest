import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { homeRoutes } from '@/app/router/routesConfig';
import { useRegisterMutation } from '@/modules/auth/model/hooks/useRegisterMutation';
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Loader } from '@/shared/ui/loader';
import { MagicCard } from '@/shared/ui/magic-card';

import { usePasswordVisible } from '../../../../../widgets/Header/components/RegisterForm/utils/useChangeVisible';
import { registerSchema } from './registerSchema';

export function RegisterForm() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { visibleButton, inputType } = usePasswordVisible();
  // const { accessToken } = useTokenStore();

  const { mutate, isPending } = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // useEffect(() => {
  //   if (accessToken) {
  //     navigate('/');
  //   }
  // }, []);

  const onSubmit = ({ confirmPassword, ...restData }: z.infer<typeof registerSchema>) => {
    mutate(restData, {
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
    <div className='flex justify-center items-center   w-1/3 min-w-[21.5rem]'>
      <MagicCard className='w-full p-5 rounded-xl'>
        <Form {...form}>
          <form className=' space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
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
              <Button className='min-w-28.5' disabled={isPending} type='submit'>
                {isPending ? <Loader className='w-4 h-4' /> : 'Регистрация'}
              </Button>
              <Link to={homeRoutes.login.path}>
                <Button>Вход</Button>
              </Link>
            </div>
          </form>
        </Form>
      </MagicCard>
    </div>
  );
}
