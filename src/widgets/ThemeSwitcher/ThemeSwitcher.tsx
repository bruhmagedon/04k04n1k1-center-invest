import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/shared/utils/cn';

interface ThemeToggleProps {
  className?: string;
}
export const ThemeSwitcher = ({ className }: ThemeToggleProps) => {
  const { setTheme, theme } = useTheme();

  const ToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div
      className={cn(
        'flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300',
        theme === 'dark' ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200',
        className
      )}
      tabIndex={0}
      onClick={ToggleTheme}
      role='button'
    >
      <div className='flex justify-between items-center w-full'>
        <div
          className={cn(
            'flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
            theme === 'dark' ? 'transform translate-x-0 bg-zinc-800' : 'transform translate-x-8 bg-gray-200'
          )}
        >
          {theme === 'dark' ? (
            <Moon className='w-4 h-4 text-white' strokeWidth={1.5} />
          ) : (
            <Sun className='w-4 h-4 text-gray-700' strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            'flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
            theme === 'dark' ? 'bg-transparent' : 'transform -translate-x-8'
          )}
        >
          {theme === 'dark' ? (
            <Sun className='w-4 h-4 text-gray-500' strokeWidth={1.5} />
          ) : (
            <Moon className='w-4 h-4 text-black' strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
};
