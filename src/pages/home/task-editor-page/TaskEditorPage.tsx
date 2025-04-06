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
import { useTaskType } from '@/modules/task/model/hooks/useTaskType';
import { Button } from '@/shared/ui/button';

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
  const [isMarkdownLoaded, setIsMarkdownLoaded] = useState(false);
  const { isTemporary } = useTaskType();

  // Reset markdown loaded state when ID changes
  useEffect(() => {
    setIsMarkdownLoaded(false);
    setMdContent(null);
    setFileError(null);
  }, [id]);

  const editor = useCreateBlockNote({
    dictionary: ru,
    domAttributes: {
      editor: {
        class: 'max-w-full h-[75vh] py-5 overflow-auto bg-background!'
      }
    }
  });

  const {
    data: taskData,
    isLoading: isTaskLoading,
    error: taskError
  } = useTaskQuery({
    id: id || '',
    enabled: !!id && !isTemporary,
    fetchMdFile: true
  });

  // Загрузка MD-контента в редактор
  useEffect(() => {
    //@ts-ignore
    if (taskData?.mdContent && editor && !isMarkdownLoaded) {
      const loadMarkdownContent = async () => {
        try {
          console.log('Загрузка MD-контента в редактор...');
          //@ts-ignore
          const blocks = await editor.tryParseMarkdownToBlocks(taskData.mdContent);
          editor.replaceBlocks(editor.document, blocks);
          setIsMarkdownLoaded(true);
          console.log('MD-контент успешно загружен в редактор');
        } catch (error) {
          console.error('Ошибка при загрузке MD-контента в редактор:', error);
          setFileError('Не удалось загрузить MD-контент в редактор');
        }
      };

      loadMarkdownContent();
      //@ts-ignore
      setMdContent(taskData.mdContent);
    }
  }, [taskData, editor, isMarkdownLoaded]);

  useEffect(() => {
    if (isTemporary) {
      editor.removeBlocks(editor.document);
    }
  }, [isTemporary]);

  useEffect(() => {
    if (fileInputRef.current && editor) {
      setReferences(fileInputRef as React.RefObject<HTMLInputElement>, editor);
      console.log(`References set for task ID: ${id}`);
    }
  }, [editor, fileInputRef, id]);

  return (
    <TabsContent value='Редактор'>
      <main className='flex flex-1 flex-col px-6 sm:px-16 h-full w-full items-center overflow-hidden relative'>
        <div className='relative w-full rounded-[0.375rem] flex-1 mt-5 mb-20'>
          {isTaskLoading || isFileLoading ? (
            <div className='flex items-center justify-center h-[700px]'>
              <Loader2 className='animate-spin mr-2' size={24} />
              <span>Загрузка содержимого файла...</span>
            </div>
          ) : taskError || fileError ? (
            <div className='flex items-center justify-center h-full text-red-500'>
              <span>{fileError || 'Ошибка при загрузке задачи'}</span>
            </div>
          ) : (
            <BlockNoteView theme={theme as Theme} editor={editor} />
          )}

          {isAuthorized && isTemporary && (
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
