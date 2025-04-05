import { Button } from '@/shared/ui/button';
import { TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { NpaModal } from '@/widgets/NpaModal/NpaModal';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';
import { CircleUserRound, SquarePlus } from 'lucide-react';

export const HomeHeader = () => {
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
      <div className='flex gap-2.5 w-[280px] justify-end'>
        {/* <Button prefix={<Copy size={16} />}>Копировать</Button> */}
        <Button prefix={<CircleUserRound size={16} />}>Войти</Button>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
