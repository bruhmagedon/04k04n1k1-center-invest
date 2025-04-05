import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';

import { FunctionalPanel } from '@/pages/home/main/components/FunctionalPanel';
import { handleFileChange, setReferences } from '../main/utils/documentHandlers';
import { useCreateTaskMutation } from '@/modules/task/model/hooks/useCreateTaskMutation';

const TaskEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createTask } = useCreateTaskMutation();

  const editor = useCreateBlockNote({
    dictionary: ru,
    domAttributes: {
      editor: {
        class: 'max-w-full h-[75vh] py-5 overflow-auto bg-background!'
      }
    }
  });

  //   TODO: Заголовка фетча по id (заменить на useQuery)
  useEffect(() => {
    if (fileInputRef.current && editor) {
      setReferences(fileInputRef as React.RefObject<HTMLInputElement>, editor);
      console.log(`References set for task ID: ${id}`);
    }
  }, [editor, fileInputRef, id]);

  return (
    <main className='flex flex-1 flex-col px-6 sm:px-16 h-full w-full items-center overflow-hidden relative'>
      {/* <h2 className='text-xl font-semibold mb-2'>Задача #{id}</h2> */}
      <div className='relative w-full rounded-[0.375rem] flex-1 mt-5 mb-20'>
        <BlockNoteView theme={theme as Theme} editor={editor} />
        <div className='flex items-center justify-center gap-2 mb-2 text-muted-foreground text-sm font-medium px-2'>
          <InfoIcon size={16} className='opacity-70' />
          <span>Вы редактируете шаблон технического задания. Для сохранения определите подходящие НПА</span>
        </div>
      </div>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='.docx'
        style={{ display: 'none' }}
      />
      <div className='absolute bottom-1 left-0 right-0 flex justify-center'>
        <FunctionalPanel theme={theme} createTask={createTask} />
      </div>
    </main>
  );
};

export default TaskEditorPage;
