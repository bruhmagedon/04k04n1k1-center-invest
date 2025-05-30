import { TabsContent } from '@radix-ui/react-tabs';
import { useParams } from 'react-router-dom';
import { InfoIcon, SearchIcon, RefreshCw } from 'lucide-react';
import { useSearchNpaMutation } from '@/modules/npa/model/hooks/useSearchNpaMutation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Skeleton } from '@/shared/ui/skeleton';
import { Badge } from '@/shared/ui/badge';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '@/shared/ui/button';
import { ExternalLink } from 'lucide-react';

const RecommendedNpaPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  // Add a state to track if we've already attempted to fetch data
  const [fetchAttempted, setFetchAttempted] = useState(false);
  
  const {
    resultsQuery,
    isLoading,
    error,
    searchId,
    searchComplete,
    resultsFetched, // Get the new state
    fetchResults,
    data
  } = useSearchNpaMutation();
  
  console.log('NPA Page State:', { 
    searchId, 
    searchComplete, 
    resultsFetched, // Log it for debugging
    fetchAttempted,
    isLoading, 
    hasData: !!data,
    resultsStatus: resultsQuery.status,
    data
  });
  
  // Only fetch results once when the component mounts
  useEffect(() => {
    if (searchId && searchComplete && !data && !isLoading && !fetchAttempted && !resultsFetched) {
      setFetchAttempted(true);
      handleRefresh();
    }
  }, [searchId, searchComplete, data, isLoading, fetchAttempted, resultsFetched]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchResults();
    } catch (err) {
      console.error('Error refreshing results:', err);
    } finally {
      setIsRefreshing(false);
    }
  };
  //@ts-ignore
  const npaResults = data?.results || [];
  //@ts-ignore
  const totalCount = data?.count || 0;

  return (
    <TabsContent value='Рекомендуемые НПА'>
      <main className='flex flex-1 flex-col px-6 sm:px-16 h-full w-full items-center overflow-hidden relative'>
        <div className='relative w-full rounded-[0.375rem] flex-1 mt-5 mb-20'>
          <div className='h-[75vh] py-5 overflow-hidden bg-background border rounded-md p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Рекомендуемые НПА</h2>
              <div className='flex items-center gap-2'>
                {searchComplete && (
                  <Button 
                    className='flex'
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                  >
                    <div className='flex'>
                        <RefreshCw size={16} className={isRefreshing ? 'animate-spin flex' : 'flex'} />
                        <span className="ml-2">Обновить</span>
                    </div>
                   
                  </Button>
                )}
                {data && <Badge variant="outline">{totalCount} документов</Badge>}
              </div>
            </div>
            
            {(isLoading || isRefreshing || resultsQuery.isFetching) ? (
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
                <Button 
                
                  className="mt-4"
                  onClick={handleRefresh}
                >
                  Попробовать снова
                </Button>
              </div>
            ) : !searchId || !searchComplete ? (
              <div className='flex flex-col items-center justify-center h-[60vh] text-muted-foreground'>
                <p>Поиск НПА еще не был выполнен</p>
                <p className='text-sm mt-1'>Перейдите на вкладку "Редактор" и нажмите "Проверить"</p>
              </div>
            ) : !data ? (
              <div className='flex flex-col items-center justify-center h-[60vh]'>
                <p className='mb-4'>Данные о рекомендуемых НПА не загружены</p>
                <Button 
                  onClick={handleRefresh}
                  className='flex items-center gap-2'
                >
                  <SearchIcon size={16} />
                  Загрузить рекомендации
                </Button>
              </div>
            ) : npaResults.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-[60vh] text-muted-foreground'>
                <p>Нет рекомендуемых НПА для этого документа</p>
                <p className='text-sm mt-1'>Попробуйте изменить содержание документа</p>
              </div>
            ) : (
              <ScrollArea className='h-[65vh]'>
                <div className='space-y-4 pr-4'>
                    
                  {
                    //@ts-ignore
                  npaResults.map((npa) => (
                    <Card key={npa.id}>
                      <CardHeader className='pb-2'>
                        <CardTitle className='text-base'>{npa.name}</CardTitle>
                        <CardDescription>ID: {npa.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='flex flex-col gap-2'>
                          <div className='flex justify-between items-center'>
                            <Badge variant={npa.relevance_score > 0.7 ? "default" : "secondary"}>
                              Релевантность: {npa.related_tags_count}%
                            </Badge>
                            
                            {npa.source && (
                              <a 
                                href={npa.source} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={buttonVariants({
                                  theme: 'primary',
                                  size: 'default',
                                  textStyle: 'normal'
                                })}
                              >
                                <ExternalLink size={16} />
                                <span>Источник</span>
                              </a>
                            )}
                          </div>
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