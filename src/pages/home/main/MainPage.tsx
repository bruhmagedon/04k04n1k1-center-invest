import { ru } from '@blocknote/core/locales';
import { BlockNoteView, Theme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useTheme } from '@/shared/hooks/useTheme';

import { Button } from '@/shared/ui/button';
import { NpaModal } from '@/widgets/NpaModal/NpaModal';
import { ShineBorder } from '@/shared/ui/shine-border';
import { cn } from '@/shared/utils/cn';
import {
  PDFExporter,
  pdfDefaultSchemaMappings,
} from "@blocknote/xl-pdf-exporter";
import * as ReactPDF from "@react-pdf/renderer";
 

 
// Use react-pdf to write to file:

const _MainPage = () => {
  const { theme } = useTheme();
  const editor = useCreateBlockNote({
    dictionary: ru,
    domAttributes: {
      editor: {
        class: 'w-full h-[75vh] py-5 overflow-auto bg-background!'
      }
    }
  });
// Create the exporter
const exporter = new PDFExporter(editor.schema, pdfDefaultSchemaMappings);
 
const handleExportPDF = async () => {
  try {
    // Создаем экспортер
    const exporter = new PDFExporter(editor.schema, pdfDefaultSchemaMappings);
    
    // Конвертируем документ в PDF
    const pdfDocument = await exporter.toReactPDFDocument(editor.document);
    
    // Генерируем PDF и скачиваем
    const pdfBlob = await ReactPDF.pdf(pdfDocument).toBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Освобождаем память
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    // Здесь можно добавить обработку ошибок (например, показать уведомление)
  }
};
  return (
    <main className='flex flex-1 flex-col gap-12 px-6 sm:px-16 h-full items-center mt-5 overflow-hidden'>
      <div className='relative w-full rounded-[0.375rem]'>
        <BlockNoteView theme={theme as Theme} editor={editor} />
      </div>

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

        <NpaModal />
        <Button className='rounded-md'>Импортировать из DOCX</Button>
      
      
        <Button onClick={handleExportPDF} className='rounded-md'>Экспортировать в PDF</Button>
        <Button className='rounded-md'>Определить подходящие НПА</Button>
      </div>
    </main>
  );
};

export default _MainPage;
