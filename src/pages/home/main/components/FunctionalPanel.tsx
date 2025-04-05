import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { NpaModal } from '@/widgets/NpaModal/NpaModal';
import { handleDocxImport, handleExportPDF } from '../utils/documentHandlers';
import { useProfileUser } from '@/shared/hooks/useProfileUser';

interface FunctionalPanelProps {
  theme: string;
}

export const FunctionalPanel = ({ theme }: FunctionalPanelProps) => {
  const { isAuthorized } = useProfileUser();

  return (
    <div
      style={{
        border: '0.125rem solid transparent',
        background: cn(
          `linear-gradient(${theme === 'dark' ? '#232325' : '#ffffff'}, ${
            theme === 'dark' ? '#232325' : '#ffffff'
          }) padding-box,`,
          `${
            theme === 'dark'
              ? 'radial-gradient(circle, #047118, #0c8334, #0b931f) border-box'
              : 'linear-gradient(90deg, #4db8ff, #b3e0ff, #e6f7ff) border-box'
          }`
        ),
        borderRadius: '1rem'
      }}
      className='flex relative max-w-fit inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full z-1 px-2 py-2 items-center justify-center space-x-4'
    >
      <Button className='rounded-md' onClick={handleDocxImport}>
        Импортировать из DOCX
      </Button>
      {isAuthorized && <Button className='rounded-md'>Определить подходящие НПА</Button>}
      {isAuthorized && <NpaModal />}
      <Button onClick={handleExportPDF} className='rounded-md'>
        Экспортировать в PDF
      </Button>
    </div>
  );
};
