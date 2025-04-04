import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';
import { BorderBeam } from '@/shared/ui/border-beam';
import { Button } from '@/shared/ui/button';

const _MainPage = () => {
  const { theme } = useTheme();
  const editor = useCreateBlockNote({
    dictionary: ru,
    domAttributes: {
      editor: {
        class: 'w-full min-h-[60vh] py-5 border'
      }
    }
  });

  return (
    <main className='flex flex-1 flex-col gap-12 px-6 sm:px-16 w-full h-full  items-center min-h-[calc(100vh-100px)] mt-16 overflow-hidden'>
      <div className='relative w-full rounded-[0.375rem]'>
        <BlockNoteView className='w-full' theme={theme as Theme} editor={editor} />
        <BorderBeam
          duration={10}
          size={900}
          reverse
          className='from-transparent via-green-500 to-transparent '
        />
        <BorderBeam
          duration={10}
          size={900}
          reverse
          className='from-transparent via-green-500 to-transparent '
        />
      </div>

      <div>
        <Button>Сохранить</Button>
      </div>
    </main>
  );
};

export default _MainPage;
