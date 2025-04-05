import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useRef, useEffect } from 'react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';

import { FunctionalPanel } from '@/pages/home/main/components/FunctionalPanel';
import { handleFileChange, setReferences } from './utils/documentHandlers';

const _MainPage = () => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editor = useCreateBlockNote({
    dictionary: ru,
    domAttributes: {
      editor: {
        class: 'max-w-full h-[75vh] py-5 overflow-auto bg-background!'
      }
    }
  });


  useEffect(() => {
 
    if (fileInputRef.current && editor) {
      setReferences(fileInputRef as React.RefObject<HTMLInputElement>, editor);
      console.log('References set in MainPage');
    }
  }, [editor, fileInputRef]);

  return (
    <main className='flex flex-1 flex-col gap-12 px-6 sm:px-16 h-full items-center mt-5 overflow-hidden'>
      <div className='relative w-full rounded-[0.375rem]'>
        <BlockNoteView theme={theme as Theme} editor={editor} />
      </div>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='.docx'
        style={{ display: 'none' }}
      />
      <FunctionalPanel theme={theme} />
    </main>
  );
};

export default _MainPage;