import { useIsTaskEditPage } from '@/modules/task/model/hooks/useIsTaskEditPage';
import { useLogout } from '@/shared/hooks/useLogout';
import { useProfileUser } from '@/shared/hooks/useProfileUser';
import { Button } from '@/shared/ui/button';
import { DialogHeader } from '@/shared/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { AllDialog } from '@/widgets/AuthDialog/OurDialog';
import { LoginForm } from '@/widgets/Header/components/LoginForm/LoginForm';
import { RegisterForm } from '@/widgets/Header/components/RegisterForm/RegisterForm';
import { NpaCreateModal } from '@/widgets/NpaCreateModal/NpaCreateModal';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';
import { CircleUserRound, SquarePlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

export const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthorized } = useProfileUser();
  const navigate = useNavigate();

  const { onLogout } = useLogout();

  const onModalClose = () => {
    setIsOpen(false);
  };

  const handleCreateTask = () => {
    const tempTaskId = uuidv4();
    sessionStorage.setItem('tempTaskId', tempTaskId);
    navigate(`/task/${tempTaskId}/editor`);
  };

  return (
    <header className='flex justify-between items-center min-h-(--header-height) border-b px-4'>
      <div className='flex gap-2.5'>
        {isAuthorized && (
          <Button onClick={handleCreateTask} prefix={<SquarePlus size={16} />}>
            Создать ТЗ
          </Button>
        )}
        {isAuthorized && <NpaCreateModal />}
      </div>
      <TabsList className='flex'>
        <TabsTrigger value='Редактор'>Редактор</TabsTrigger>
        {isAuthorized && <TabsTrigger value='Проверка'>Проверка</TabsTrigger>}
        {isAuthorized && <TabsTrigger value='Рекомендуемые НПА'>Рекомендуемые НПА</TabsTrigger>}
      </TabsList>
      <Tabs defaultValue='Авторизация' className='flex flex-row gap-2.5 justify-end'>
        <AllDialog
          triggerIcon={!isAuthorized && <CircleUserRound size={16} />}
          triggerText={`${!isAuthorized ? 'Войти' : 'Выйти'}`}
          title='Вход в систему'
          authForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          triggerAction={onLogout}
        >
          <DialogHeader>
            <TabsList>
              <TabsTrigger className='hover:bg-background' value='Авторизация'>
                Авторизация
              </TabsTrigger>
              <TabsTrigger className='hover:bg-background' value='Регистрация'>
                Регистрация
              </TabsTrigger>
            </TabsList>
          </DialogHeader>
          <LoginForm triggerValue='Авторизация' />
          <RegisterForm triggerValue='Регистрация' onModalClose={onModalClose} />
        </AllDialog>
        <ThemeSwitcher />
      </Tabs>
    </header>
  );
};
