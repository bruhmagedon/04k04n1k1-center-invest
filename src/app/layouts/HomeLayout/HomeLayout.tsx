import { Tabs, TabsContent } from '@/shared/ui/tabs';

import { LeftSideBar } from '@/app/layouts/HomeLayout/components/LeftSideBar';
import { HomeHeader } from '@/app/layouts/HomeLayout/components/HomeHeader';
export const HomeLayout = () => {
  return (
    //todo: 97vh
    <div className='relative flex justify-center mx-7.5 mt-7.5 rounded-t-xl h-[97vh]'>
      <LeftSideBar />
      <Tabs defaultValue='Редактор' className='w-full bg-[#232325] rounded-tr-xl'>
        <HomeHeader />
        <main>
          <TabsContent value='Редактор'>Make changes to your account here.</TabsContent>
          <TabsContent value='Проверка'>Change your password here.</TabsContent>
        </main>
      </Tabs>
    </div>
  );
};
