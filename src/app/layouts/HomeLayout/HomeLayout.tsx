import { Outlet } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"

import { CircleUserRound, Copy, ScrollText, Search, SquarePlus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import logoSvg from '@/shared/assets/logo.svg'
export const HomeLayout = () => {
  return (
    //todo: 97vh
    <div className='relative flex  justify-center mx-7.5 mt-7.5 rounded-xl h-[97vh]'>
      <div className='bg-[#232325cc]/75 min-w-[17.5rem] rounded-l-xl overflow-hidden'>
     
          <div className='h-15 py-2.5 px-5 flex gap-2.5 items-center text-[1.55rem] font-bold'>
            <img src={logoSvg} alt="" />
            <span>Редактор ТЗ</span>
          </div>
          <div className='px-2.5 relative'><input placeholder='Поиск...' className='w-full pl-12.5 py-4 pr-4 h-12 border-b-1 border-0 border-b-[#6f6f74]' type="text" /><Search className='absolute top-4 left-5 cursor-pointer' size={16} /></div>
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
      <Tabs defaultValue="account" className="w-full bg-[#232325] rounded-r-xl">
      
        <header className='flex justify-between items-center h-15 px-7.5'>
          <div className='flex gap-2.5'>
            <Button className='flex items-center p-2.5' prefix={ <SquarePlus size={16} />}><span>Создать</span></Button>
            <Button className='flex items-center p-2.5' prefix={ <ScrollText size={16} />}><span>Выбрать НПА</span> </Button>
          </div>
          
          <TabsList className='flex'>
            <TabsTrigger value="Редактор">Редактор</TabsTrigger>
            <TabsTrigger value="Проверка">Проверка</TabsTrigger>
          </TabsList>
          <div className='flex gap-2.5'>
            <Button className='flex items-center p-2.5' prefix={ <Copy size={16} />}><span>Копировать</span>  </Button>
            <Button className='flex items-center p-2.5' prefix={ <CircleUserRound size={16} />}><span>Войти</span> </Button>
          </div>
          
        </header>
      
      </Tabs>
      
    </div>
  );
};
{/* <Header /> */}
      {/* <HomeLayoutHeader /> */}
      // <div className='flex-1 flex justify-center'>
      //   <Outlet />
      // </div>
      {/* <HomeLayoutFooter /> */}