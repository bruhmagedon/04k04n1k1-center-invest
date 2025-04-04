// AuthDialog.tsx
import { useTheme } from "@/shared/hooks/useTheme";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { MagicCard } from "@/shared/ui/magic-card";
import React, { Dispatch, SetStateAction, useEffect, createContext, ReactNode, useState, useContext } from "react";

interface AuthDialogProps {
  triggerText: string;
  title: string;
  children: ReactNode;
}

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const AllDialog = ({
  triggerText,
  title,
  children,
}: AuthDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    console.log("Dialog state changed:", isOpen);
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button onClick={() => setIsOpen(true)}>
          {triggerText}
        </Button>
        
        <DialogContent className="sm:max-w-[425px] p-0">
          <MagicCard className='w-full p-5 rounded-lg' gradientColor={theme === 'dark' ? '#000' : '#fff'}> 
            <DialogHeader>
              <DialogTitle className="mb-4">{title}</DialogTitle>
            </DialogHeader>
            {children}
          </MagicCard>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};