import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import mammoth from 'mammoth';
import { useRef } from 'react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { PDFExporter, pdfDefaultSchemaMappings } from '@blocknote/xl-pdf-exporter';
import * as ReactPDF from '@react-pdf/renderer';
import { toast } from 'sonner';
import { NpaModal } from '@/widgets/NpaModal/NpaModal';

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

  const handleDocxImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      editor.removeBlocks(editor.document);
      const blocksFromHTML = await editor.tryParseHTMLToBlocks(result.value);
      editor.replaceBlocks(editor.document, blocksFromHTML);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Ошибка при импорте DOCX:', error);
      alert('Произошла ошибка при импорте DOCX файла');
    }
  };

  const handleExportPDF = async () => {
    try {
      // Фильтрация блоков — удаляем изображения
      const blocksWithoutImages = editor.document.filter((block) => block.type !== 'image');

      // Создаём PDFExporter с фильтрованным документом
      const exporter = new PDFExporter(editor.schema, pdfDefaultSchemaMappings);
      const pdfDocument = await exporter.toReactPDFDocument(blocksWithoutImages);

      // Генерация PDF
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
      <div
        style={{
          border: '0.125rem solid transparent',
          background: cn(
            `linear-gradient(${theme === 'dark' ? '#232325' : '#ffffff'}, ${
              theme === 'dark' ? '#232325' : '#ffffff'
            }) padding-box,`,
            `${
              theme === 'dark'
                ? 'radial-gradient(circle, #047118, #0c8334, #0b931f) border-box'
                : 'linear-gradient(90deg, #4db8ff, #b3e0ff, #e6f7ff) border-box'
            }`
          ),
          borderRadius: '1rem'
        }}
        className='flex relative max-w-fit inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full z-[5000] px-2 py-2 items-center justify-center space-x-4'
      >
        <Button className='rounded-md'>Импортировать из DOCX</Button>
        <Button className='rounded-md'>Определить подходящие НПА</Button>
        <NpaModal />
        <Button onClick={handleExportPDF} className='rounded-md'>
          Экспортировать в PDF
        </Button>
      </div>
    </main>
  );
};

export default _MainPage;
