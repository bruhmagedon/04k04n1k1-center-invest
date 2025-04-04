import { Link } from 'react-router';

import { homeRoutes } from '@/app/router/routesConfig';
import { Button } from '@/shared/ui/button';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';

export const Header = () => {
  const { login, index, register } = homeRoutes;
  return (
    <header className='flex items-center justify-between h-12 mt-4'>
      <Link to={index.path}>
        <span className='text-3xl font-bold cursor-pointer'>Главная</span>
      </Link>
      <div className='flex gap-2 items-center'>
        <ThemeSwitcher />
        <Link to={login.path}>
          <Button className=''>Вход</Button>
        </Link>
        <Link to={register.path}>
          <Button>Регистрация</Button>
        </Link>
      </div>
    </header>
  );
};
