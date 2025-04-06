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
import { toast } from 'sonner';

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
    if (taskData) {
      const loadMarkdownContent = async () => {
        try {
          console.log('Загрузка MD-контента в редактор...');
          // Now the markdown content is directly in the file field
          const markdownContent = taskData.text;

          if (!markdownContent) {
            console.error('Markdown content is empty');
            setFileError('Содержимое файла пусто');
            return;
          }

          const blocks = await editor.tryParseMarkdownToBlocks(markdownContent);
          editor.replaceBlocks(editor.document, blocks);
          setIsMarkdownLoaded(true);
          console.log('MD-контент успешно загружен в редактор');
        } catch (error) {
          console.error('Ошибка при загрузке MD-контента в редактор:', error);
          setFileError('Не удалось загрузить MD-контент в редактор');
        }
      };

      loadMarkdownContent();
      setMdContent(taskData.file);
    }
  }, [taskData, editor]);

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

  const onCreateTask = async () => {
    if (editor.document.length <= 1) {
      toast.error('Нельзя сохранит пустое техническое задание', {
        description: 'Добавьте текст перед сохранением'
      });
      return;
    }

    const blocksWithoutImages = editor.document.filter((block) => block.type !== 'image');
    const markdownContent = await editor.blocksToMarkdownLossy(blocksWithoutImages);

    const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' });
    const markdownFile = new File([markdownBlob], 'document.md', { type: 'text/markdown' });
    const formData = new FormData();

    //@ts-ignore
    let taskName = editor.document[0].content[0].text;

    formData.append('name', taskName);
    formData.append('file', markdownFile);

    createTask(formData, {
      onSuccess: (taskData) => {
        console.log('Task created successfully:', taskData);
        toast.success('Техническое задание успешно создано');
      },
      onError: (error) => {
        console.error('Error creating task:', error);
        toast.error('Ошибка при создании технического задания', {
          description: error.response?.data?.detail || 'Проверьте подключение к серверу'
        });
      }
    });
  };

  return (
    <TabsContent value='Редактор'>
      <main className='flex flex-1 flex-col px-6 sm:px-16 h-full w-full items-center overflow-hidden relative'>
        <div className='relative w-full rounded-[0.375rem] flex-1 mt-5 mb-20'>
          {isTemporary && <Button onClick={onCreateTask}>Сохранить ТЗ</Button>}
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
