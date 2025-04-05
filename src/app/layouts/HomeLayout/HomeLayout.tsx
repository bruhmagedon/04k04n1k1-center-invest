import { Outlet } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { CircleUserRound, Copy, Notebook, ScrollText, Search, SquarePlus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import logoSvg from '@/shared/assets/logo.svg';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher/ThemeSwitcher';
export const HomeLayout = () => {
  return (
    //todo: 97vh
    <div className='relative flex justify-center mx-7.5 mt-7.5 rounded-t-xl h-[97vh]'>
      <div className='bg-[#232325cc]/75 min-w-[17.5rem] rounded-tl-xl overflow-hidden'>
        <div className='h-15 py-2.5 px-5 flex gap-2.5 items-center text-[1.55rem] font-bold'>
          <img src={logoSvg} alt='' />
          <span>Редактор ТЗ</span>
        </div>
        <div className='px-2.5 relative'>
          <input
            placeholder='Поиск...'
            className='w-full pl-12.5 py-4 pr-4 h-12 border-b-1 border-0 border-b-[#6f6f74]'
            type='text'
          />
          <Search className='absolute top-4 left-5 cursor-pointer' size={16} />
        </div>
        <div className='px-2.5 mt-2.5 flex flex-col gap-1 w-full overflow-auto'>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
          <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        </div>
      </div>
      <Tabs defaultValue='Редактор' className='w-full bg-[#232325] rounded-tr-xl'>
        <header className='flex justify-between items-center h-15 px-7.5'>
          <div className='flex gap-2.5 w-[280px]'>
            <Button prefix={<SquarePlus size={16} />}>
              <span>Создать ТЗ</span>
            </Button>
            <Button prefix={<Notebook size={16} />}>
              <span>Выбрать НПА</span>{' '}
            </Button>
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
        <main>
          <TabsContent value='Редактор'>Make changes to your account here.</TabsContent>
          <TabsContent value='Проверка'>Change your password here.</TabsContent>
        </main>
      </Tabs>
    </div>
  );
};
{
  /* <Header /> */
}
{
  /* <HomeLayoutHeader /> */
}
// <div className='flex-1 flex justify-center'>
//   <Outlet />
// </div>
{
  /* <HomeLayoutFooter /> */
}
