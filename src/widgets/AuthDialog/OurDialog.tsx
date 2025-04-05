import { useTokenStore } from '@/modules/auth/model/store/authStore';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { MagicCard } from '@/shared/ui/magic-card';

import { ReactNode } from 'react';

interface AuthDialogProps {
  triggerText: string;
  triggerIcon?: ReactNode;
  title: string;
  children?: ReactNode;
  isOpen: boolean;
  triggerAction?: () => void;
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
  triggerAction
}: AuthDialogProps) => {
  const { accessToken } = useTokenStore();

  const onClick = () => {
    if (!accessToken) {
      setIsOpen(true);
    }

    if (accessToken) {
      triggerAction?.();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={onClick} prefix={triggerIcon}>
        {triggerText}
      </Button>
      <DialogContent className='sm:max-w-[26.5rem] p-0 min-h-[27.5rem]'>
        <MagicCard className='w-full p-5 rounded-md flex'>
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
