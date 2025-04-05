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

export const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthorized } = useProfileUser();
  const { onLogout } = useLogout();

  //  return (
  //     <Dialog open={isOpen} onOpenChange={setIsOpen}>
  //       {!isAuthorized ? (
  //         <Button onClick={() => setIsOpen(true)} prefix={triggerIcon}>
  //           {triggerText}
  //         </Button>
  //       ) : (
  //         <Button onClick={onLogout}>Выйти</Button>
  //       )}

  const onModalClose = () => {
    setIsOpen(false);
  };

  return (
    <header className='flex justify-between items-center h-15 px-7.5 border-b'>
      <div className='flex gap-2.5 w-[320px]'>
        <Button prefix={<SquarePlus size={16} />}>
          <span>Создать ТЗ</span>
        </Button>
        <NpaCreateModal />
      </div>
      <TabsList className='flex '>
        <TabsTrigger value='Редактор'>Редактор</TabsTrigger>
        <TabsTrigger value='Проверка'>Проверка</TabsTrigger>
        <TabsTrigger value='Рекомендуемые НПА'>Рекомендуемые НПА</TabsTrigger>
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
