import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfoIcon, Loader2 } from 'lucide-react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';

import { FunctionalPanel } from '@/pages/home/main/components/FunctionalPanel';
import { handleFileChange, setReferences } from '../main/utils/documentHandlers';
import { useCreateTaskMutation } from '@/modules/task/model/hooks/useCreateTaskMutation';
import { TabsContent } from '@radix-ui/react-tabs';
import { useProfileUser } from '@/shared/hooks/useProfileUser';
import { useTaskContext } from '@/app/layouts/HomeLayout/HomeLayout';
import { useTaskQuery } from '@/modules/task/model/hooks/useTaskQuery';
import axios from 'axios';

const TaskEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { isAuthorized } = useProfileUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createTask } = useCreateTaskMutation();
  const { task: contextTask } = useTaskContext();
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [mdContent, setMdContent] = useState<string | null>(null);

  const {
    data: taskData,
    isLoading: isTaskLoading,
    error: taskError
  } = useTaskQuery({
    id: id || '',
    enabled: !!id,
    fetchMdFile: true
  });

  useEffect(() => {
    if (taskData?.mdContent) {
      setMdContent(taskData.mdContent);
      console.log('MD file content loaded:', taskData.mdContent.substring(0, 100) + '...');
    }
  }, [taskData]);

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
      console.log(`References set for task ID: ${id}`);
    }
  }, [editor, fileInputRef, id]);

  const displayTask = taskData || contextTask;

  return (
    <TabsContent value='Редактор'>
      <main className='flex flex-1 flex-col px-6 sm:px-16 h-full w-full items-center overflow-hidden relative'>
        {displayTask && <h2 className='text-xl font-semibold mb-2'>{displayTask.name}</h2>}

        <div className='relative w-full rounded-[0.375rem] flex-1 mt-5 mb-20'>
          {isTaskLoading || isFileLoading ? (
            <div className='flex items-center justify-center h-full'>
              <Loader2 className='animate-spin mr-2' size={24} />
              <span>Загрузка содержимого файла...</span>
            </div>
          ) : taskError || fileError ? (
            <div className='flex items-center justify-center h-full text-red-500'>
              <span>{fileError || 'Ошибка при загрузке задачи'}</span>
            </div>
          ) : mdContent ? (
            <div className='p-4 border rounded'>
              <h3 className='text-lg font-medium mb-2'>Содержимое MD файла:</h3>
              <pre className='whitespace-pre-wrap bg-gray-100 p-3 rounded'>{mdContent}</pre>
            </div>
          ) : (
            <BlockNoteView theme={theme as Theme} editor={editor} />
          )}

          {isAuthorized && (
            <div className='flex items-center justify-center gap-2 mb-2 text-muted-foreground text-sm font-medium px-2'>
              <InfoIcon size={16} className='opacity-70' />
              <span>
                Вы редактируете шаблон технического задания. Для сохранения определите подходящие НПА
              </span>
            </div>
          )}
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
    </TabsContent>
  );
};

export default TaskEditorPage;
