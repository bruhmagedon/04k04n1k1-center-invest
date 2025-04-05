import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';

import { Button } from '@/shared/ui/button';
import { NpaModal } from '@/widgets/NpaModal/NpaModal';
import { ShineBorder } from '@/shared/ui/shine-border';

const _MainPage = () => {
  const { theme } = useTheme();
  const editor = useCreateBlockNote({
    dictionary: ru,
    domAttributes: {
      editor: {
        class: 'w-full h-[75vh] py-5 overflow-auto bg-[#232325]!'
      }
    }
  });

  return (
    <main className='flex flex-1 flex-col gap-12 px-6 sm:px-16 h-full items-center mt-5 overflow-hidden'>
      <div className='relative w-full rounded-[0.375rem]'>
        <BlockNoteView theme={theme} editor={editor} />
      </div>
      
      <div style={{
  
        border: '0.125rem solid transparent',
        background: `
          linear-gradient(#232325, #232325) padding-box,
          radial-gradient(circle, #bfffcb,#26ae6f,#85fb97) border-box
        `,
        borderRadius: '1rem' // Для круга
      }}
      className='flex relative max-w-fit  inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full  z-[5000] px-2 py-2  items-center justify-center space-x-4'>
        <Button>Отправить на проверку</Button>
        <Button>Экспортировать в PDF</Button>
        <Button>Копировать текст</Button>
      </div>
    </main>
  );
};

export default _MainPage;
