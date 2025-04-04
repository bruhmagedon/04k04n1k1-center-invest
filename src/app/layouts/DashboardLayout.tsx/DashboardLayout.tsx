import { Outlet } from 'react-router';

export const DashboardLayout = () => {
  return (
    <div className='relative flex min-h-screen flex-col'>
      DashboardLayout
      {/* <HomeLayoutHeader /> */}
      <div className='flex-1'>
        <Outlet />
      </div>
      {/* <HomeLayoutFooter /> */}
    </div>
  );
};
