import { Button } from '@/shared/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { AllDialog } from '@/widgets/AuthDialog/OurDialog';
import { LoginForm } from '@/widgets/Header/components/LoginForm/LoginForm';
import { NpaModal } from '@/widgets/NpaModal/NpaModal';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';
import { CircleUserRound, SquarePlus } from 'lucide-react';
import { useState } from 'react';

export const HomeHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <header className='flex justify-between items-center h-15 px-7.5 border-b'>
      <div className='flex gap-2.5 w-[320px]'>
        <Button prefix={<SquarePlus size={16} />}>
          <span>Создать ТЗ</span>
        </Button>
        <NpaModal />
      </div>
      <TabsList className='flex w-[220px]'>
        <TabsTrigger value='Редактор'>Редактор</TabsTrigger>
        <TabsTrigger value='Проверка'>Проверка</TabsTrigger>
      </TabsList>
      <Tabs defaultValue='Редактор' className='flex flex-row gap-2.5 justify-end'>
        {/* <Button prefix={<Copy size={16} />}>Копировать</Button> */}
        
        <AllDialog triggerIcon={<CircleUserRound size={16} />} triggerText='Вход' title='Вход в систему' isOpen={isOpen} setIsOpen={setIsOpen}>
              <LoginForm onSuccess={() => window.location.reload()} />
            </AllDialog>
        <ThemeSwitcher />
      </Tabs>
    </header>
  );
};
