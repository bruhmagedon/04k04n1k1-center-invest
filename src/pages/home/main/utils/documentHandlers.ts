import { BlockNoteEditor } from '@blocknote/core';
import { PDFExporter, pdfDefaultSchemaMappings } from '@blocknote/xl-pdf-exporter';
import * as ReactPDF from '@react-pdf/renderer';
import mammoth from 'mammoth';
import { toast } from 'sonner';
import { RefObject } from 'react';

let fileInputRef: RefObject<HTMLInputElement> | null = null;

let editorRef: BlockNoteEditor | null = null;

export const setReferences = (inputRef: RefObject<HTMLInputElement>, editor: BlockNoteEditor) => {
  fileInputRef = inputRef;
  editorRef = editor;
  // console.log('References set:', { fileInputRef, editorRef });
};

export const handleDocxImport = () => {
  // console.log('Import DOCX clicked, fileInputRef:', fileInputRef);
  if (fileInputRef?.current) {
    fileInputRef.current.click();
  } else {
    // console.error('File input reference is not available');
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
  // console.log('Export PDF clicked, editorRef:', editorRef);
  if (!editorRef) {
    // console.error('Editor reference is not available');
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
