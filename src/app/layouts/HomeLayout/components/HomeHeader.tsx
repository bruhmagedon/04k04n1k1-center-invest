import { Button } from "@/shared/ui/button"
import { TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { NpaModal } from "@/widgets/NpaModal/NpaModal"
import { CircleUserRound, Copy, SquarePlus } from "lucide-react"

export const HomeHeader = () => {
    return (
        <header className='flex justify-between items-center h-15 px-7.5'>
          <div className='flex gap-2.5'>
            <Button className='flex items-center p-2.5' prefix={ <SquarePlus size={16} />}><span>Создать ТЗ</span></Button>
            <NpaModal /> 
          </div>
          
          <TabsList className='flex'>
            <TabsTrigger value="Редактор">Редактор</TabsTrigger>
            <TabsTrigger value="Проверка">Проверка</TabsTrigger>
          </TabsList>
          <div className='flex gap-2.5'>
            <Button className='flex items-center p-2.5' prefix={ <Copy size={16} />}><span>Копировать</span>  </Button>
            <Button className='flex items-center p-2.5' prefix={ <CircleUserRound size={16} />}><span>Войти</span> </Button>
          </div>
          
        </header>
    )
}