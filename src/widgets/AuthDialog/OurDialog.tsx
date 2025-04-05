// AuthDialog.tsx
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { MagicCard } from '@/shared/ui/magic-card';
import { TabsTrigger } from '@/shared/ui/tabs';
import { ReactNode } from 'react';

interface AuthDialogProps {
  triggerText: string;
  triggerIcon?: ReactNode;
  title: string;
  children?: ReactNode;
  isOpen: boolean;
  isTrugger? : boolean;
  triggerValue?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AllDialog = ({
  triggerText,
  title,
  children,
  isOpen,
  setIsOpen,
  triggerIcon,
  isTrugger,
  triggerValue
}: AuthDialogProps) => {
  const { theme } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isTrugger && triggerValue ? 
      <TabsTrigger value={triggerValue}>
      <Button onClick={() => setIsOpen(true)} prefix={triggerIcon}>
        {triggerText}
      </Button>
    </TabsTrigger> : 
      <Button onClick={() => setIsOpen(true)} prefix={triggerIcon}>
        {triggerText}
      </Button>
      }
      
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
