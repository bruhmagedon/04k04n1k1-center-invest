import { Outlet } from 'react-router';
import { Tabs } from '@/shared/ui/tabs';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTaskQuery } from '@/modules/task/model/hooks/useTaskQuery';
import { createContext, useContext } from 'react';
import { Task } from '@/modules/task/model/types/types';

import { LeftSideBar } from '@/app/layouts/HomeLayout/components/LeftSideBar';
import { HomeHeader } from '@/app/layouts/HomeLayout/components/HomeHeader';
import { Loader } from '@/shared/ui/loader';


export const TaskContext = createContext<{
  task: Task | undefined;
  isLoading: boolean;
  isError: boolean;
}>({
  task: undefined,
  isLoading: false,
  isError: false
});

export const useTaskContext = () => useContext(TaskContext);

export const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();


  const {
    data: task,
    isLoading,
    isError
  } = useTaskQuery({
    id: id || '',
    enabled: !!id
  });

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
        {id && isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <Loader />
          </div>
        ) : id && isError ? (
          <div className='flex flex-col items-center justify-center h-full text-center'>
            <h2 className='text-xl font-bold mb-2'>Ошибка загрузки задания</h2>
            <p className='text-muted-foreground'>
              Не удалось загрузить техническое задание. Попробуйте обновить страницу.
            </p>
          </div>
        ) : (
          <TaskContext.Provider value={{ task, isLoading, isError }}>
            <Outlet />
          </TaskContext.Provider>
        )}
      </Tabs>
    </div>
  );
};
