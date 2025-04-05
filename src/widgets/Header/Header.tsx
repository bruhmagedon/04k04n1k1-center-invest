// src/widgets/Header/Header.tsx
import { QueryCache } from '@tanstack/react-query';
import { useTokenStore } from '@/modules/auth/model/store/authStore';

import { Button } from '@/shared/ui/button';

import { Link } from 'react-router';
import { useGetUserQuery } from '@/modules/user/model/hooks/useGetUserQuery';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';
import { AllDialog } from '@/widgets/AuthDialog/OurDialog';
import { RegisterForm } from '@/widgets/Header/components/RegisterForm/RegisterForm';
import { LoginForm } from '@/widgets/Header/components/LoginForm/LoginForm';

export const Header = () => {
  const { data } = useGetUserQuery();
  const { accessToken, setAccessToken } = useTokenStore();
  const queryCache = new QueryCache();

  const logOut = () => {
    localStorage.clear();
    setAccessToken(null);
    queryCache.clear();
  };

  return (
    <header className='flex items-center justify-between h-12 mt-4'>
      <Link to='/'>
        <span className='text-3xl font-bold cursor-pointer'>Главная</span>
      </Link>

      <div className='flex gap-2 items-center'>
        <ThemeSwitcher />

        {data ? (
          <Button onClick={logOut}>Выход</Button>
        ) : (
          <>
            <AllDialog triggerText='Вход' title='Вход в систему'>
              <LoginForm onSuccess={() => window.location.reload()} />
            </AllDialog>

            <AllDialog triggerText='Регистрация' title='Регистрация'>
              <RegisterForm onSuccess={() => window.location.reload()} />
            </AllDialog>
          </>
        )}
      </div>
    </header>
  );
};
