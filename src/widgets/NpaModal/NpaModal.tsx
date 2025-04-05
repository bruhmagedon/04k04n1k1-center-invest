import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PaginationControl } from './components/PaginationControl';

import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { AllDialog } from '@/widgets/AuthDialog/OurDialog';
import { NpaSearch } from '@/widgets/NpaModal/components/NpaSearch';
import { NpaList } from '@/widgets/NpaModal/components/NpaList';
import { useNpaData } from '@/widgets/NpaModal/components/useNpaData';

const MAX_SELECTION = 10;
const PAGE_SIZE = 10;

const FormSchema = z.object({
  items: z
    .array(z.string())
    .refine((v) => v.length > 0, 'Выберите хотя бы один НПА')
    .refine((v) => v.length <= MAX_SELECTION, `Максимум ${MAX_SELECTION} НПА`)
});

export function NpaModal() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { filteredItems, totalPages, paginatedItems } = useNpaData({
    searchTerm,
    currentPage,
    pageSize: PAGE_SIZE
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: [] }
  });

  const selectedCount = Math.min(form.watch('items')?.length || 0, MAX_SELECTION);

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    if (data.items.length > MAX_SELECTION) {
      toast.error(`Максимально можно выбрать ${MAX_SELECTION} НПА`);
      return;
    }
    toast.success(`Выбрано ${data.items.length} НПА`);
    setIsOpen(false);
  };

  return (
    <AllDialog
      triggerText={`Выбрать НПА (${selectedCount})`}
      title='Выбор НПА'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className='max-w-2xl max-h-[80vh] flex flex-col'>
        <NpaSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <NpaList items={paginatedItems} form={form} maxSelection={MAX_SELECTION} />

            <div className=' bottom-0 bg-background pt-4'>
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <Button
                type='submit'
                disabled={form.watch('items')?.length > MAX_SELECTION}
                className='mt-2.5 w-full'
              >
                Подтвердить выбор ({selectedCount})
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AllDialog>
  );
}
