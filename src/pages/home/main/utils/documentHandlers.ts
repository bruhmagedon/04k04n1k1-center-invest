import { BlockNoteEditor } from '@blocknote/core';
import { PDFExporter, pdfDefaultSchemaMappings } from '@blocknote/xl-pdf-exporter';
import * as ReactPDF from '@react-pdf/renderer';
import mammoth from 'mammoth';
import { toast } from 'sonner';
import { RefObject } from 'react';
import { useSearchNpaMutation } from '@/modules/npa/model/hooks/useSearchNpaMutation';
import { UseMutateFunction } from '@tanstack/react-query';
import { NpaSearchResponse } from '@/modules/npa/model/api/searchNpa';
import { newAxiosError } from '@/shared/api/types';

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
  searchNpa: UseMutateFunction<SearchIdResponse, newAxiosError, string, unknown>
): Promise<File | null> => {
  if (!editorRef) {
    toast.error('Редактор не инициализирован');
    return null;
  }

  try {
    const blocksWithoutImages = editorRef.document.filter((block) => block.type !== 'image');
    const markdownContent = await editorRef.blocksToMarkdownLossy(blocksWithoutImages);
    const markdownBlob = new Blob([markdownContent], { type: 'text/markdown' });
    const markdownFile = new File([markdownBlob], 'document.md', { type: 'text/markdown' });

    searchNpa(markdownContent, {
      onSuccess: (data) => {
        console.log('Search NPA success:', data);
        toast.success(`Заявка №${data.search_id} начала обработку`);
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
  // console.log('File change event triggered, editorRef:', editorRef);
  if (!editorRef) {
    // console.error('Editor reference is not available');
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
    const exporter = new PDFExporter(editorRef.schema, pdfDefaultSchemaMappings);
    const pdfDocument = await exporter.toReactPDFDocument(blocksWithoutImages);
    const pdfBlob = await ReactPDF.pdf(pdfDocument).toBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    toast.error('Ошибка при экспорте в PDF');
    console.error('Error exporting PDF:', error);
  }
};
