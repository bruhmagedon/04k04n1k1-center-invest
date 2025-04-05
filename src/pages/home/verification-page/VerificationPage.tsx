import { TabsContent } from '@radix-ui/react-tabs';
import { useParams } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';

const VerificationPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <TabsContent value='Проверка'>
      <main className='flex flex-1 flex-col px-6 sm:px-16 h-full w-full items-center overflow-hidden relative'>
        <div className='relative w-full rounded-[0.375rem] flex-1 mt-5 mb-20'>
          <div className='h-[75vh] py-5 overflow-auto bg-background border rounded-md p-4'>
            <h2 className='text-xl font-semibold mb-4'>Проверка документа</h2>
            <p className='text-muted-foreground mb-4'>
              Здесь вы можете проверить ваш документ на соответствие требованиям и нормативам.
            </p>
            
            {/* Verification content will go here */}
            <div className='space-y-4'>
              <div className='p-4 border rounded-md bg-muted/50'>
                <h3 className='font-medium mb-2'>Статус проверки</h3>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-green-500'></div>
                  <span>Документ соответствует требованиям</span>
                </div>
              </div>
              
              <div className='p-4 border rounded-md'>
                <h3 className='font-medium mb-2'>Рекомендации</h3>
                <ul className='list-disc pl-5 space-y-2'>
                  <li>Проверьте актуальность указанных нормативных документов</li>
                  <li>Убедитесь в соответствии терминологии отраслевым стандартам</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className='flex items-center justify-center gap-2 mb-2 text-muted-foreground text-sm font-medium px-2'>
            <InfoIcon size={16} className='opacity-70' />
            <span>Проверка документа на соответствие требованиям и нормативам</span>
          </div>
        </div>
      </main>
    </TabsContent>
  );
};

export default VerificationPage;