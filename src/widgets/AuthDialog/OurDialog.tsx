// AuthDialog.tsx
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { MagicCard } from '@/shared/ui/magic-card';
import { TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { ReactNode } from 'react';

interface AuthDialogProps {
  triggerText: string;
  triggerIcon?: ReactNode;
  title: string;
  children?: ReactNode;
  isOpen: boolean;

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

  
}: AuthDialogProps) => {
  const { theme } = useTheme();

  return (
    <Dialog  open={isOpen} onOpenChange={setIsOpen}>
     
   
      <Button onClick={() => setIsOpen(true)} prefix={triggerIcon}>
        {triggerText}
      </Button>
      
      
     <DialogContent className='sm:max-w-[26.5rem] p-0 min-h-[27.5rem]'>
          <MagicCard className='w-full p-5 rounded-md flex' >
            <div className='flex flex-col gap-4 justify-between h-full relative'>
            <DialogHeader>
              <DialogTitle className='mb-4'>{title}</DialogTitle>
            </DialogHeader>
            {children}
            </div>
            
            
            
          </MagicCard>
      </DialogContent>
        
    
      
      
    </Dialog>
  );
};
