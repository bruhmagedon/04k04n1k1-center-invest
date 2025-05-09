import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { NpaModal } from '@/widgets/NpaModal/NpaModal';
import { handleCheked, handleDocxImport, handleExportPDF } from '../utils/documentHandlers';
import { useProfileUser } from '@/shared/hooks/useProfileUser';
import DocxIcon from '@/shared/assets/icons/docx.svg?react';
import PdfIcon from '@/shared/assets/icons/pdf.svg?react';
import { useSearchNpaMutation } from '@/modules/npa/model/hooks/useSearchNpaMutation';
import { useEffect } from 'react';
import { Loader } from '@/shared/ui/loader';
import { UseMutateFunction } from '@tanstack/react-query';
import { CreateTaskResponse } from '@/modules/task/model/types/types';
import { newAxiosError } from '@/shared/api/types';

interface FunctionalPanelProps {
  theme: string;
  createTask?: UseMutateFunction<CreateTaskResponse, newAxiosError, FormData, unknown>;
}

export const FunctionalPanel = ({ theme, createTask }: FunctionalPanelProps) => {
  const { isAuthorized } = useProfileUser();
  const { initialSearchMutation, isLoading } = useSearchNpaMutation();
  const { mutate: searchNpa } = initialSearchMutation;

  useEffect(() => {
    console.log('fetching', isLoading);
  }, [isLoading]);

  const handleCheck = () => {
    handleCheked(searchNpa, createTask);
  };

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
      className='flex relative max-w-fit mb-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full z-1 px-2 py-2 items-center justify-center space-x-4'
    >
      {isLoading && <Loader />}
      <Button className='rounded-md' onClick={handleDocxImport} postfix={<DocxIcon className='size-8' />}>
        Импорт из
      </Button>
      {isAuthorized && (
        <Button className='rounded-md' onClick={handleCheck}>
          Определить подходящие НПА
        </Button>
      )}
      {isAuthorized && <NpaModal />}
      <Button onClick={handleExportPDF} className='rounded-md' postfix={<PdfIcon className='size-8' />}>
        Экспорт в
      </Button>
    </div>
  );
};
