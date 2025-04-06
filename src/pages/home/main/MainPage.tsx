import { useTheme } from '@/shared/hooks/useTheme';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useProfileUser } from '@/shared/hooks/useProfileUser';

const _MainPage = () => {
  const { theme } = useTheme();
  const { isAuthorized } = useProfileUser();
  return (
    <main className='flex flex-1 flex-col gap-8 px-6 sm:px-16 h-full items-center justify-center mt-5 overflow-hidden'>
      <div className='text-center max-w-2xl'>
        

        {!isAuthorized ? <><h1 className='text-2xl font-bold mb-4'>Для начала работы необходимо войти/зарегистрироваться</h1></> : <>
          <FileText size={64} className='mx-auto mb-6 opacity-50' /> 
          <h1 className='text-2xl font-bold mb-4'>Выберите или создайте задачу</h1>
        <p className='text-muted-foreground mb-8'>
          Для начала работы выберите существующую задачу из списка слева или создайте новую задачу.
        </p>
        <div className='flex gap-4 justify-center'>
          <Button className='rounded-md' postfix={<Plus size={16} />}>
            Создать новую задачу
          </Button>
          <Link to='/task/1'>
            <Button theme='outline' className='rounded-md'>
              Открыть демо задачу #1
            </Button>
          </Link>
        </div></>}
        
      </div>
    </main>
  );
};

export default _MainPage;

