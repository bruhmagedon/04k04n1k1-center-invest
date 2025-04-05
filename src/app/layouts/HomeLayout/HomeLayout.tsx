import { Outlet } from 'react-router';
import { Tabs } from '@/shared/ui/tabs';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { LeftSideBar } from '@/app/layouts/HomeLayout/components/LeftSideBar';
import { HomeHeader } from '@/app/layouts/HomeLayout/components/HomeHeader';

export const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/verification')) return 'Проверка';
    if (path.includes('/recommended-npa')) return 'Рекомендуемые НПА';
    return 'Редактор';
  };

  const handleTabChange = (value: string) => {
    if (id) {
      switch (value) {
        case 'Проверка':
          navigate(`/task/${id}/verification`);
          break;
        case 'Рекомендуемые НПА':
          navigate(`/task/${id}/recommended-npa`);
          break;
        default:
          navigate(`/task/${id}/editor`);
          break;
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className='absolute inset-0 top-7.5 left-7.5 right-7.5 flex'>
      <LeftSideBar />
      <Tabs
        defaultValue='Редактор'
        value={getActiveTab()}
        onValueChange={handleTabChange}
        className='flex-1 h-full bg-background rounded-tr-xl gap-0'
      >
        <HomeHeader />
        <Outlet />
      </Tabs>
    </div>
  );
};
