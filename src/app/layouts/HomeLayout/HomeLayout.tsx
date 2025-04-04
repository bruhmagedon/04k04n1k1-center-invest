import { Outlet } from 'react-router';

import { Header } from '@/widgets/Header/Header';

export const HomeLayout = () => {
  return (
    <div className='relative flex min-h-screen flex-col justify-center px-20'>
      <Header />
      {/* <HomeLayoutHeader /> */}
      <div className='flex-1 flex justify-center'>
        <Outlet />
      </div>
      {/* <HomeLayoutFooter /> */}
    </div>
  );
};
