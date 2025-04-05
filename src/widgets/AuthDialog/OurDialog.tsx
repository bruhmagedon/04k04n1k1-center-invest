// AuthDialog.tsx
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { MagicCard } from '@/shared/ui/magic-card';
import { ReactNode } from 'react';

interface AuthDialogProps {
  triggerText: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AllDialog = ({ triggerText, title, children, isOpen, setIsOpen }: AuthDialogProps) => {
  const { theme } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={() => setIsOpen(true)}>{triggerText}</Button>
      <DialogContent className='sm:max-w-[425px] p-0'>
        <MagicCard className='w-full p-5 rounded-md' gradientColor={theme === 'dark' ? '#000' : '#fff'}>
          <DialogHeader>
            <DialogTitle className='mb-4'>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </MagicCard>
      </DialogContent>
    </Dialog>
  );
};
