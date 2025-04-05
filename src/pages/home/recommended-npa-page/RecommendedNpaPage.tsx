import { TabsContent } from '@radix-ui/react-tabs';
import { useParams } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';
import { useSearchNpaMutation } from '@/modules/npa/model/hooks/useSearchNpaMutation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Skeleton } from '@/shared/ui/skeleton';
import { Badge } from '@/shared/ui/badge';


const RecommendedNpaPage = () => {
  const { id } = useParams<{ id: string }>();
  const { resultsQuery, isLoading, error } = useSearchNpaMutation();
    console.log(resultsQuery)
  const npaResults = resultsQuery.data?.results || [];
  const totalCount = resultsQuery.data?.count || 0;

  return (
    <TabsContent value='Рекомендуемые НПА'>
      <main className='flex flex-1 flex-col px-6 sm:px-16 h-full w-full items-center overflow-hidden relative'>
        <div className='relative w-full rounded-[0.375rem] flex-1 mt-5 mb-20'>
          <div className='h-[75vh] py-5 overflow-hidden bg-background border rounded-md p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Рекомендуемые НПА</h2>
              <Badge variant="outline">{totalCount} документов</Badge>
            </div>
            
            {isLoading ? (
              <div className='space-y-4'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i}>
                    <CardHeader className='pb-2'>
                      <Skeleton className='h-5 w-3/4' />
                      <Skeleton className='h-4 w-1/2' />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className='h-4 w-full mb-2' />
                      <Skeleton className='h-4 w-5/6' />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className='p-4 border border-destructive/20 bg-destructive/10 rounded-md text-destructive'>
                <p>Произошла ошибка при загрузке рекомендуемых НПА</p>
                <p className='text-sm mt-1'>{error.message}</p>
              </div>
            ) : npaResults.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-[60vh] text-muted-foreground'>
                <p>Нет рекомендуемых НПА для этого документа</p>
                <p className='text-sm mt-1'>Попробуйте изменить содержание документа</p>
              </div>
            ) : (
              <ScrollArea className='h-[65vh]'>
                <div className='space-y-4 pr-4'>
                  {npaResults.map((npa) => (
                    <Card key={npa.id}>
                      <CardHeader className='pb-2'>
                        <CardTitle className='text-base'>{npa.name}</CardTitle>
                        <CardDescription>ID: {npa.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='flex justify-between items-center'>
                          <Badge variant={npa.relevance_score > 0.7 ? "default" : "secondary"}>
                            Релевантность: {Math.round(npa.relevance_score * 100)}%
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          
          <div className='flex items-center justify-center gap-2 mb-2 text-muted-foreground text-sm font-medium px-2'>
            <InfoIcon size={16} className='opacity-70' />
            <span>Рекомендуемые нормативно-правовые акты на основе анализа вашего документа</span>
          </div>
        </div>
      </main>
    </TabsContent>
  );
};

export default RecommendedNpaPage;