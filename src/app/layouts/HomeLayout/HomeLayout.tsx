import { Outlet } from 'react-router';
import { Tabs } from '@/shared/ui/tabs';

import { LeftSideBar } from '@/app/layouts/HomeLayout/components/LeftSideBar';
import { HomeHeader } from '@/app/layouts/HomeLayout/components/HomeHeader';
export const HomeLayout = () => {
  return (
    <div className='absolute inset-0 top-7.5 left-7.5 right-7.5 flex'>
      <LeftSideBar />
      <Tabs defaultValue='Редактор' className='flex-1 h-full bg-background rounded-tr-xl gap-0'>
        <HomeHeader />
        <main>
          {/* <TabsContent value='Редактор'>Make changes to your account here.</TabsContent>
          <TabsContent value='Проверка'>Change your password here.</TabsContent> */}
          <Outlet />
        </main>
      </Tabs>
    </div>
  );
};
