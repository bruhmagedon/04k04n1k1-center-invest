import CenterInvestLogo from '@/shared/assets/icons/logo.svg?react';
import { SidebarItem } from '@/widgets/SidebarItem/SidebarItem';
import { Search, FileQuestion } from 'lucide-react';
import { sidebarItems } from './SidebarItems.config';

export const LeftSideBar = () => {
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
        {sidebarItems.length > 0 ? (
          sidebarItems.map((item) => <SidebarItem key={item.id}>{item.title}</SidebarItem>)
        ) : (
          <div className='flex flex-col items-center justify-center py-10 text-center text-gray-400'>
            <FileQuestion size={48} className='mb-3 opacity-50' />
            <p className='text-lg font-medium'>Нет доступных элементов</p>
            <p className='text-sm mt-1'>Элементы появятся здесь позже</p>
          </div>
        )}
      </div>
    </div>
  );
};
