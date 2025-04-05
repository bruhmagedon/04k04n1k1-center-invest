import logoSvg from '@/shared/assets/logo.svg';
import { Search } from 'lucide-react';
export const LeftSideBar = () => {
  return (
    <div className='bg-[#232325cc]/75 min-w-[17.5rem] rounded-l-xl overflow-hidden'>
      <div className='h-15 py-2.5 px-5 flex gap-2.5 items-center text-[1.55rem] font-bold'>
        <img src={logoSvg} alt='' />
        <span>Зайти в туза</span>
      </div>
      <div className='px-2.5 relative'>
        <input
          placeholder='Поиск...'
          className='w-full pl-12.5 py-4 pr-4 h-12 border-b-1 border-0 border-b-[#6f6f74]'
          type='text'
        />
        <Search className='absolute top-4 left-5 cursor-pointer' size={16} />
      </div>
      <div className='px-2.5 mt-2.5 flex flex-col gap-1 w-full overflow-auto'>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 1</div>
        <div className='text-xl font-medium p-5 rounded-lg bg-[#fff]/10'>ТЗ 2</div>
      </div>
    </div>
  );
};
