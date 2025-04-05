import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';

import { Button } from '@/shared/ui/button';

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
        <BlockNoteView theme={theme as Theme} editor={editor} />
      </div>
      <div>
        <Button>Сохранить</Button>
      </div>
    </main>
  );
};

export default _MainPage;
