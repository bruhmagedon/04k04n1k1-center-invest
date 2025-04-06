import CenterInvestLogo from '@/shared/assets/icons/logo.svg?react';
import { SidebarItem } from '@/widgets/SidebarItem/SidebarItem';
import { Search, FileQuestion, Loader2, X } from 'lucide-react';
import { formatDate } from '@/shared/utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { useTasksQuery } from '@/modules/task/model/hooks/useTasksQuery';
import { useProfileUser } from '@/shared/hooks/useProfileUser';
import { cn } from '@/shared/utils/cn';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { toast } from 'sonner';
import { useDeleteTaskMutation } from '@/modules/task/model/hooks/useDeleteTaskMutation';

export const LeftSideBar = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useProfileUser();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTaskMutation();

  const { data, isLoading, isError } = useTasksQuery({
    enabled: isAuthorized,
    searchTerm: debouncedSearchTerm
  });

  const tasks = data?.results || [];

  const handleTaskClick = (taskId: number) => {
    navigate(`/task/${taskId}/editor`);
  };

  const handleDeleteTask = (taskId: number, taskName: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить задание "${taskName}"?`)) {
      deleteTask(taskId, {
        onSuccess: () => {
          toast.success('Задание успешно удалено');
        },
        onError: (error) => {
          console.error('Ошибка при удалении задания:', error);
          toast.error('Не удалось удалить задание');
        }
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className='bg-[#232325cc]/75 text-white min-w-[17.5rem] rounded-tl-xl overflow-hidden flex flex-col w-[20%]'>
      <div className='min-h-(--header-height) py-2.5 px-5 flex gap-2.5 items-center text-[1.55rem] border-b border-red font-bold'>
        <CenterInvestLogo />
        <span>Центр инвест</span>
      </div>
      <div className='px-2.5 relative'>
        {isAuthorized && (
          <div className='relative'>
            <input
              placeholder='Поиск'
              className='w-full pl-12.5 py-4 placeholder:font-medium font-medium pr-10 h-12 border-b-1 border-border rounded-none focus:outline-none'
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className='absolute top-3.5 left-5 cursor-pointer' size={20} strokeWidth={2.5} />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className='absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors'
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className='px-2.5 mt-2.5 pb-2.5 flex flex-col gap-1 w-full overflow-y-auto'>
        {isLoading ? (
          <div className='flex justify-center items-center py-10'>
            <Loader2 className='animate-spin' size={24} />
          </div>
        ) : isError ? (
          <div className='flex flex-col items-center mt-[30%] justify-center py-10 text-center text-gray-400'>
            <p className='text-lg font-medium'>Ошибка загрузки заданий</p>
            <p className='text-sm mt-1'>Попробуйте обновить страницу</p>
          </div>
        ) : tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <div key={task.id}>
                <SidebarItem
                  onItemClick={() => handleTaskClick(task.id)}
                  onDelete={() => handleDeleteTask(task.id, task.name)}
                >
                  <div className='flex flex-col w-full'>
                    <div className='font-medium truncate'>{task.name}</div>
                    <div className='text-xs text-gray-400 mt-1'>{formatDate(new Date(task.created_at))}</div>
                  </div>
                </SidebarItem>
              </div>
            ))}
          </>
        ) : (
          <div className='flex flex-col items-center mt-[65%] justify-center py-10 text-center text-gray-400'>
            <FileQuestion size={48} className='mb-3 opacity-50' />
            <p className='text-lg font-medium'>
              {searchTerm ? 'Ничего не найдено' : 'Нет доступных заданий'}
            </p>
            <p className='text-sm mt-1'>
              {searchTerm
                ? 'Попробуйте изменить поисковый запрос'
                : isAuthorized
                  ? 'Создайте техническое задание'
                  : 'Авторизуйтесь для создания технических заданий'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
