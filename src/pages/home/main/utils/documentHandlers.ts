import { BlockNoteEditor } from '@blocknote/core';
import { PDFExporter, pdfDefaultSchemaMappings } from '@blocknote/xl-pdf-exporter';
import * as ReactPDF from '@react-pdf/renderer';
import mammoth from 'mammoth';
import { toast } from 'sonner';
import { RefObject } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { newAxiosError } from '@/shared/api/types';
import { CreateTaskResponse } from '@/modules/task/model/types/types';

let fileInputRef: RefObject<HTMLInputElement> | null = null;

let editorRef: BlockNoteEditor | null = null;
interface SearchIdResponse {
  search_id: number;
}
export const setReferences = (inputRef: RefObject<HTMLInputElement>, editor: BlockNoteEditor) => {
  fileInputRef = inputRef;
  editorRef = editor;
};

export const handleDocxImport = () => {
  if (fileInputRef?.current) {
    fileInputRef.current.click();
  } else {
  }
};

export const handleCheked = async (
  searchNpa: UseMutateFunction<SearchIdResponse, newAxiosError, string, unknown>,
  createTask?: UseMutateFunction<CreateTaskResponse, newAxiosError, FormData, unknown>
): Promise<File | null> => {
  if (!editorRef) {
    toast.error('Редактор не инициализирован');
    return null;
  }

  try {
    const blocksWithoutImages = editorRef.document.filter((block) => block.type !== 'image');
    if (blocksWithoutImages.length === 0) {
      toast.error('Редактор пуст. Добавьте текст перед проверкой.');
      return null;
    }

    const markdownContent = await editorRef.blocksToMarkdownLossy(blocksWithoutImages);

    const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' });
    const markdownFile = new File([markdownBlob], 'document.md', { type: 'text/markdown' });

    let taskName = 'Техническое задание';

    const headingBlock = editorRef.document.find(
      (block) => block.type === 'heading' && block.content && block.content.length > 0
    );

    if (headingBlock && headingBlock.content) {
      const headingText = headingBlock.content
        //@ts-ignore
        .map((item) => item.text || '')
        .join('')
        .trim();

      if (headingText) {
        taskName = headingText;
      }
    } else {
      //@ts-ignore
      const firstTextBlock = editorRef.document.find((block) => block.content && block.content.length > 0);

      if (firstTextBlock && firstTextBlock.content) {
        const text = firstTextBlock.content
          //@ts-ignore
          .map((item) => item.text || '')
          .join('')
          .trim();

        if (text) {
          const words = text.split(/\s+/).slice(0, 3).join(' ');
          if (words) {
            taskName = words;
          }
        }
      }
    }

    taskName = taskName.replace(/[\/\\:*?"<>|]/g, '_').substring(0, 50);

    searchNpa(markdownContent, {
      onSuccess: (data) => {
        console.log('Search NPA success:', data);
        toast.success(`Заявка №${data.search_id} начала обработку`);

        if (createTask) {
          const formData = new FormData();
          formData.append('name', taskName);
          formData.append('file', markdownFile);

          const currentDate = new Date().toISOString();
          formData.append('created_at', currentDate);
          formData.append('updated_at', currentDate);

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
        }
      },
      onError: (error) => {
        console.error('Search NPA error:', error);
        toast.error('Ошибка при поиске НПА', {
          description: 'Вы отправили пустое техническое задание или произошла ошибка на сервере'
        });
      }
    });
    return markdownFile;
  } catch (error) {
    console.error('Error converting to markdown:', error);
    toast.error('Ошибка при конвертации в Markdown');
    return null;
  }
};

export const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (!editorRef) {
    return;
  }

  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    editorRef.removeBlocks(editorRef.document);
    const blocksFromHTML = await editorRef.tryParseHTMLToBlocks(result.value);
    editorRef.replaceBlocks(editorRef.document, blocksFromHTML);

    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  } catch (error) {
    console.error('Ошибка при импорте DOCX:', error);
  }
};

export const handleExportPDF = async () => {
  if (!editorRef) {
    return;
  }

  try {
    const blocksWithoutImages = editorRef.document.filter((block) => block.type !== 'image');

    let filename = 'document';

    const headingBlock = editorRef.document.find(
      (block) => block.type === 'heading' && block.content && block.content.length > 0
    );

    if (headingBlock && headingBlock.content) {
      const headingText = headingBlock.content
        //@ts-ignore
        .map((item) => item.text || '')
        .join('')
        .trim();

      if (headingText) {
        filename = headingText;
      }
    } else {
      //@ts-ignore
      const firstTextBlock = editorRef.document.find((block) => block.content && block.content.length > 0);

      if (firstTextBlock && firstTextBlock.content) {
        const text = firstTextBlock.content
          //@ts-ignore
          .map((item) => item.text || '')
          .join('')
          .trim();

        if (text) {
          const words = text.split(/\s+/).slice(0, 3).join(' ');
          if (words) {
            filename = words;
          }
        }
      }
    }

    filename = filename.replace(/[\/\\:*?"<>|]/g, '_').substring(0, 50);

    const exporter = new PDFExporter(editorRef.schema, pdfDefaultSchemaMappings);
    const pdfDocument = await exporter.toReactPDFDocument(blocksWithoutImages);
    const pdfBlob = await ReactPDF.pdf(pdfDocument).toBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    toast.error('Ошибка при экспорте в PDF');
    console.error('Error exporting PDF:', error);
  }
};
