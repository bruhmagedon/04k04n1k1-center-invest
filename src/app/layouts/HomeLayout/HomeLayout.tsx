import { Outlet } from 'react-router';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';

import { LeftSideBar } from '@/app/layouts/HomeLayout/components/LeftSideBar';
import { HomeHeader } from '@/app/layouts/HomeLayout/components/HomeHeader';
import { useProfileUser } from '@/shared/hooks/useProfileUser';
import TaskEditorPage from '@/pages/home/task-editor-page/TaskEditorPage';
import VerificationPage from '@/pages/home/verification-page/VerificationPage';
import RecommendedNpaPage from '@/pages/home/recommended-npa-page/RecommendedNpaPage';

export const HomeLayout = () => {
  const { isAuthorized } = useProfileUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL or default to 'Редактор'
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/verification')) return 'Проверка';
    if (path.includes('/recommended-npa')) return 'Рекомендуемые НПА';
    return 'Редактор';
  };
  
  const handleTabChange = (value: string) => {
    // Navigate based on tab selection
    switch (value) {
      case 'Проверка':
        navigate('/verification');
        break;
      case 'Рекомендуемые НПА':
        navigate('/recommended-npa');
        break;
      default:
        navigate('/');
        break;
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
        
        
        
        <TaskEditorPage />
        {isAuthorized && <VerificationPage />}
        {isAuthorized && <RecommendedNpaPage />}
      </Tabs>
    </div>
  );
};
