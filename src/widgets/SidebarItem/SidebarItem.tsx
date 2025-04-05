import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { Trash2 } from 'lucide-react';

interface SidebarItemProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarItem = ({ className, children }: SidebarItemProps) => {
  return (
    <div
      className={cn(
        'flex justify-between items-center gap-1',
        'text-md font-medium p-5 pr-3 rounded-lg min-h-15 max-h-25 bg-white/10 cursor-pointer',
        'transition-all duration-200 ease-in-out',
        'hover:bg-white/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/10',
        className
      )}
    >
      <div className='overflow-hidden text-ellipsis whitespace-nowrap flex-1'>{children}</div>
      <Button size='icon' theme='unstyled' className='hover:bg-gray-100/20 flex-shrink-0 rounded-sm'>
        <Trash2 size={16} />
      </Button>
    </div>
  );
};
