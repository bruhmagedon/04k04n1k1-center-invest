import CenterInvestLogo from '@/shared/assets/icons/logo.svg?react';
import { SidebarItem } from '@/widgets/SidebarItem/SidebarItem';
import { Search, FileQuestion, Loader2 } from 'lucide-react';
import { formatDate } from '@/shared/utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { useTasksQuery } from '@/modules/task/model/hooks/useTasksInfiniteQuery';

export const LeftSideBar = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTasksQuery();

  const tasks = data?.results || [];

  const handleTaskClick = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className='bg-[#232325cc]/75 text-white min-w-[17.5rem] rounded-tl-xl overflow-hidden flex flex-col w-[20%]'>
      <div className='min-h-(--header-height) py-2.5 px-5 flex gap-2.5 items-center text-[1.55rem] border-b border-red font-bold'>
        <CenterInvestLogo />
        <span>Центр инвест</span>
      </div>
      <div className='px-2.5 relative'>
        <input
          placeholder='Поиск'
          className='w-full pl-12.5 py-4 placeholder:font-medium font-medium pr-4 h-12 border-b-1 border-border rounded-none focus:outline-none'
          type='text'
        />
        <Search className='absolute top-3.5 left-5 cursor-pointer' size={20} strokeWidth={2.5} />
      </div>
      <div className='px-2.5 mt-2.5 pb-2.5 flex flex-col gap-1 w-full overflow-y-auto'>
        {/* <div className='flex justify-center pb-4 pt-2'>
          <Button
            theme='unstyled'
            size='large'
            className='bg-white/40 flex-1 text-black hover:bg-white/60 text-md px-0'
            prefix={<Pencil size={18} />}
          >
            Создать шаблон для ТЗ
          </Button>
        </div> */}

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
              <div key={task.id} onClick={() => handleTaskClick(task.id)}>
                <SidebarItem>
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
            <p className='text-lg font-medium'>Нет доступных заданий</p>
            <p className='text-sm mt-1'>Создайте техническое задание</p>
          </div>
        )}
      </div>
    </div>
  );
};
